import React, { useRef, forwardRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";
import Moon from "./Moon";
import Labels from "./Labels";
import moonsData from "@/data/moonsData";
import { earthAtmosphereShader } from "../shaders/atmosphere";
import Rings from "./Rings";

const Planet = ({ name = 'Earth', textures }) => {
  const { planetsData } = usePlanetStore();
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

  const scaledOrbitalRadius = orbitalRadius * (isSurfaceCameraActive ? .0001 : distanceScaleFactor);
  const scaledRadius = radius * sizeScaleFactor;
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name;
  const renderMoons = () => {
    if (isPlanetSelected) return true
    else if (selectedMoon?.parentName === name) return true
    return false
  }
  const detailLevel = (isPlanetSelected || renderMoons()) ? 64 : 16;

  const [scale, setScale] = useState(scaledRadius);
  const textSize = useRef(1);
  const [showTextures, setShowTextures] = useState(false);
  const textureDisplayDistance = 500;
  const [orbitPathOpacity, setOrbitPathOpacity] = useState(1);

  const earthParameters = {
    atmosphereDayColor: '#0088FF',
    atmosphereTwilightColor: '#FF9D00'
  };

  useFrame((state, delta) => {
    const adjustedDelta = delta * simSpeed;

    // Calculate mean motion (n)
    const meanMotion = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60);

    // Update mean anomaly (M) - keep subtraction for counterclockwise motion
    if (localAngleRef.current === 0) {
      localAngleRef.current = initialOrbitalAngle * (Math.PI / 180);
    } else {
      localAngleRef.current -= meanMotion * adjustedDelta;
    }

    // Solve Kepler's Equation iteratively
    let E = localAngleRef.current;
    const maxIterations = 10;
    const tolerance = 1e-6;

    // Newton-Raphson iteration to solve Kepler's equation: M = E - e * sin(E)
    for (let i = 0; i < maxIterations; i++) {
      const deltaE = (E - eccentricity * Math.sin(E) - localAngleRef.current) /
        (1 - eccentricity * Math.cos(E));
      E -= deltaE;
      if (Math.abs(deltaE) < tolerance) break;
    }

    // Calculate true anomaly (ν) from eccentric anomaly (E)
    const trueAnomaly = 2 * Math.atan(
      Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
      Math.tan(E / 2)
    );

    // Calculate radius vector (distance from focus)
    const r = (scaledOrbitalRadius * (1 - eccentricity * eccentricity)) /
      (1 + eccentricity * Math.cos(trueAnomaly));

    // Calculate position - using negative trueAnomaly for counterclockwise motion
    const x = r * Math.cos(-trueAnomaly);
    const baseZ = r * Math.sin(-trueAnomaly);

    if (localRef.current) {
      // Apply inclination
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * baseZ;
      const z = Math.cos(inclination) * baseZ;

      localRef.current.position.set(x, y, z);
      updatePlanetPosition(name, { x, y, z });

      // Handle rotation
      if (rotationPeriod) {
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
      if (distance / 1000 <= scaledRadius) {
        setScale(scaledRadius);
      } else {
        setScale(distance / 1000);
      }
      setShowTextures(activeCamera.type === 'moon' || distance < textureDisplayDistance);
      const maxDistance = scaledRadius * 100;
      const minDistance = scaledRadius * 1;
      const opacity = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));
      setOrbitPathOpacity(opacity);

      if (textSize.current) {
        textSize.current = distance * 0.02;
      }
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.order = 'YXZ';
      meshRef.current.rotation.y = 0;
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(axialTilt);
    }
  }, [axialTilt, selectedPlanet]);

  const handleClick = e => {
    e.stopPropagation();
    if (isDragging || activeCamera.name === name) return;
    toggleCameraTransitioning(true);
    toggleDetailsMenu(true);
    setSelectedMoon(null);
    setSelectedPlanet(mergedData);

    switchToPlanetCamera(name);
  };

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
            <sphereGeometry args={[renderMoons() ? scaledRadius : scale * 8, 8, 8]} />
          }
        </mesh>

        <mesh
          ref={meshRef}
          key={isPlanetSelected ? name + '-textured' : name + '-basic'}
          onDoubleClick={handleDoubleClick}
        >
          <sphereGeometry args={[(renderMoons() ? scaledRadius : scale * 8), detailLevel, detailLevel / 2]} />
          {((!isPlanetSelected && !renderMoons()) && texturesLoaded) ?
            <meshBasicMaterial color={color} />
            :
            <>
              {name === "Earth" && isPlanetSelected &&
                <>
                  <mesh ref={cloudsRef} key={`${name}-cloud_texture`}>
                    <sphereGeometry args={[Math.min(scaledRadius * 1.008), detailLevel, detailLevel / 2]} />
                    <meshStandardMaterial alphaMap={textures?.clouds} transparent opacity={0.8} />
                  </mesh>
                  <mesh key={`${name}-atmosphere_texture`}>
                    <sphereGeometry args={[Math.min(scaledRadius * 1.02), detailLevel, detailLevel / 2]} />
                    <shaderMaterial args={[earthAtmosphereShader]} />
                  </mesh>
                </>
              }
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

        {(displayLabels && !isPlanetSelected || isHovered && !isPlanetSelected) && (
          <Labels
            key={name}
            text={name}
            size={textSize?.current}
            position={[0, scale * 1.2 + textSize?.current, 0]}
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
            position-y={isPlanetSelected ? scale + scale * 0.25 : scale * 4}
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none' }}
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
              />
            </group>
          );
        })}
      </group>

      {orbitPaths && (
        <OrbitPath
          origin={orbitalOrigin}
          radius={scaledOrbitalRadius}  // This is your semi-major axis
          eccentricity={eccentricity}
          orbitalInclination={orbitalInclination}
          color={color}
          name={name + "-orbit-path"}
          opacity={.4}
          hiRes={isPlanetSelected}
        />
      )}
    </>
  );
};

export default Planet;