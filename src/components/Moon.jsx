import React, { useRef, forwardRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { useTexture } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCameraMoon";
import Labels from "./Labels";


const Moon = forwardRef(({ moonData, planetPosition, parentName }, ref) => {
  const {
    name,
    orbitalRadius,
    radius,
    color,
    orbitalPeriod,
    orbitalInclination,
    eccentricity
  } = moonData;

  const { simSpeed, toggleDetailsMenu } = useStore();
  const {
    selectedMoon,
    moonAngles,
    setSelectedMoon,
    updateMoonPosition,
    updateMoonWorldPosition,
    setSelectedPlanet,
    displayLabels,
    orbitPaths
  } = usePlanetStore();
  const { satelliteCamera, toggleSatelliteCamera, activeCamera, switchToMoonCamera } = useCameraStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(moonAngles[name] || Math.random() * 2 * Math.PI);

  const isMoonSelected = selectedMoon && selectedMoon.name === name;
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/2k_moon.jpg') : null;

  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  // Calculate mean motion (n)
  const meanMotion = useMemo(() => {
    return (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Convert orbital period to seconds
  }, [orbitalPeriod]);

  useFrame((state, delta) => {
    const adjustedDelta = delta * simSpeed;

    // Update mean anomaly (M)
    localAngleRef.current -= meanMotion * adjustedDelta;

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

    // Calculate position in orbital plane
    const x = r * Math.cos(-trueAnomaly);
    const baseZ = r * Math.sin(-trueAnomaly);

    if (localRef.current) {
      // Apply inclination
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * baseZ;
      const z = Math.cos(inclination) * baseZ;

      localRef.current.position.set(x, y, z);
      const moonPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonPosition(name, { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z });

      if (name === 'Moon' && planetPosition) {
        // Point the moon towards the parent planet's position
        const planetPos = new Vector3(...planetPosition);
        localRef.current.lookAt(planetPos);
      }

      // Update world position for camera and other calculations
      const worldPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonWorldPosition(name, {
        x: worldPosition.x,
        y: worldPosition.y,
        z: worldPosition.z
      });

      // Handle scaling based on camera distance
      const distance = worldPosition.distanceTo(state.camera.position);
      if (distance / 100 <= scaledRadius) {
        setScale(scaledRadius);
      } else {
        setScale(distance / 100);
      }

      // Update text size
      if (distance < 4500) {
        setTextSize(0.016 * distance);
      }
    }
  });

  const handleClick = e => {
    e.stopPropagation();
    if (isMoonSelected) return;
    // setSelectedPlanet(null);
    toggleDetailsMenu(true);
    setSelectedMoon(moonData);
    switchToMoonCamera(parentName, name);
  };

  const [isHovered, setIsHovered] = useState(false);
  const handlePointerOver = e => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const [scale, setScale] = useState(scaledRadius);
  const [textSize, setTextSize] = useState(1);

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
          key={name + '-textured'}
          rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <sphereGeometry args={[scaledRadius, (isMoonSelected ? 32 : 14), (isMoonSelected ? 16 : 12)]} />
          <meshStandardMaterial
            metalness={0.5}
            roughness={0.5}
            map={moonTexture || null}
            color={!moonTexture ? color : null}
          />
        </mesh>

        {(displayLabels || isHovered && !isMoonSelected) && simSpeed < 200000 && (
          <Labels
            key={name + '-label'}
            text={name}
            size={textSize}
            position={[0, scale * 1.5, 0]}
            color={color}
            font={'../assets/fonts/Termina_Heavy.ttf'}
            handleClick={handleClick}
          />
        )}
      </group>

      {orbitPaths && (
        <OrbitPath
          origin={[0, 0, 0]}
          radius={scaledOrbitalRadius}
          eccentricity={eccentricity}
          orbitalInclination={orbitalInclination}
          color={color}
          name={name + "-orbit-path"}
          hiRes={isMoonSelected}
          lineType={'solid'}
          lineWidth={isMoonSelected ? 1 : .4}
        />
      )}
    </>
  );
});

export default Moon;