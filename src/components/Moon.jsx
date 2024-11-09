import React, { useRef, forwardRef, useCallback, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import useExperimentsStore from "@/store/experiments";
import { Html, useTexture } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCameraMoon";
import Labels from "./Labels";
import GravityVectors from "./GravityVectors";

const Moon = forwardRef(({ moonData, planetPosition, parentName, visible }, ref) => {
  const {
    name,
    orbitalRadius,
    radius,
    color,
    orbitalPeriod,
    orbitalInclination,
    eccentricity
  } = moonData;

  const { simSpeed, toggleDetailsMenu } = useStore();
  const {
    selectedMoon,
    moonAngles,
    setSelectedMoon,
    updateMoonPosition,
    updateMoonWorldPosition,
    setSelectedPlanet,
    displayLabels,
    orbitPaths
  } = usePlanetStore();
  const { experimentType } = useExperimentsStore();
  const { satelliteCamera, toggleSatelliteCamera, activeCamera, switchToMoonCamera } = useCameraStore();

  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  const localRef = ref || useRef();
  const localAngleRef = useRef(moonAngles[name] || Math.random() * 2 * Math.PI);
  const scaleRef = useRef(scaledRadius);
  const textSize = useRef(.1);
  const [isHovered, setIsHovered] = useState(false);

  const isMoonSelected = selectedMoon && selectedMoon.name === name;
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/2k_moon.jpg') : null;

  // Calculate mean motion (n)
  const meanMotion = useMemo(() => {
    return (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Convert orbital period to seconds
  }, [orbitalPeriod]);

  useFrame((state, delta) => {
    const adjustedDelta = delta * simSpeed;

    // Update mean anomaly (M)
    localAngleRef.current -= meanMotion * adjustedDelta;

    // Solve Kepler's Equation iteratively
    let E = localAngleRef.current;
    const maxIterations = 10;
    const tolerance = 1e-6;

    // Newton-Raphson iteration to solve Kepler's equation: M = E - e * sin(E)
    for (let i = 0; i < maxIterations; i++) {
      const deltaE = (E - eccentricity * Math.sin(E) - localAngleRef.current) /
        (1 - eccentricity * Math.cos(E));
      E -= deltaE;
      if (Math.abs(deltaE) < tolerance) break;
    }

    // Calculate true anomaly (ν) from eccentric anomaly (E)
    const trueAnomaly = 2 * Math.atan(
      Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
      Math.tan(E / 2)
    );

    // Calculate radius vector (distance from focus)
    const r = (scaledOrbitalRadius * (1 - eccentricity * eccentricity)) /
      (1 + eccentricity * Math.cos(trueAnomaly));

    // Calculate position in orbital plane
    const x = r * Math.cos(-trueAnomaly);
    const baseZ = r * Math.sin(-trueAnomaly);

    if (localRef.current) {
      // Apply inclination
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * baseZ;
      const z = Math.cos(inclination) * baseZ;

      localRef.current.position.set(x, y, z);
      const moonPosition = localRef.current.getWorldPosition(new Vector3());
      updateMoonPosition(name, { x: moonPosition.x, y: moonPosition.y, z: moonPosition.z });

      if (name === 'Moon' && planetPosition) {
        // Point the moon towards the parent planet's position
        const planetPos = new Vector3(...planetPosition);
        localRef.current.lookAt(planetPos);
      }

      // Get camera position in moon's local space
      const cameraPosition = new THREE.Vector3();
      state.camera.getWorldPosition(cameraPosition);
      // Transform camera position to local space of the moon's parent
      localRef.current.parent.worldToLocal(cameraPosition);

      // Get moon's local position
      const moonLocalPosition = localRef.current.position;

      // Calculate distance in local space
      const distance = moonLocalPosition.distanceTo(cameraPosition);

      // Handle scaling based on camera distance
      if (distance / 100 <= scaledRadius) {
        scaleRef.current = scaledRadius;
      } else {
        scaleRef.current = distance / 100;
      }

      // Update text size using local distance
      if (textSize.current) {
        textSize.current = distance * 0.014;
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

  // Add cleanup effect
  useEffect(() => {
    // Cleanup function that runs when component unmounts
    return () => {
      if (localRef.current) {
        // Dispose of geometries
        if (localRef.current.children) {
          localRef.current.children.forEach(child => {
            if (child.geometry) {
              child.geometry.dispose();
            }
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        }
      }

      // Cleanup texture
      if (moonTexture) {
        moonTexture.dispose();
      }

      // Clean up any world positions stored
      updateMoonPosition(name, null);
      updateMoonWorldPosition(name, null);
    };
  }, [name, moonTexture]);

  // Optimize geometry creation
  const moonGeometry = useMemo(() => {
    return new THREE.SphereGeometry(
      scaledRadius,
      (isMoonSelected ? 32 : 14),
      (isMoonSelected ? 16 : 12)
    );
  }, [scaledRadius, isMoonSelected]);

  // Optimize material creation
  const moonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.5,
      map: moonTexture || null,
      color: !moonTexture ? color : null
    });
  }, [moonTexture, color]);

  // Handle visibility change
  useEffect(() => {
    if (localRef.current) {
      localRef.current.visible = visible !== false;
    }
  }, [visible]);

  // Optimize handlers with useCallback
  const handleClick = useCallback(e => {
    e.stopPropagation();
    if (isMoonSelected) return;
    toggleDetailsMenu(true);
    setSelectedMoon(moonData);
    switchToMoonCamera(parentName, name);
  }, [isMoonSelected, moonData, parentName, name]);

  const handlePointerOver = useCallback(e => {
    e.stopPropagation();
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback(e => {
    e.stopPropagation();
    setIsHovered(false);
  }, []);


  return (
    <>
      {activeCamera?.name === name && localRef.current &&
        <SatelliteCamera
          target={localRef.current}
          targetName={name}
          size={scaledRadius}
        />
      }

      <group ref={localRef}>
        <mesh
          key={name + '-textured'}
          rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <primitive object={moonGeometry} />
          <primitive object={moonMaterial} />
        </mesh>

        {!isMoonSelected && (displayLabels || isHovered) && (
          <Labels
            key={name + '-label'}
            text={name}
            size={textSize?.current}
            position={[0, scaleRef.current * 1.15, 0]}
            color={color}
            font={'../assets/fonts/Termina_Heavy.ttf'}
            handleClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
        )}

        {(displayLabels && isMoonSelected) && (
          <Html
            as='span'
            wrapperClass='label-wrapper'
            center
            position-y={scaledRadius * 1.12}
            zIndexRange={[100, 0]}
          >
            <span
              className='planet-label'
              style={{ color }}
              onClick={handleClick}
              // onPointerDown={handlePointerDown}
              // onPointerMove={handlePointerMove}
              // onPointerUp={handlePointerUp}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              {name}
            </span>
          </Html>
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
    </>
  );
});

export default Moon;