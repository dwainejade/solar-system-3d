import React, { useRef, forwardRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import useExperimentsStore from "@/store/experiments";
import { useTexture, Line, Html } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import initialPlanetsData, { distanceScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCameraMoon";

const MoonExperimentsTwo = forwardRef(({ moonData, planetRef, parentName, scaledPlanetRadius }, ref) => {
  const {
    name,
    orbitalRadius,
    radius,
    color,
    orbitalPeriod,
  } = moonData;

  // Store hooks
  const { simSpeed, toggleDetailsMenu } = useStore();
  const {
    selectedMoon,
    setSelectedMoon,
    updateMoonPosition,
    updateMoonWorldPosition,
    displayLabels,
    planetPositions
  } = usePlanetStore();
  const { activeCamera, switchToMoonCamera } = useCameraStore();
  const { experimentStatus, setExperimentStatus } = useExperimentsStore();

  // Scaled values
  const scaledValues = useMemo(() => ({
    radius: radius * moonSizeScaleFactor,
    orbitalRadius: orbitalRadius * moonDistanceScaleFactor,
    meanMotion: (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60)
  }), [radius, orbitalRadius, orbitalPeriod]);

  // Refs
  const localRef = useRef();
  const meshRef = useRef();
  const velocityRef = useRef(null);
  const startPosRef = useRef(null);
  const trailPointsRef = useRef([]);

  // States
  const [hasCollided, setHasCollided] = useState(false);
  const isMoonSelected = selectedMoon && selectedMoon.name === name;
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/moon.jpg') : null;

  // Set initial position and handle experiment start/reset
  useEffect(() => {
    if (experimentStatus === "started") {
      const planetPos = planetPositions[parentName] || { x: 0, y: 0, z: 0 };
      const initialPosition = new Vector3(
        planetPos.x + scaledValues.orbitalRadius,
        planetPos.y,
        planetPos.z
      );

      if (localRef.current) {
        localRef.current.position.copy(initialPosition);
      }

      // Save start position and initialize trail
      startPosRef.current = initialPosition.clone();
      trailPointsRef.current = [
        [initialPosition.x, initialPosition.y, initialPosition.z]
      ];

      // Calculate escape velocity with more dramatic components
      const baseSpeed = scaledValues.meanMotion * scaledValues.orbitalRadius;
      velocityRef.current = {
        x: baseSpeed * 0.8,  // Stronger forward momentum
        y: baseSpeed * 0.3,  // Add vertical component
        z: baseSpeed * 0.5   // Stronger outward component
      };
    }
  }, [experimentStatus]);


  let frameCount = 0;
  useFrame((state, delta) => {
    if (hasCollided || experimentStatus === "completed") return;
    if (experimentStatus !== "started" || !velocityRef.current) return;

    frameCount++;
    if (frameCount % 60 === 0) { // Log every 60 frames to avoid console spam
      console.log("Current Position:", localRef.current?.position);
      console.log("Trail Points Length:", trailPointsRef.current.length);
      console.log("Last Trail Point:", trailPointsRef.current[trailPointsRef.current.length - 1]);
    }

    const adjustedDelta = delta * simSpeed;

    if (localRef.current) {
      // Update position based on velocity
      const pos = localRef.current.position;
      pos.x += velocityRef.current.x * adjustedDelta;
      pos.y += velocityRef.current.y * adjustedDelta;
      pos.z += velocityRef.current.z * adjustedDelta;

      // Update trail
      trailPointsRef.current.push([pos.x, pos.y, pos.z]);
      if (trailPointsRef.current.length > 100) {
        trailPointsRef.current = trailPointsRef.current.slice(-100);
      }

      // Check escape distance
      const planetPos = planetPositions[parentName] || { x: 0, y: 0, z: 0 };
      const distanceFromPlanet = new THREE.Vector3(
        pos.x - planetPos.x,
        pos.y - planetPos.y,
        pos.z - planetPos.z
      ).length();

      if (distanceFromPlanet > scaledValues.orbitalRadius * 3) {
        console.log("Escape Completed");
        setExperimentStatus("completed");
        return;
      }

      // Update position tracking
      updateMoonPosition(name, pos.clone());
      updateMoonWorldPosition(name, pos.clone());
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (isMoonSelected) return;
    toggleDetailsMenu(true);
    setSelectedMoon(moonData);
    switchToMoonCamera(parentName, name);
  };



  return (
    <>
      {experimentStatus === "started" && trailPointsRef.current.length > 1 && (
        <>
          <Line
            points={trailPointsRef.current}
            color={hasCollided ? "red" : "hotpink"}
            lineWidth={2}
            transparent
            opacity={0.6}
          />
        </>
      )}

      <group ref={localRef}>
        <mesh
          ref={meshRef}
          key={name + '-textured'}
          rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
          onClick={handleClick}
        >
          <sphereGeometry args={[scaledValues.radius, (isMoonSelected ? 38 : 24), (isMoonSelected ? 28 : 16)]} />
          <meshStandardMaterial
            metalness={hasCollided ? 0.8 : 0.5}
            roughness={hasCollided ? 0.2 : 0.5}
            map={!hasCollided ? moonTexture : null}
            color={hasCollided ? 'red' : (!moonTexture ? color : null)}
            emissive={hasCollided ? 'darkred' : null}
          />
        </mesh>

        {(displayLabels || isMoonSelected) && (
          <Html
            position={[0, scaledValues.radius * 1.2, 0]}
            center
            zIndexRange={[100, 0]}
            occlude={simSpeed < 20000}
            style={isMoonSelected ? { pointerEvents: 'none' } : {}}
          >
            <span
              className="planet-label"
              onClick={handleClick}
              style={{
                color,
                fontSize: isMoonSelected ? '14px' : '12px',
                cursor: 'pointer',
              }}
            >
              {name}
            </span>
          </Html>
        )}
      </group>
    </>
  );
});

export default MoonExperimentsTwo;