import React, { useRef, forwardRef, useState, useEffect, useCallback, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";
import Moon from "./Moon";
import Labels from "./Labels";
import initialMoonsData from "@/data/moonsData";
import { earthAtmosphereShader } from "../shaders/earth/atmosphere";
import Rings from "./Rings";

// First, let's create these utilities outside the component
const calculateTrueAnomaly = (E, eccentricity) => {
  return 2 * Math.atan(
    Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
    Math.tan(E / 2)
  );
};

const calculateKepler = (E, eccentricity, meanAnomaly, maxIterations = 10, tolerance = 1e-6) => {
  let currentE = E;
  for (let i = 0; i < maxIterations; i++) {
    const deltaE = (currentE - eccentricity * Math.sin(currentE) - meanAnomaly) /
      (1 - eccentricity * Math.cos(currentE));
    currentE -= deltaE;
    if (Math.abs(deltaE) < tolerance) break;
  }
  return currentE;
};

const calculateOrbitPosition = (meanAnomaly, eccentricity, radius) => {
  // Solve Kepler's Equation
  const E = calculateKepler(meanAnomaly, eccentricity, meanAnomaly);

  // Calculate true anomaly
  const trueAnomaly = calculateTrueAnomaly(E, eccentricity);

  // Calculate radius vector (distance from focus)
  const r = (radius * (1 - eccentricity * eccentricity)) /
    (1 + eccentricity * Math.cos(trueAnomaly));

  return {
    x: r * Math.cos(-trueAnomaly),
    baseZ: r * Math.sin(-trueAnomaly)
  };
};

const RingSystem = ({ radius, color, width = 2 }) => {
  const ringCount = 20;
  const spacing = width / ringCount;

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <OrbitPath
          key={`ring-${i}`}
          origin={[0, 0, 0]}
          radius={radius + (i * spacing)}
          color={color}
          lineWidth={0.2}
          opacity={0.4}
          hiRes={true}
          eccentricity={0}
          orbitalInclination={0}
        />
      ))}
    </group>
  );
};


