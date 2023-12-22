import React, { useRef, forwardRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import OrbitPath from "./OrbitPath";
import planetsData from "../data/planetsData";
import useStore, { usePlanetStore } from "../store/store";
import { Line, Torus } from "@react-three/drei"; // or use plain three.js objects
import * as THREE from "three";

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
      // Apply Axial Tilt
      const axialTiltInRadians = axialTilt * (Math.PI / 180); // Convert axial tilt to radians
      localRef.current.rotation.z = axialTiltInRadians; // Apply tilt to the rotation.z (assuming z is the axis of rotation)

      // Calculate the orbital inclination effect
      const inclination = orbitalInclination * (Math.PI / 180); // Convert to radians if it's in degrees
      const y = Math.sin(inclination) * scaledOrbitalRadius * Math.sin(localAngleRef.current);

      localRef.current.position.set(x, y, z); // Now includes the y position adjusted by inclination
      updatePlanetPosition(name, { x, y, z });

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

  // Calculate points for the axial tilt line
  const lineLength = scaledRadius * 2; // Make the line extend out of the planet
  const axialTiltLinePoints = [
    [0, -lineLength / 1.8, 0], // Starting point of the line
    [0, lineLength / 1.8, 0], // Ending point of the line
  ];

  return (
    <>
      <group ref={localRef}>
        <mesh onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <sphereGeometry args={[scaledRadius, detailLevel, detailLevel]} />
          {textures ? <meshStandardMaterial map={textures.map} /> : <meshStandardMaterial color={color} />}
        </mesh>
        {name === "Saturn" && (
          <Torus args={[scaledRadius * 1.5, scaledRadius * 0.3, 2, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            {/* Adjust args based on the scale and appearance you want for the rings */}
            <meshBasicMaterial color={"#F4E1C1"} side={THREE.DoubleSide} transparent opacity={0.6} />
            {/* Replace "#F4E1C1" with whatever color you choose for the rings */}
          </Torus>
        )}
        <Line
          points={axialTiltLinePoints} // Points the line goes through
          color={color} // Or any color you like
          rotation={[0, 0, (axialTilt * Math.PI) / 180]} // Align with the axial tilt
        />
      </group>
      <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} orbitalInclination={orbitalInclination} color={color} name={name} />
    </>
  );
});

export default Planet;
