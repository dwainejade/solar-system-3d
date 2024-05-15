import React, { useRef, forwardRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { useTexture, Html, Text } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";
import Labels from "./Labels";

const Moon = forwardRef(({ moonData, planetPosition }, ref) => {
  const { simSpeed, orbitPaths } = useStore();
  const { selectedPlanet, selectedMoon, setSelectedMoon, updateMoonPosition, setSelectedPlanet, displayLabels } = usePlanetStore();
  const { satelliteCamera, toggleSatelliteCamera } = useCameraStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(0);

  const { name, orbitalRadius, radius, color, orbitalPeriod, orbitalInclination } = moonData;
  const isMoonSelected = selectedMoon && selectedMoon.name === name; // clicked planet

  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/2k_moon.jpg') : null;

  // Apply moon-specific scaling factors
  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  // Calculate the moon's orbital speed
  const orbitalSpeed = useMemo(() => {
    return (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Orbital period in Earth days
  }, [orbitalPeriod]);

  useEffect(() => {
    localAngleRef.current = Math.random() * 2 * Math.PI; // Random angle between 0 and 2π
  }, []);

  useFrame((state, delta) => {
    // Update the angle based on the simulation speed
    localAngleRef.current -= orbitalSpeed * simSpeed * delta;

    // Calculate moon's position relative to its parent planet
    const angle = localAngleRef.current;
    const moonX = Math.cos(angle) * scaledOrbitalRadius;
    const moonZ = Math.sin(angle) * scaledOrbitalRadius;
    const inclination = orbitalInclination * (Math.PI / 180);
    const moonY = Math.sin(angle) * Math.sin(inclination) * scaledOrbitalRadius;

    // Update the moon's position
    if (localRef.current) {
      localRef.current.position.set(moonX, moonY, moonZ);
      updateMoonPosition(name, { moonX, moonY, moonZ });
      // Point the moon towards the parent planet's position
      // localRef.current.lookAt(planetPosition);
    }
  });

  const handleClick = e => {
    e.stopPropagation();
    if (selectedMoon && selectedMoon.name === name) return;

    setSelectedPlanet(null);
    setSelectedMoon(moonData);
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

  const [scale, setScale] = useState(scaledRadius); // scaledRadius = 0.6
  const [textSize, setTextSize] = useState(1);
  useFrame(({ camera }) => {
    if (!localRef.current) return;

    const worldPosition = localRef.current.getWorldPosition(new Vector3());
    const distance = worldPosition.distanceTo(camera.position);

    if (distance / 100 <= scaledRadius) {
      setScale(scaledRadius);
    } else {
      setScale(distance / 100);
    }

    const textSizeFactor = 0.016; // Adjust this factor to scale text size for better legibility
    setTextSize(textSizeFactor * distance);
  });

  return (
    <>
      {isMoonSelected && localRef.current &&
        <SatelliteCamera target={localRef.current} targetName={name} color={color} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      }

      <group ref={localRef} >
        {/* Invisible mesh for interaction */}
        <mesh
          visible={false}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[(Math.max(scaledRadius, scale)) * 2, 8, 8]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>

        <mesh>
          <sphereGeometry args={[scaledRadius, 32, 16]} />
          <meshStandardMaterial metalness={0.9} roughness={0.65} map={moonTexture || null} color={!moonTexture ? color : null} />
        </mesh>

        {(displayLabels || isHovered && !isMoonSelected) && simSpeed < 200000 && (
          <Labels key={name + '-label'} text={name} size={textSize} position={[0, scale * 1.5, 0]} color={color} font={'../assets/fonts/Termina_Heavy.ttf'} />
        )}
      </group>

      {orbitPaths && (
        <group position={[0, 0, 0]}>
          <OrbitPath
            origin={[0, 0, 0]}
            radius={scaledOrbitalRadius}
            orbitalInclination={orbitalInclination}
            color={color}
            name={name + "-orbit-path"}
            hiRes={isMoonSelected}
            lineType={'solid'}
            opacity={0.3}
          />
        </group>
      )}
    </>
  );
});

export default Moon;
