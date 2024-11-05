import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import useExperimentsStore from "../store/experiments";
import initialPlanetsData, { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import moonsData from "@/data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";
import Moon from "./Moon";
import Labels from "./Labels";
import { earthAtmosphereShader } from "../shaders/atmosphere";
import Rings from "./Rings";
import KeplerTriangles from "./KeplerTriangles";
import GravityVectors from "./GravityVectors";

const Planet = ({ name = 'Earth', textures }) => {
  const { planetsData } = usePlanetStore();
  const { experimentType, experimentPlanet, experimentStatus } = useExperimentsStore();
  const bodyData = planetsData[name];
  const mergedData = { ...bodyData };

  const {
    radius = 1, // Provide default values to prevent null
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
  } = useCameraStore();

  // In the Planet component, near the top where refs are defined:
  const localRef = useRef();
  const localAngleRef = useRef(0);
  const cloudsRef = useRef();
  const meshRef = useRef(null);

  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });

  // Ensure positive values for all scaled measurements
  const scaledOrbitalRadius = Math.max(0.1, orbitalRadius * (isSurfaceCameraActive ? .0001 : distanceScaleFactor));
  const scaledRadius = Math.max(0.1, radius * sizeScaleFactor);
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name;
  const renderMoons = () => {
    if (isPlanetSelected) return true;
    if (selectedMoon?.parentName === name) return true;
    return false;
  };
  const detailLevel = (isPlanetSelected || renderMoons()) ? 64 : 16;

  const [scale, setScale] = useState(scaledRadius);
  const textSize = useRef(1);
  const [showTextures, setShowTextures] = useState(false);
  const textureDisplayDistance = 500;
  const [orbitPathOpacity, setOrbitPathOpacity] = useState(1);
  const [daysElapsed, setDaysElapsed] = useState(0);

  useEffect(() => {
    if (experimentStatus === null) {
      localAngleRef.current = -0.000001;
      setDaysElapsed(0);
    }
  }, [experimentStatus]);

  useFrame((state, delta) => {
    const adjustedDelta = delta * simSpeed;
    if (experimentStatus === "completed") return;

    // Calculate mean motion (n)
    const meanMotion = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60);
    localAngleRef.current -= meanMotion * adjustedDelta;

    //  Solve Kepler's Equation iteratively
    let E = localAngleRef.current;
    const maxIterations = 10;
    const tolerance = 1e-6;

    for (let i = 0; i < maxIterations; i++) {
      const deltaE = (E - eccentricity * Math.sin(E) - localAngleRef.current) /
        (1 - eccentricity * Math.cos(E));
      E -= deltaE;
      if (Math.abs(deltaE) < tolerance) break;
    }

    const trueAnomaly = 2 * Math.atan(
      Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
      Math.tan(E / 2)
    );

    const r = (scaledOrbitalRadius * (1 - eccentricity * eccentricity)) /
      (1 + eccentricity * Math.cos(trueAnomaly));

    const x = r * Math.cos(-trueAnomaly);
    const baseZ = r * Math.sin(-trueAnomaly);

    if (localRef.current) {
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * baseZ;
      const z = Math.cos(inclination) * baseZ;

      localRef.current.position.set(x, y, z);
      updatePlanetPosition(name, { x, y, z });

      if (rotationPeriod && meshRef.current) {
        const rotationPeriodInSeconds = rotationPeriod * 3600;
        const rotationSpeed = (2 * Math.PI) / rotationPeriodInSeconds;
        const rotationIncrement = rotationSpeed * adjustedDelta;

        const yAxis = new THREE.Vector3(0, 1, 0);
        meshRef.current.rotateOnAxis(yAxis, rotationIncrement);

        // Calculate days elapsed based on Earth's rotation
        // if (name === 'Earth') {
        // rotationPeriod is in hours, adjustedDelta in seconds
        const daysIncrement = adjustedDelta / (24 * 3600); // Convert to days
        setDaysElapsed(prev => prev + daysIncrement);
        // }

        if (localRef.current.rotation.y >= 2 * Math.PI && isPlanetSelected) {
          localRef.current.rotation.y %= 2 * Math.PI;
        }

        if (cloudsRef.current) {
          cloudsRef.current.rotation.y += rotationIncrement * 1.1;
        }
      }

      const distance = localRef.current.position.distanceTo(state.camera.position);
      // Ensure scale never goes below minimum value
      const newScale = Math.max(0.1, distance / 1000 <= scaledRadius ? scaledRadius : distance / 1000);
      setScale(newScale);

      setShowTextures(activeCamera.type === 'moon' || distance < textureDisplayDistance);
      const maxDistance = scaledRadius * 100;
      const minDistance = scaledRadius * 1;
      const opacity = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));
      setOrbitPathOpacity(opacity);

      if (textSize.current) {
        textSize.current = Math.max(0.1, distance * 0.02);
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



  // Calculate safe geometry values
  const visibleSphereRadius = Math.max(0.1, renderMoons() ? scaledRadius : scale * 8);
  const planetSphereRadius = Math.max(0.1, renderMoons() ? scaledRadius : scale * 8);
  const cloudSphereRadius = Math.max(0.1, scaledRadius * 1.008);
  const atmosphereSphereRadius = Math.max(0.1, scaledRadius * 1.02);

  return (
    <>
      {activeCamera?.name === name && localRef.current &&
        <SatelliteCamera
          target={localRef.current}
          targetName={name}
          size={scaledRadius}
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
            <sphereGeometry args={[visibleSphereRadius, 8, 8]} />
          }
        </mesh>

        <mesh
          ref={meshRef}
          key={isPlanetSelected ? name + '-textured' : name + '-basic'}
          onDoubleClick={handleDoubleClick}
        >
          <sphereGeometry args={[planetSphereRadius, detailLevel, detailLevel / 2]} />
          {((!isPlanetSelected && !renderMoons()) && texturesLoaded) ?
            <meshBasicMaterial color={color} />
            :
            <>
              {name === "Earth" && isPlanetSelected &&
                <>
                  <mesh ref={cloudsRef} key={`${name}-cloud_texture`}>
                    <sphereGeometry args={[cloudSphereRadius, detailLevel, detailLevel / 2]} />
                    <meshStandardMaterial alphaMap={textures?.clouds} transparent opacity={0.8} />
                  </mesh>
                  <mesh key={`${name}-atmosphere_texture`}>
                    <sphereGeometry args={[atmosphereSphereRadius, detailLevel, detailLevel / 2]} />
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
            innerRadius={Math.max(0.1, scaledRadius * 1.2)}
            outerRadius={Math.max(0.1, scaledRadius * 2)}
            height={0}
            rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}
            texture={isPlanetSelected ? textures?.ringTexture : null}
            detail={Math.max(detailLevel, 32)}
          />
        )}

        {name === "Uranus" && showTextures && (
          <Rings
            key={detailLevel + name + '-ring'}
            innerRadius={Math.max(0.1, scaledRadius * 1.5)}
            outerRadius={Math.max(0.1, scaledRadius * 1.9)}
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
          radius={scaledOrbitalRadius}
          eccentricity={eccentricity}
          orbitalInclination={orbitalInclination}
          color={'white'}
          name={name + "-orbit-path"}
          opacity={orbitPathOpacity}
          hiRes={true}
          lineWidth={1}
          depthWrite={false}
        />
      )}


      {experimentType === 'kepler-2' &&
        <KeplerTriangles
          key={name}
          planetName={name}
          planetRef={localRef}
          angleRef={localAngleRef}  // Pass the ref directly
          numTriangles={8}
          radius={scaledOrbitalRadius}
          eccentricity={eccentricity}
          orbitalInclination={orbitalInclination}
        />
      }


      {experimentType === 'newton-1' &&
        <GravityVectors planetRef={localRef} />
      }

    </>
  );
};

export default Planet;