import React, { useRef, forwardRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import useStore, { usePlanetStore } from "../store/store";
import { moonsData, moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";

import OrbitPath from "./OrbitPath";

const Moon = forwardRef(({ bodyData, parentPosition, parentName }, ref) => {
  const { simSpeed, orbitPaths } = useStore();
  const { displayNames, selectedPlanet, selectedMoon, setSelectedMoon, setSelectedPlanet } = usePlanetStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(0);
  const [moonPosition, setMoonPosition] = useState({ x: 0, y: 0, z: 0 });

  const { name, orbitalRadius, radius, color, orbitalPeriod, orbitalInclination } = bodyData;

  // Apply moon-specific scaling factors
  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  // Calculate the moon's orbital speed
  const orbitalSpeed = useMemo(() => {
    return (2 * Math.PI) / (bodyData.orbitalPeriod * 24 * 60 * 60); // Orbital period in Earth days
  }, [orbitalPeriod]);

  useFrame((state, delta) => {
    // Calculate the moon's orbital speed based on its orbital period
    // bodyData.orbitalPeriod in Earth days

    // Update the angle based on the simulation speed
    localAngleRef.current -= orbitalSpeed * simSpeed * delta;
    // console.log(orbitalSpeed * simSpeed);

    // Calculate moon's position relative to its parent planet
    // Calculate moon's position relative to its parent planet
    const angle = localAngleRef.current;
    const moonX = Math.cos(angle) * scaledOrbitalRadius + parentPosition?.x;
    const moonZ = Math.sin(angle) * scaledOrbitalRadius + parentPosition?.z;
    const inclination = orbitalInclination * (Math.PI / 180);
    const moonY = Math.sin(angle) * Math.sin(inclination) * scaledOrbitalRadius + parentPosition?.y;

    // Add the parent planet's position to get the moon's position relative to the sun (0,0,0)
    const absoluteMoonX = moonX;
    const absoluteMoonY = moonY;
    const absoluteMoonZ = moonZ;

    // Update the moon's position
    if (localRef.current) {
      localRef.current.position.set(moonX, moonY, moonZ);
      setMoonPosition({ x: moonX, y: moonY, z: moonZ });
    }

    // If orbit paths are enabled, update the orbit path rotation to keep it stationary
    if (orbitPaths && localRef.current) {
      localRef.current.children.forEach(child => {
        if (child instanceof OrbitPath) {
          child.rotation.x = -parentRotation.x;
          child.rotation.y = -parentRotation.y;
          child.rotation.z = -parentRotation.z;
        }
      });
    }
  });

  const handleClick = e => {
    e.stopPropagation();
    const moonData = { bodyData, position: moonPosition };
    if (selectedMoon && selectedMoon.name === name) {
      setSelectedMoon(null);
      setSelectedPlanet(parentData);
    } else {
      setSelectedPlanet(moonData);
      setSelectedMoon(moonData);
    }
  };

  return (
    // (selectedPlanet?.name === parentName || name === "Moon") && (
    <group>
      <mesh ref={localRef} onClick={handleClick}>
        <sphereGeometry args={[scaledRadius, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html
        position={[moonPosition?.x, moonPosition?.y, moonPosition?.z]}
        as='div'
        wrapperClass='moon-wrapper'
        center
        zIndexRange={[100, 0]}
        onClick={() => console.log(`${name} clicked point`)}
      >
        <div className='moon-point' style={{ backgroundColor: color }} onClick={handleClick} />
      </Html>
      {orbitPaths && parentPosition && (
        <group position={[parentPosition.x, parentPosition.y, parentPosition.z]}>
          <OrbitPath
            origin={[0, 0, 0]} // Now relative to the group's position
            radius={scaledOrbitalRadius}
            orbitalInclination={orbitalInclination}
            color={color}
            name={name}
          />
        </group>
      )}
    </group>
    // )
  );
});

export default Moon;
