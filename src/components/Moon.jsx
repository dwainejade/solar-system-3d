import React, { useRef, forwardRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useStore, { usePlanetStore } from "../store/store";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";

import OrbitPath from "./OrbitPath";
import { Vector3 } from "three";
import { Trail } from "@react-three/drei";

const Moon = forwardRef(({ moonData, textures }, ref) => {
  const { simSpeed, orbitPaths } = useStore();
  const { selectedPlanet, selectedMoon, setSelectedMoon, setSelectedPlanet } = usePlanetStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(0);
  const [moonPosition, setMoonPosition] = useState({ x: 0, y: 0, z: 0 });

  const { name, orbitalRadius, radius, color, orbitalPeriod, orbitalInclination } = moonData;

  // Apply moon-specific scaling factors
  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;
  // console.log(name, scaledRadius)
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


  // useEffect(() => {
  //   if (localRef.current) {
  //     // Calculate the initial direction vector pointing from the moon to the parent planet
  //     const initialDirectionToParent = new Vector3().subVectors(new Vector3(0, 0, 0));
  //     const initialAngleToParent = Math.atan2(initialDirectionToParent.z, initialDirectionToParent.x);

  //     // Set the initial rotation of the moon mesh to face away from the parent planet
  //     localRef.current.rotation.y = initialAngleToParent - Math.PI / 2; // Adjust as needed
  //   }
  // }, []);


  // const handleClick = e => {
  //   e.stopPropagation();
  //   const moonData = { bodyData, position: moonPosition };
  //   if (selectedMoon && selectedMoon.name === name) {
  //     setSelectedMoon(null);
  //   } else {
  //     setSelectedPlanet(null);
  //     setSelectedMoon(moonData);
  //   }
  // };

  // const [scale, setScale] = useState(scaledRadius);
  // useFrame(({ camera }) => {
  //   if (!localRef.current) return;

  //   const distance = localRef.current.position.distanceTo(camera.position);
  //   let newScale;

  //   if (distance > 20000) {
  //     // Scale down the moon as the camera gets closer but no smaller than scaledRadius
  //     newScale = Math.max(scaledRadius, (distance / 1000) * scaledRadius);
  //   } else {
  //     // When the distance is greater than 50 units, just use the scaledRadius
  //     newScale = scaledRadius;
  //   }

  //   setScale(newScale);
  //   if (name === 'Moon') {
  //     console.log({ newScale, scaledRadius })
  //   }
  // });

  // if planet not selected then moon will not be visible
  // if (!selectedPlanet || selectedPlanet.name !== moonData) {
  //   return null;
  // }

  return (
    <group>

      <mesh ref={localRef} >
        <sphereGeometry args={[scaledRadius, 16, 16]} />

        <meshStandardMaterial metalness={0.9} roughness={0.65} map={textures?.map} zIndexRange={[100 - 1]} />

      </mesh>

      {orbitPaths && (
        <group position={[0, 0, 0]} >
          <OrbitPath
            origin={[0, 0, 0]}
            radius={scaledOrbitalRadius}
            orbitalInclination={orbitalInclination}
            color={color}
            name={name + "-orbit-path"}
          />
        </group>
      )}
    </group>
    // )
  );
});

export default Moon;
