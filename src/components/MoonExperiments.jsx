import React, { useRef, useState, useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import useExperimentsStore from "@/store/experiments";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import initialPlanetsData from "../data/planetsData";
import SatelliteCamera from "./SatelliteCameraMoon";
import OrbitPath from "./OrbitPath";
import GravityVectors from "./GravityVectors";
import MotionTrail from "../helpers/MotionTrail";
import Labels from "./Labels";
import { calculateKeplerianOrbit, calculateModifiedKeplerianOrbit, calculateSpiralOrbit, calculateEscapeTrajectory } from "../helpers/calculateOrbits";

const MoonExperiments = ({ moonData, planetRef, parentName, scaledPlanetRadius }) => {
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
    setSelectedMoon,
    updateMoonPosition,
    updateMoonWorldPosition,
    displayLabels,
    orbitPaths,
    planetsData: newPlanetsData
  } = usePlanetStore();
  const { activeCamera, switchToMoonCamera } = useCameraStore();
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
  const localRef = useRef();
  const startAngleRef = useRef(0);
  const localAngleRef = useRef(0);
  const localPositionRef = useRef(new Vector3(scaledValues.orbitalRadius, 0, 0));
  const velocityRef = useRef(null);
  const escapeInitializedRef = useRef(false);

  // States
  const [hasCollided, setHasCollided] = useState(false);
  const [hasEscaped, setHasEscaped] = useState(false);
  const isMoonSelected = selectedMoon && selectedMoon.name === name;
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/moon.jpg') : null;

  // Reset position when experiment status changes
  useEffect(() => {
    if ((experimentStatus !== 'completed' || !experimentStatus) && localRef.current) {
      // Reset all refs and state
      localRef.current.position.set(scaledValues.orbitalRadius, 0, 0);
      localPositionRef.current.set(scaledValues.orbitalRadius, 0, 0);
      startAngleRef.current = 0;
      localAngleRef.current = 0;
      velocityRef.current = null;
      escapeInitializedRef.current = false;
      setHasCollided(false);
      setHasEscaped(false);

      // Update position tracking
      const moonPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonPosition(name, { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z });
    }
  }, [experimentStatus, scaledValues.orbitalRadius, name]);

  useFrame((state, delta) => {
    if (hasCollided || experimentStatus === "completed") return;

    // Before experiment starts, maintain initial position
    if (experimentStatus !== "started") {
      if (localRef.current) {
        const moonPosition = localRef.current.getWorldPosition(new Vector3());
        updateMoonPosition(name, { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z });
      }
      return;
    }

    const willEscape = massRatio <= 0.5;
    const adjustedDelta = delta * simSpeed;

    if (localRef.current) {
      if (willEscape) {
        // Initialize escape state if not already done
        if (!escapeInitializedRef.current) {
          localPositionRef.current.copy(localRef.current.position);
          velocityRef.current = new Vector3(
            -localRef.current.position.y,
            localRef.current.position.x,
            0
          ).normalize().multiplyScalar(scaledValues.meanMotion * scaledValues.orbitalRadius);
          escapeInitializedRef.current = true;
          setHasEscaped(true);
        }

        const { position, velocity } = calculateEscapeTrajectory({
          meanMotion: scaledValues.meanMotion,
          orbitalRadius: scaledValues.orbitalRadius,
          currentAngle: localAngleRef.current,
          deltaTime: adjustedDelta,
          initialVelocity: velocityRef.current,
          position: localPositionRef.current
        });

        localPositionRef.current.copy(position);
        velocityRef.current = velocity;
        localRef.current.position.copy(position);

        const distanceFromOrigin = position.length();
        if (distanceFromOrigin > scaledValues.orbitalRadius * 6) {
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
        return;
      }

      // Update position tracking
      const moonPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonPosition(name, { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z });

      if (name === 'Moon') {
        localRef.current.lookAt(new Vector3(0, 0, 0));
      }

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

  const getMinPoints = () => {
    switch (massRatio) {
      case .5:
        return 500;
      case 1:
        return 200;
      case 2:
      default:
        return 100;
    }
  };

  const getMaxPoints = () => {
    switch (massRatio) {
      case .5:
        return 750;
      case 1:
        return 350;
      case 2:
      default:
        return 150;
    }
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

      {experimentType === 'newton-1'
        ? <MotionTrail
          key={experimentStatus ? 'moon-trail-active' : 'moon-trail'}
          target={localRef}
          color={color}
          width={2}
          active={experimentStatus && orbitPaths}
          minPoints={getMinPoints()}
          maxPoints={getMaxPoints()}
          pause={experimentStatus === 'completed'}
        />
        : <OrbitPath
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
      }

      <group ref={localRef}>
        <mesh
          key={'moon-mesh' + hasCollided + experimentStatus}
          rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
        >
          <sphereGeometry args={[scaledValues.radius, (isMoonSelected ? 38 : 24), (isMoonSelected ? 28 : 16)]} />
          <meshBasicMaterial
            metalness={hasCollided ? 0.8 : 0.5}
            roughness={hasCollided ? 0.2 : 0.5}
            map={!hasCollided ? moonTexture : null}
            color={hasCollided ? 'red' : (!moonTexture ? color : null)}
          />
        </mesh>

        {displayLabels && (
          <Labels
            text={name}
            size={16}
            position={[0, scaledValues.radius * 1.2, 0]}
            color={color}
          />
        )}
      </group>

      {localRef.current && experimentType === 'newton-1' && (
        <GravityVectors
          moonRef={localRef}
          planetRef={planetRef}
          length={scaledValues.radius * massRatio * 100 / (localRef.current.position.length() || 1)}
        />
      )}
    </>
  );
};

export default MoonExperiments;