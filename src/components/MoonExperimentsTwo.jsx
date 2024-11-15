import React, { useRef, forwardRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import useExperimentsStore from "@/store/experiments";
import { useTexture, Html, Trail } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
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
  const moonGroupRef = useRef();
  const initialPlanetPos = useRef(null);
  const relativePos = useRef(null);
  const velocity = useRef(null);

  // States
  const isMoonSelected = selectedMoon && selectedMoon.name === name;
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/moon.jpg') : null;

  useEffect(() => {
    if (experimentStatus === "started") {
      const planetPos = planetPositions[parentName] || { x: 0, y: 0, z: 0 };
      initialPlanetPos.current = new Vector3(planetPos.x, planetPos.y, planetPos.z);

      // Set initial relative position
      relativePos.current = new Vector3(scaledValues.orbitalRadius, 0, 0);

      // Set initial velocity
      const baseSpeed = scaledValues.meanMotion * scaledValues.orbitalRadius;
      velocity.current = new Vector3(
        baseSpeed * 0.8,
        baseSpeed * 0.3,
        baseSpeed * 0.5
      );

      // Set initial position
      if (moonGroupRef.current) {
        const initialWorldPos = new Vector3().addVectors(initialPlanetPos.current, relativePos.current);
        moonGroupRef.current.position.copy(initialWorldPos);
      }
    }
  }, [experimentStatus]);

  useFrame((state, delta) => {
    if (!moonGroupRef.current || experimentStatus !== "started") return;
    if (!relativePos.current || !velocity.current) return;

    const adjustedDelta = delta * simSpeed;

    // Update relative position based on velocity
    relativePos.current.add(velocity.current.clone().multiplyScalar(adjustedDelta));

    // Get current planet position
    const planetPos = planetPositions[parentName] || { x: 0, y: 0, z: 0 };
    const planetVector = new Vector3(planetPos.x, planetPos.y, planetPos.z);

    // Calculate new world position
    const newWorldPos = new Vector3().addVectors(planetVector, relativePos.current);

    // Update moon position
    moonGroupRef.current.position.copy(newWorldPos);

    // Check escape distance
    const distanceFromPlanet = relativePos.current.length();
    if (distanceFromPlanet > scaledValues.orbitalRadius * 3) {
      setExperimentStatus("completed");
    }

    // Update position tracking
    updateMoonPosition(name, relativePos.current.clone());
    updateMoonWorldPosition(name, newWorldPos.clone());
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
      {activeCamera?.name === name && moonGroupRef.current && (
        <SatelliteCamera
          target={moonGroupRef.current}
          targetName={name}
          size={scaledValues.radius}
          parentName={parentName}
        />
      )}

      {experimentStatus === "started" ? (
        <group>
          <Trail
            width={2}
            length={50}
            color={new THREE.Color('hotpink')}
            attenuation={(t) => t * t}
          >
            <group ref={moonGroupRef}>
              <mesh
                key={name + '-textured'}
                rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
                onClick={handleClick}
              >
                <sphereGeometry args={[scaledValues.radius, (isMoonSelected ? 38 : 24), (isMoonSelected ? 28 : 16)]} />
                <meshStandardMaterial
                  metalness={0.5}
                  roughness={0.5}
                  map={moonTexture}
                  color={!moonTexture ? color : null}
                />
              </mesh>

              {(displayLabels || isMoonSelected) && (
                <Html
                  position={[0, scaledValues.radius * 1.2, 0]}
                  center
                  zIndexRange={[100, 0]}
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
          </Trail>
        </group>
      ) : (
        <group ref={moonGroupRef}>
          <mesh
            key={name + '-textured'}
            rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
            onClick={handleClick}
          >
            <sphereGeometry args={[scaledValues.radius, (isMoonSelected ? 38 : 24), (isMoonSelected ? 28 : 16)]} />
            <meshStandardMaterial
              metalness={0.5}
              roughness={0.5}
              map={moonTexture}
              color={!moonTexture ? color : null}
            />
          </mesh>

          {(displayLabels || isMoonSelected) && (
            <Html
              position={[0, scaledValues.radius * 1.2, 0]}
              center
              zIndexRange={[100, 0]}
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
      )}
    </>
  );
});

export default MoonExperimentsTwo;