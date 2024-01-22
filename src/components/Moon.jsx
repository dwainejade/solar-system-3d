import React, { useRef, forwardRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import useStore, { usePlanetStore } from "../store/store";
import { moonSizeScaleFactor, moonDistanceScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";

const Moon = forwardRef(({ bodyData, parentPosition, parentRotation, parentName }, ref) => {
  const { simSpeed, orbitPaths } = useStore();
  const { displayNames, selectedPlanet, selectedMoon, setSelectedMoon } = usePlanetStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(0);
  const [moonPosition, setMoonPosition] = useState({ x: 0, y: 0, z: 0 });

  const { name, orbitalRadius, radius, color, orbitalPeriod, orbitalInclination } = bodyData;

  // Apply moon-specific scaling factors
  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  // Calculate the moon's orbital speed
  const orbitalSpeed = useMemo(() => {
    return (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Orbital period in Earth days
  }, [orbitalPeriod]);

  useFrame(() => {
    localAngleRef.current += orbitalSpeed * simSpeed;

    // Calculate moon's position
    const angle = localAngleRef.current;
    const moonX = Math.cos(angle) * scaledOrbitalRadius;
    const moonZ = Math.sin(angle) * scaledOrbitalRadius;
    const inclination = orbitalInclination * (Math.PI / 180);
    const moonY = Math.sin(angle) * Math.sin(inclination) * scaledOrbitalRadius;

    if (localRef.current) {
      localRef.current.position.set(moonX, moonY, moonZ);
      setMoonPosition({ x: moonX, y: moonY, z: moonZ });
    }
    if (orbitPaths && localRef.current) {
      // Apply inverse rotation to the orbit path to keep it stationary
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
    setSelectedMoon({ name, position: moonPosition });
    console.log(`${name} clicked`);
  };

  return (
    (selectedPlanet?.name === parentName || name === "Moon") && (
      <group>
        <mesh ref={localRef} onClick={handleClick}>
          <sphereGeometry args={[scaledRadius, 32, 32]} />
          <meshBasicMaterial color={color} />
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
        {orbitPaths && (
          <OrbitPath
            origin={parentPosition}
            radius={scaledOrbitalRadius}
            orbitalInclination={orbitalInclination}
            color={color}
            name={name}
          />
        )}
      </group>
    )
  );
});

export default Moon;
