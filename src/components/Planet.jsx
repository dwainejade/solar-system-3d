import React, { useRef, forwardRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import OrbitPath from "./OrbitPath";
import planetsData from "../data/planetsData";
import useStore, { usePlanetStore } from "../store/store";
import { Line, Torus } from "@react-three/drei";
import { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";

// default values
const defaultBodyData = planetsData.Earth;

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
  // const numberOfRotationsPerOrbit = rotationPeriod ? (orbitalPeriod * 24) / rotationPeriod : 0;
  const scaledOrbitalRadius = orbitalRadius * distanceScaleFactor;
  const scaledRadius = radius * sizeScaleFactor;
  // const scaledOrbitalSpeed = orbitalSpeed * simSpeed;
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name; // clicked planet

  // const [rotationCount, setRotationCount] = useState(0);
  const lastRotationRef = useRef(0);
  // const [rotationElapsedTime, setRotationElapsedTime] = useState(0);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  // Define state and refs to track dragging
  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Adjust delta based on simulation speed (simSpeed)
    const adjustedDelta = delta * simSpeed;

    // Update planet's orbital position
    const planetOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Assuming orbitalPeriod is in Earth days
    localAngleRef.current += planetOrbitalSpeed * adjustedDelta;
    const x = scaledOrbitalRadius * Math.cos(localAngleRef.current);
    const z = scaledOrbitalRadius * Math.sin(localAngleRef.current);

    if (localRef.current) {
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
  // Modify the handleClick to account for dragging
  const handleClick = e => {
    e.stopPropagation();
    if (!isDragging) {
      // Your original click handling logic
      // This now only triggers if the mesh wasn't dragged
      if (selectedPlanet && selectedPlanet.name === name) {
        setSelectedPlanet(null);
      } else {
        setSelectedPlanet(mergedData);
      }
    }
  };

  // New handler for pointer down
  const handlePointerDown = e => {
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state
    initialClickPosition.current = { x: e.clientX, y: e.clientY }; // Record initial click position
  };

  // New handler for pointer move
  const handlePointerMove = e => {
    // Calculate the distance moved
    const distanceMoved = Math.sqrt(
      Math.pow(e.clientX - initialClickPosition.current.x, 2) + Math.pow(e.clientY - initialClickPosition.current.y, 2)
    );
    if (distanceMoved > 5) {
      // Threshold to consider as a drag, adjust as needed
      setIsDragging(true);
    }
  };

  // New handler for pointer up
  const handlePointerUp = e => {
    setIsDragging(false); // Reset dragging state
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

  // console.log(name, textures && isPlanetSelected);
  console.log({ selectedPlanet });
  return (
    <>
      <group ref={localRef}>
        <mesh
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[scaledRadius, detailLevel, detailLevel]} />
          {textures && isPlanetSelected ? (
            <meshPhysicalMaterial metalness={0.9} roughness={0.65} map={textures.map} />
          ) : (
            <meshStandardMaterial color={color} />
          )}
        </mesh>
        {name === "Saturn" && (
          <group>
            <Torus args={[scaledRadius * 2, scaledRadius * 0.15, 2, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color={"#Ffffff"} />
            </Torus>
            <Torus args={[scaledRadius * 1.5, scaledRadius * 0.3, 2, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color={"#F4E1C1"} />
            </Torus>
          </group>
        )}
        {/* <Line points={axialTiltLinePoints} color={color} /> */}
      </group>
      {!selectedPlanet && (
        <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} orbitalInclination={orbitalInclination} color={color} name={name} />
      )}
    </>
  );
});

export default Planet;