const Planet = ({ name = 'Earth', textures }) => {
  const { planetsData, moonsData } = usePlanetStore();
  const bodyData = planetsData[name];
  const mergedData = { ...bodyData };

  const {
    radius = 1, // default values to prevent null
    orbitalOrigin,
    orbitalRadius = 1,
    orbitalPeriod = 1,
    orbitalInclination = 0,
    axialTilt = 0,
    rotationPeriod = 1,
    color = '#ffffff',
    initialOrbitalAngle = 0,
    eccentricity = 0,
    mass
  } = mergedData;

  const { simSpeed, toggleDetailsMenu } = useStore();
  const {
    planetAngles,
    updatePlanetPosition,
    selectedPlanet,
    setSelectedPlanet,
    displayLabels,
    selectedMoon,
    setSelectedMoon,
    orbitPaths
  } = usePlanetStore();

  const {
    isSurfaceCameraActive,
    satelliteCamera,
    toggleSatelliteCamera,
    setAutoRotate,
    autoRotate,
    activeCamera,
    switchToPlanetCamera,
    toggleCameraTransitioning
  } = useCameraStore();

  const localRef = useRef();
  const localAngleRef = useRef(planetAngles[name] || 0);
  const cloudsRef = useRef();
  const meshRef = useRef(null);

  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name;


  const renderMoons = () => {
    if (isPlanetSelected) return true
    else if (selectedMoon?.parentName === name) return true
    return false
  }
  const renderPlanetLabels = () => {
    // Only consider the planet's own selected state, not moon selection
    if (isPlanetSelected) return false;
    return displayLabels || (isHovered && !isPlanetSelected);
  };

  const computedValues = useMemo(() => ({
    scaledOrbitalRadius: orbitalRadius * (isSurfaceCameraActive ? .0001 : distanceScaleFactor),
    scaledRadius: radius * sizeScaleFactor,
    rotationSpeed: rotationPeriod ? ((2 * Math.PI) / (rotationPeriod * 3600)) * rotationSpeedScaleFactor : 0,
    detailLevel: (isPlanetSelected || renderMoons()) ? 64 : 16
  }), [orbitalRadius, isSurfaceCameraActive, radius, rotationPeriod, isPlanetSelected, renderMoons()]);

  const { scaledOrbitalRadius, scaledRadius, rotationSpeed, detailLevel } = computedValues;

  const scaleRef = useRef(computedValues.scaledRadius);
  const textSize = useRef(1);
  const [showTextures, setShowTextures] = useState(false);
  const textureDisplayDistance = 500;
  const [orbitPathOpacity, setOrbitPathOpacity] = useState(1);


  useEffect(() => {
    return () => {
      // Cleanup any references, geometries, or textures
      if (meshRef.current) {
        const geometry = meshRef.current.geometry;
        const material = meshRef.current.material;
        geometry.dispose();
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else if (material) {
          material.dispose();
        }
      }
    };
  }, []);


  const frameCallback = useCallback((state, delta) => {
    const adjustedDelta = delta * simSpeed;

    // Calculate mean motion (n)
    const meanMotion = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60);

    // Update mean anomaly (M)
    if (localAngleRef.current === 0) {
      localAngleRef.current = initialOrbitalAngle * (Math.PI / 180);
    } else {
      localAngleRef.current -= meanMotion * adjustedDelta;
    }

    if (localRef.current) {
      // Calculate orbital position
      const { x, baseZ } = calculateOrbitPosition(
        localAngleRef.current,
        eccentricity,
        scaledOrbitalRadius
      );

      // Apply inclination
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * baseZ;
      const z = Math.cos(inclination) * baseZ;

      // Update position
      localRef.current.position.set(x, y, z);
      updatePlanetPosition(name, { x, y, z });

      // Handle rotation
      if (rotationPeriod && meshRef.current) {
        const rotationPeriodInSeconds = rotationPeriod * 3600;
        const rotationSpeed = (2 * Math.PI) / rotationPeriodInSeconds;
        const rotationIncrement = rotationSpeed * adjustedDelta;

        const yAxis = new THREE.Vector3(0, 1, 0);
        meshRef.current.rotateOnAxis(yAxis, rotationIncrement);

        if (localRef.current.rotation.y >= 2 * Math.PI && isPlanetSelected) {
          localRef.current.rotation.y %= 2 * Math.PI;
        }

        if (cloudsRef.current) {
          cloudsRef.current.rotation.y += rotationIncrement * 1.1;
        }
      }

      // Handle scaling and visibility
      const distance = localRef.current.position.distanceTo(state.camera.position);

      // Update scales based on distance
      if (distance / 1000 <= scaledRadius) {
        scaleRef.current = scaledRadius;
      } else {
        scaleRef.current = distance / 1000;
      }

      if (textSize.current) {
        textSize.current = distance * 0.02;
      }

      // Update visibility flags
      setShowTextures(activeCamera.type === 'moon' || distance < textureDisplayDistance);

      // Update orbit path opacity
      const maxDistance = scaledRadius * 100;
      const minDistance = scaledRadius * 1;
      const opacity = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));
      setOrbitPathOpacity(opacity);
    }
  }, [
    simSpeed,
    orbitalPeriod,
    initialOrbitalAngle,
    eccentricity,
    scaledOrbitalRadius,
    orbitalInclination,
    rotationPeriod,
    name,
    isPlanetSelected,
    scaledRadius,
    activeCamera.type,
    textureDisplayDistance
  ]);

  useFrame(frameCallback);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.order = 'YXZ';
      meshRef.current.rotation.y = 0;
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(axialTilt);
    }
  }, [axialTilt, selectedPlanet]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (isDragging || activeCamera.name === name) return;
    toggleDetailsMenu(true);
    setSelectedMoon(null);
    setSelectedPlanet(mergedData);
    switchToPlanetCamera(name);
  }, [isDragging, activeCamera.name, name, mergedData]);

  // Do the same for other handlers

  const handlePointerDown = e => {
    e.stopPropagation();
    setIsDragging(false);
    initialClickPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = e => {
    const distanceMoved = Math.sqrt(
      Math.pow(e.clientX - initialClickPosition.current.x, 2) +
      Math.pow(e.clientY - initialClickPosition.current.y, 2)
    );
    if (distanceMoved > 5) {
      setIsDragging(true);
    }
  };

  const handlePointerUp = e => {
    setIsDragging(false);
  };

  const handlePointerOver = e => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setIsHovered(true);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    setIsHovered(false);
  };

  const handleDoubleClick = e => {
    e.stopPropagation();
    setAutoRotate(!autoRotate);
  };


  const moons = moonsData[name] || [];

  return (
    <>
      {activeCamera?.name === name && localRef.current &&
        <SatelliteCamera
          target={localRef.current}
          targetName={name}
          size={scaledRadius}
          bodyType={'planet'}
        />
      }

      <group ref={localRef}>
        <mesh
          visible={false}
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          {activeCamera?.name !== name &&
            <sphereGeometry args={[renderMoons() ? scaledRadius : scaleRef.current * 8, 8, 8]} />
          }
        </mesh>

        <mesh
          ref={meshRef}
          key={isPlanetSelected ? name + '-textured' : name + '-basic'}
          onDoubleClick={handleDoubleClick}
          castShadow
        >
          <sphereGeometry args={[(renderMoons() ? scaledRadius : scaleRef.current * 8), detailLevel, detailLevel / 2]} />
          {((!isPlanetSelected && !renderMoons()) && texturesLoaded) ?
            <meshBasicMaterial color={color} />
            :
            <>
              {name === "Earth" && isPlanetSelected && (
                <>
                  <mesh ref={cloudsRef} key={`${name}-cloud_texture`}>
                    <sphereGeometry args={[scaledRadius * 1.005, detailLevel, detailLevel / 2]} />
                    <meshStandardMaterial
                      alphaMap={textures?.clouds}
                      transparent
                      opacity={0.8}
                      depthWrite={false}
                    />
                  </mesh>
                  <mesh key={`${name}-atmosphere_texture`}>
                    <sphereGeometry args={[scaledRadius * 1.01, detailLevel, detailLevel]} />
                    <shaderMaterial
                      args={[earthAtmosphereShader]}
                      transparent
                      opacity={.1}
                      side={THREE.BackSide}
                      // blending={THREE.AdditiveBlending}
                      depthWrite={false}
                      depthTest={true}
                    />
                  </mesh>
                </>
              )}
              <meshStandardMaterial
                metalness={0.6}
                roughness={0.8}
                map={textures?.map}
                onBuild={() => setTexturesLoaded(true)}
              />
            </>
          }
        </mesh>

        {name === "Saturn" && showTextures && (
          <Rings
            key={detailLevel + name + '-ring'}
            innerRadius={scaledRadius * 1.2}
            outerRadius={scaledRadius * 2}
            height={0}
            rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}
            texture={isPlanetSelected ? textures?.ringTexture : null}
            detail={Math.max(detailLevel, 32)}
          />
        )}

        {name === "Uranus" && showTextures && (
          <Rings
            key={detailLevel + name + '-ring'}
            innerRadius={scaledRadius * 1.5}
            outerRadius={scaledRadius * 1.9}
            height={0}
            texture={isPlanetSelected ? textures?.ringTexture : null}
            detail={Math.max(detailLevel, 32)}
            rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}
          />
        )}

        {renderPlanetLabels() && (
          <Labels
            key={name}
            text={name}
            size={textSize?.current}
            position={[0, scaleRef.current * 1.2 + textSize?.current, 0]}
            color={color}
            handleClick={handleClick}
            handlePointerDown={handlePointerDown}
            font={'../assets/fonts/Termina_Black.ttf'}
          />
        )}

        {(displayLabels && isPlanetSelected) && (
          <Html
            as='span'
            wrapperClass='label-wrapper'
            center
            position-y={scaledRadius * 1.12}
            zIndexRange={[100, 0]}
            style={isPlanetSelected ? { pointerEvents: 'none' } : {}}
          >
            <span
              className='planet-label'
              style={{ color }}
              onClick={handleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              {name}
            </span>
          </Html>
        )}

        {renderMoons() && moons.map((moon, index) => {
          const shouldAlignWithTilt = ["Saturn", "Uranus"].includes(name);
          return (
            <group
              key={`${name}-moon-group-${index}`}
              rotation={shouldAlignWithTilt ? [THREE.MathUtils.degToRad(axialTilt), 0, 0] : [0, 0, 0]}
            >
              <Moon
                key={`${name}-moon-${index}`}
                moonData={moon}
                planetPosition={localRef.current?.position}
                parentName={name}
                parentMeshRef={meshRef} // Pass the mesh reference
              />
            </group>
          );
        })}
      </group>

      {orbitPaths && (
        <OrbitPath
          origin={orbitalOrigin}
          radius={scaledOrbitalRadius}
          eccentricity={eccentricity}
          orbitalInclination={orbitalInclination}
          color={color}
          name={name + "-orbit-path"}
          lineWidth={isPlanetSelected ? 3 : 2}
          opacity={orbitPathOpacity}
          hiRes={isPlanetSelected}
          position={localRef.current?.position}
          arcLength={.9}
        />
      )}
    </>
  );
};

export default Planet;