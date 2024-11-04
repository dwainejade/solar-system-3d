import React, { useRef, forwardRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import useExperimentsStore from "@/store/experiments";
import { useTexture } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import { G, distanceScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCameraMoon";
import Labels from "./Labels";
import GravityVectors from "./GravityVectors";

const Moon = forwardRef(({ moonData, planetPosition, parentName }, ref) => {
  const {
    name,
    mass,
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
    orbitPaths
  } = usePlanetStore();
  const { satelliteCamera, activeCamera, switchToMoonCamera } = useCameraStore();
  const { experimentType } = useExperimentsStore();

  const physicsScaleFactor = distanceScaleFactor; // Use the same scale as planets
  const timeScale = 0.0000001; // Adjust for visualization speed

  // Refs and state
  const localRef = ref || useRef();
  const localAngleRef = useRef(moonAngles[name] || Math.random() * 2 * Math.PI);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const [usePhysics, setUsePhysics] = useState(false);
  const [scale, setScale] = useState(radius * moonSizeScaleFactor);
  const [textSize, setTextSize] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Constants
  const planetMass = 5.972e24;
  const moonMass = moonData.mass
  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  // Calculate mean motion
  const meanMotion = useMemo(() => {
    return (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60);
  }, [orbitalPeriod]);

  // States
  const isMoonSelected = selectedMoon && selectedMoon.name === name;
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/2k_moon.jpg') : null;

  useFrame((state, delta) => {
    const adjustedDelta = delta * simSpeed;

    if (!usePhysics) {
      // Original Keplerian orbit calculation
      localAngleRef.current -= meanMotion * adjustedDelta;

      let E = localAngleRef.current;
      const maxIterations = 10;
      const tolerance = 1e-6;

      for (let i = 0; i < maxIterations; i++) {
        const deltaE = (E - eccentricity * Math.sin(E) - localAngleRef.current) /
          (1 - eccentricity * Math.cos(E));
        E -= deltaE;
        if (Math.abs(deltaE) < tolerance) break;
      }

      const trueAnomaly = 2 * Math.atan(
        Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
        Math.tan(E / 2)
      );

      const r = (scaledOrbitalRadius * (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(trueAnomaly));

      const x = r * Math.cos(-trueAnomaly);
      const baseZ = r * Math.sin(-trueAnomaly);

      if (localRef.current) {
        const inclination = orbitalInclination * (Math.PI / 180);
        const y = Math.sin(inclination) * baseZ;
        const z = Math.cos(inclination) * baseZ;

        localRef.current.position.set(x, y, z);

        // Calculate initial velocity for physics mode
        const position = new THREE.Vector3(x, y, z);
        const tangent = position.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();

        // Calculate orbital velocity using vis-viva equation
        const mu = G * planetMass;
        const realRadius = r / moonDistanceScaleFactor;
        const orbitalSpeed = Math.sqrt(mu * (2 / realRadius - 1 / realRadius));

        // Store scaled velocity
        velocityRef.current = tangent.multiplyScalar(orbitalSpeed * moonDistanceScaleFactor);
      }
    } else {
      // Physics-based movement
      if (localRef.current) {
        const currentPos = localRef.current.position;

        // Convert to real distances for force calculation
        const distance = currentPos.length();
        const realDistance = distance / moonDistanceScaleFactor;

        // Calculate gravitational force in real units
        const forceMagnitude = G * planetMass * moonMass / (realDistance * realDistance);
        const forceDirection = currentPos.clone().normalize().multiplyScalar(-1);
        const force = forceDirection.multiplyScalar(forceMagnitude);

        // Calculate acceleration in real units
        const acceleration = force.multiplyScalar(1 / moonMass);

        // Scale for visualization space
        const scaledAcceleration = acceleration.multiplyScalar(moonDistanceScaleFactor);

        // Update velocity using scaled values
        const deltaV = scaledAcceleration.multiplyScalar(delta); // Use raw delta here
        velocityRef.current.add(deltaV);

        // Update position using simulation speed
        const deltaPosition = velocityRef.current.clone().multiplyScalar(adjustedDelta);
        currentPos.add(deltaPosition);
      }
    }

    // Common updates (keep the rest the same)
    if (localRef.current) {
      const moonPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonPosition(name, { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z });

      if (name === 'Moon' && planetPosition) {
        const planetPos = new Vector3(...planetPosition);
        localRef.current.lookAt(planetPos);
      }

      const worldPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonWorldPosition(name, {
        x: worldPosition.x,
        y: worldPosition.y,
        z: worldPosition.z
      });

      const distance = worldPosition.distanceTo(state.camera.position);
      if (distance / 100 <= scaledRadius) {
        setScale(scaledRadius);
      } else {
        setScale(distance / 100);
      }

      if (distance < 4500) {
        setTextSize(0.016 * distance);
      }
    }
  });

  const handleClick = e => {
    e.stopPropagation();
    if (experimentType === 'newton-1' && isMoonSelected) {
      setUsePhysics(!usePhysics);
      return;
    }
    if (isMoonSelected) return;
    toggleDetailsMenu(true);
    setSelectedMoon(moonData);
    switchToMoonCamera(parentName, name);
  };

  return (
    <>
      {activeCamera?.name === name && localRef.current &&
        <SatelliteCamera
          key={name + '-satellite-camera'}
          target={localRef.current}
          targetName={name}
          size={scaledRadius}
          bodyType={'moon'}
        />
      }

      <group ref={localRef}>
        <mesh
          key={name + '-textured'}
          rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setIsHovered(true);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setIsHovered(false);
          }}
          onClick={handleClick}
        >
          <sphereGeometry args={[scaledRadius, (isMoonSelected ? 32 : 14), (isMoonSelected ? 16 : 12)]} />
          <meshStandardMaterial
            metalness={0.5}
            roughness={0.5}
            map={moonTexture || null}
            color={!moonTexture ? color : null}
          />
        </mesh>

        {(displayLabels || (isHovered && !isMoonSelected)) && simSpeed < 200000 && (
          <Labels
            key={name + '-label'}
            text={`${name}${usePhysics ? ' (Gravity Active)' : ''}`}
            size={textSize}
            position={[0, scale * 1.5, 0]}
            color={color}
            font={'../assets/fonts/Termina_Heavy.ttf'}
            handleClick={handleClick}
          />
        )}
      </group>

      {orbitPaths && (
        <OrbitPath
          origin={[0, 0, 0]}
          radius={scaledOrbitalRadius}
          eccentricity={eccentricity}
          orbitalInclination={orbitalInclination}
          color={color}
          name={name + "-orbit-path"}
          hiRes={isMoonSelected}
          lineType={'solid'}
          lineWidth={isMoonSelected ? 1 : .4}
        />
      )}

      {isMoonSelected && usePhysics && (
        <GravityVectors
          position={localRef.current?.position}
          velocity={velocityRef.current}
          planetPosition={new Vector3(0, 0, 0)}
        />
      )}
    </>
  );
});

export default Moon;