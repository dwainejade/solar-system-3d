import React, { useRef, forwardRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import OrbitPath from "./OrbitPath";
import planetsData from "../data/planetsData";
import useStore, { usePlanetStore } from "../store/store";
import { MeshStandardMaterial } from "three";
// import * as THREE from "three";

// default values
const defaultBodyData = planetsData.Earth;

// scale down data for our model
const distanceScaleFactor = 0.0000001;
const sizeScaleFactor = 0.00015;
const rotationSpeedScaleFactor = 600000;
// const speedScaleFactor = 0.01;

const Planet = forwardRef(({ bodyData, textures }, ref) => {
  const mergedData = { ...defaultBodyData, ...bodyData };
  const {
    name,
    mass,
    radius,
    orbitalOrigin,
    orbitalRadius,
    orbitalSpeed,
    orbitalPeriod,
    orbitalInclination,
    axialTilt,
    rotationPeriod,
    surfaceTemp,
    color,
    gravity,
  } = mergedData;

  const { simSpeed, updateRotationCount, incrementDate } = useStore();
  const { updatePlanetAngle, planetAngles, planetPositions, updatePlanetPosition, selectedPlanet, setSelectedPlanet } = usePlanetStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(planetAngles[name] || 0); // Initialize with saved angle or 0

  // calculating scaled values
  const numberOfRotationsPerOrbit = rotationPeriod ? (orbitalPeriod * 24) / rotationPeriod : 0;
  const scaledOrbitalRadius = orbitalRadius * distanceScaleFactor;
  const scaledRadius = radius * sizeScaleFactor;
  const scaledOrbitalSpeed = orbitalSpeed * simSpeed;
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name; // clicked planet

  // const [rotationCount, setRotationCount] = useState(0);
  const lastRotationRef = useRef(0);
  // const [rotationElapsedTime, setRotationElapsedTime] = useState(0);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  useFrame((state, delta) => {
    // Adjust delta based on simulation speed (simSpeed)
    const adjustedDelta = delta * simSpeed;

    // Update planet's orbital position
    const planetOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Assuming orbitalPeriod is in Earth days
    localAngleRef.current += planetOrbitalSpeed * adjustedDelta;
    const x = scaledOrbitalRadius * Math.cos(localAngleRef.current);
    const z = scaledOrbitalRadius * Math.sin(localAngleRef.current);

    if (localRef.current) {
      localRef.current.position.set(x, 0, z);
      updatePlanetPosition(name, { x, y: 0, z });

      // Planet rotation on its own axis
      if (rotationPeriod) {
        // Calculate rotation speed and increment
        const rotationPeriodInSeconds = rotationPeriod * 3600; // Convert hours to seconds
        const rotationSpeed = (2 * Math.PI) / rotationPeriodInSeconds; // radians per second
        const rotationIncrement = rotationSpeed * adjustedDelta;

        // Increment the rotation
        localRef.current.rotation.y += rotationIncrement;

        // Check for a complete rotation
        if (localRef.current.rotation.y >= 2 * Math.PI) {
          localRef.current.rotation.y %= 2 * Math.PI; // Reset rotation for next cycle
          updateRotationCount(name, 1); // Update rotation count in store for the planet
          if (name === "Earth") {
            incrementDate(); // Increment the simulation date by one day
          }
        }
      }
    }
  });

  const handleClick = e => {
    e.stopPropagation();

    if (selectedPlanet && selectedPlanet.name === name) {
      setSelectedPlanet(null);
    } else {
      setSelectedPlanet(mergedData);
    }
  };

  const handlePointerOver = e => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setHoveredPlanet(name);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    setHoveredPlanet(null);
  };

  const detailLevel = isPlanetSelected ? 64 : 32;

  return (
    <>
      <group ref={localRef}>
        <mesh onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <sphereGeometry args={[scaledRadius, detailLevel, detailLevel]} />
          {textures ? <meshStandardMaterial map={textures.map} /> : <meshStandardMaterial color={color} />}
        </mesh>
      </group>
      <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} color={color} name={name} />
    </>
  );
});

export default Planet;
