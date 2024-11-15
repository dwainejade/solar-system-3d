import React, { useRef, forwardRef, useState, useEffect, useMemo, useCallback } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import useExperimentsStore from "@/store/experiments";
import { useTexture, Line, Html } from "@react-three/drei";
import { Vector3, CatmullRomCurve3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import initialPlanetsData, { sizeScaleFactor } from "../data/planetsData";
import { G, distanceScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCameraMoon";
import GravityVectors from "./GravityVectors";
import Labels from "./Labels";
import { calculateKeplerianOrbit, calculateModifiedKeplerianOrbit, calculateSpiralOrbit } from "../helpers/calculateOrbits";
import MotionTrail from "../helpers/MotionTrail";

const MoonExperiments = forwardRef(({ moonData, planetRef, parentName, scaledPlanetRadius }, ref) => {
  const {
    name,
    orbitalRadius,
    radius,
    color,
    orbitalPeriod,
    orbitalInclination,
    eccentricity
  } = moonData;

  // Store hooks
  const { simSpeed, toggleDetailsMenu } = useStore();
  const {
    selectedMoon,
    moonAngles,
    setSelectedMoon,
    updateMoonPosition,
    updateMoonWorldPosition,
    displayLabels,
    orbitPaths,
    planetsData: newPlanetsData
  } = usePlanetStore();
  const { satelliteCamera, activeCamera, switchToMoonCamera } = useCameraStore();
  const { experimentStatus, setExperimentStatus, experimentType } = useExperimentsStore();

  // Constants
  const scaledValues = useMemo(() => ({
    radius: radius * moonSizeScaleFactor,
    orbitalRadius: orbitalRadius * moonDistanceScaleFactor,
    meanMotion: (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60)
  }), [radius, orbitalRadius, orbitalPeriod]);

  const collisionDistance = scaledValues.radius + scaledPlanetRadius;

  const originalPlanetMass = initialPlanetsData[parentName].mass;
  const planetMass = newPlanetsData[parentName].mass;
  const massRatio = planetMass / originalPlanetMass;

  // Refs
  const localRef = ref || useRef();
  const initialAngle = Math.random() * 2 * Math.PI;
  const localAngleRef = useRef(moonAngles[name] || initialAngle);
  const startAngleRef = useRef(null);
  const meshRef = useRef();

  // States
  const [hasCollided, setHasCollided] = useState(false);
  const isMoonSelected = selectedMoon && selectedMoon.name === name;
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/moon.jpg') : null;

  const [hasEscaped, setHasEscaped] = useState(false);
  const independentPositionRef = useRef(null);
  const independentVelocityRef = useRef(null);


  // Reset when experiment status changes
  useEffect(() => {
    if (experimentStatus === null) {
      if (localRef.current) {
        const currentPos = localRef.current.position;
        localAngleRef.current = Math.atan2(currentPos.z, currentPos.x);
      }
      startAngleRef.current = null;
      setHasCollided(false);
      if (meshRef.current) {
        meshRef.current.material.color.set(moonTexture ? 'white' : color);
        meshRef.current.material.emissive.set('black');
      }
    }
  }, [experimentStatus, color, moonTexture]);

  useFrame((state, delta) => {
    if (hasCollided || experimentStatus === "completed") return;

    if (experimentStatus !== "started") {
      if (localRef.current) {
        localRef.current.position.set(scaledValues.orbitalRadius, 0, 0);
      }
      return;
    }

    const willEscape = massRatio <= 0.5;

    // Initialize trajectory
    if (startAngleRef.current === null) {
      const currentPos = localRef.current.position;
      localAngleRef.current = Math.atan2(currentPos.z, currentPos.x);
      startAngleRef.current = localAngleRef.current;

      if (willEscape) {
        const worldPos = new THREE.Vector3();
        localRef.current.getWorldPosition(worldPos);

        // Calculate Earth's orbital velocity
        const earthOrbitalSpeed = newPlanetsData[parentName].orbitalSpeed * distanceScaleFactor;
        const earthVelocity = new THREE.Vector2(
          -earthOrbitalSpeed * Math.sin(startAngleRef.current),
          earthOrbitalSpeed * Math.cos(startAngleRef.current)
        );

        // Calculate Moon's initial velocity relative to Earth
        const moonSpeed = scaledValues.meanMotion * scaledValues.orbitalRadius;
        const moonLocalVel = new THREE.Vector2(
          -moonSpeed * Math.sin(localAngleRef.current),
          moonSpeed * Math.cos(localAngleRef.current)
        );

        // Combined initial velocity
        const escapeVelocity = moonLocalVel.add(earthVelocity);

        independentPositionRef.current = worldPos;
        independentVelocityRef.current = escapeVelocity;

        // Move to scene root immediately
        const scene = localRef.current.parent.parent;
        scene.attach(localRef.current);
        setHasEscaped(true);
      }
    }

    const adjustedDelta = delta * simSpeed;

    if (localRef.current) {
      // Calculate new position based on mass ratio
      if (willEscape || hasEscaped) {
        const pos = independentPositionRef.current;
        const vel = independentVelocityRef.current;

        pos.x += vel.x * adjustedDelta;
        pos.z += vel.y * adjustedDelta;

        localRef.current.position.copy(pos);

        const distanceFromOrigin = pos.length();
        if (distanceFromOrigin > scaledValues.orbitalRadius * 3) {
          setExperimentStatus("completed");
          return;
        }
      } else if (Math.abs(massRatio - 2) < 0.1) {
        const { position, angle } = calculateSpiralOrbit({
          meanMotion: scaledValues.meanMotion,
          orbitalRadius: scaledValues.orbitalRadius,
          currentAngle: localAngleRef.current,
          startAngle: startAngleRef.current,
          deltaTime: adjustedDelta
        });

        localRef.current.position.copy(position);
        localAngleRef.current = angle;
      } else if (Math.abs(massRatio - 1.5) < 0.1) {
        const { position, angle } = calculateModifiedKeplerianOrbit({
          meanMotion: scaledValues.meanMotion,
          eccentricity,
          orbitalRadius: scaledValues.orbitalRadius,
          orbitalInclination,
          currentAngle: localAngleRef.current,
          deltaTime: adjustedDelta,
          radiusModifier: 0.7,
          eccentricityModifier: 0.3
        });

        localRef.current.position.copy(position);
        localAngleRef.current = angle;
      } else {
        const { position, angle } = calculateKeplerianOrbit({
          meanMotion: scaledValues.meanMotion,
          eccentricity,
          orbitalRadius: scaledValues.orbitalRadius,
          orbitalInclination,
          currentAngle: localAngleRef.current,
          deltaTime: adjustedDelta
        });

        localRef.current.position.copy(position);
        localAngleRef.current = angle;
      }

      // Check for collision
      const distanceFromCenter = localRef.current.position.length();
      if (distanceFromCenter <= collisionDistance && !willEscape) {
        setHasCollided(true);
        setExperimentStatus("completed");
        if (meshRef.current) {
          meshRef.current.material.color.set('red');
          meshRef.current.material.emissive.set('darkred');
        }
        return;
      }

      // Update position tracking
      const moonPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonPosition(name, { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z });

      if (name === 'Moon') {
        localRef.current.lookAt(new Vector3(0, 0, 0));
      }

      // Get camera position in moon's local space
      const cameraPosition = new THREE.Vector3();
      state.camera.getWorldPosition(cameraPosition);
      localRef.current.parent.worldToLocal(cameraPosition);

      // Update world position for other calculations
      const worldPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonWorldPosition(name, {
        x: worldPosition.x,
        y: worldPosition.y,
        z: worldPosition.z
      });
    }
  });

  const handleClick = e => {
    e.stopPropagation();
    if (isMoonSelected) return;
    toggleDetailsMenu(true);
    setSelectedMoon(moonData);
    switchToMoonCamera(parentName, name);
  };

  return (
    <>
      {activeCamera?.name === name && localRef.current && (
        <SatelliteCamera
          key={name + '-satellite-camera'}
          target={localRef.current}
          targetName={name}
          size={scaledValues.radius}
          bodyType={'moon'}
        />
      )}

      {orbitPaths && (
        experimentType ? (
          <>
            <MotionTrail
              target={localRef}
              color={color}
              width={5}
              opacity={1}
              active={experimentStatus}
              minPoints={100}
              maxPoints={500}
            />

            <group ref={localRef}>
              <mesh
                ref={meshRef}
                key={name + '-textured'}
                rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
              >
                <sphereGeometry args={[scaledValues.radius, (isMoonSelected ? 38 : 24), (isMoonSelected ? 28 : 16)]} />
                <meshStandardMaterial
                  metalness={hasCollided ? 0.8 : 0.5}
                  roughness={hasCollided ? 0.2 : 0.5}
                  map={!hasCollided ? moonTexture : null}
                  color={hasCollided ? 'red' : (!moonTexture ? color : null)}
                  emissive={hasCollided ? 'orangered' : 'black'}
                  emissiveIntensity={hasCollided ? 0.1 : 0}
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
                    style={{
                      color: color,
                      fontSize: isMoonSelected ? '14px' : '12px',
                      cursor: 'pointer',
                    }}
                  >{name}</span>
                </Html>
              )}
            </group>
          </>
        ) : (
          <>
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
                  emissive={hasCollided ? 'darkred' : 'black'}
                />
              </mesh>

              {(displayLabels || isMoonSelected) && (
                <Html
                  position={[0, scaledValues.radius * 1.2, 0]}
                  center
                  zIndexRange={[100, 0]}
                  // occlude={simSpeed < 20000}
                  style={isMoonSelected ? { pointerEvents: 'none' } : {}}
                >
                  <span
                    className="planet-label"
                    onClick={handleClick}
                    style={{
                      color: color,
                      fontSize: isMoonSelected ? '14px' : '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {name}
                  </span>
                </Html>
              )}
            </group>

            <OrbitPath
              origin={[0, 0, 0]}
              radius={scaledValues.orbitalRadius}
              eccentricity={eccentricity}
              orbitalInclination={orbitalInclination}
              color={color}
              name={`${name}-orbit-path`}
              hiRes={true}
              lineWidth={1}
              position={localRef.current?.position}
              arcLength={.9}
            />
          </>
        )
      )}

      {localRef.current && experimentType === 'newton-1' && (
        <GravityVectors
          moonRef={localRef}
          planetPosition={planetRef?.current?.position}
          length={scaledValues.radius * massRatio * 100 / (localRef.current.position.length() || 1)}
        />
      )}
    </>
  );
});

export default MoonExperiments;