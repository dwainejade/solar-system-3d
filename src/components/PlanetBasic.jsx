// Planet without surface camera

import React, { useRef, forwardRef, useState, useEffect, cloneElement } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html, Torus } from "@react-three/drei";
import * as THREE from "three";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import Satellite from "./Satellite";
import Moon from "./Moon";
import { moonsData } from "@/data/moonsData";


// default values
const Planet = forwardRef(({ name = 'Earth', textures }, ref) => {
  const { planetsData } = usePlanetStore()
  const bodyData = planetsData[name];

  const mergedData = { ...bodyData };
  const {
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
    initialOrbitalAngle,
  } = mergedData;


  const { simSpeed, updateRotationCount, incrementDate, orbitPaths } = useStore();
  const { planetAngles, updatePlanetPosition, selectedPlanet, setSelectedPlanet, displayLabels } = usePlanetStore();
  const { isSurfaceCameraActive, satelliteCamera, toggleSatelliteCamera } = useCameraStore();
  const localRef = ref || useRef();
  const localAngleRef = useRef(planetAngles[name] || 0); // Initialize with saved angle or 0

  // calculating scaled values
  // const numberOfRotationsPerOrbit = rotationPeriod ? (orbitalPeriod * 24) / rotationPeriod : 0;
  const scaledOrbitalRadius = orbitalRadius * (isSurfaceCameraActive ? .0001 : distanceScaleFactor);
  const scaledRadius = radius * sizeScaleFactor;
  // const scaledOrbitalSpeed = orbitalSpeed * simSpeed;
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name; // clicked planet
  const detailLevel = isPlanetSelected ? 64 : 32;

  // const [planetRotation, setPlanetRotation] = useState({ x: 0, y: 0, z: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });

  const meshRef = useRef();
  const saturnRingRef = useRef();

  useFrame((state, delta) => {
    // Adjust delta based on simulation speed (simSpeed)
    const adjustedDelta = delta * simSpeed;

    // Update planet's orbital position
    const planetOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // in Earth days

    // Initialize the angle if it's the first frame
    if (localAngleRef.current === 0) {
      localAngleRef.current = initialOrbitalAngle * (Math.PI / 180); // Convert to radians 
    } else {
      localAngleRef.current -= planetOrbitalSpeed * adjustedDelta;
    }
    const x = scaledOrbitalRadius * Math.cos(localAngleRef.current);
    const z = scaledOrbitalRadius * Math.sin(localAngleRef.current);

    if (localRef.current) {
      // Calculate the orbital inclination effect
      const inclination = orbitalInclination * (Math.PI / 180); // Convert to radians 
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
        const yAxis = new THREE.Vector3(0, 1, 0);
        meshRef.current.rotateOnAxis(yAxis, rotationIncrement);

        // Check for a complete rotation
        if (localRef.current.rotation.y >= 2 * Math.PI) {
          localRef.current.rotation.y %= 2 * Math.PI; // Reset rotation for next cycle
          updateRotationCount(name, 1); // Update rotation count in store for the planet
          if (name === "Earth") {
            incrementDate(); // Increment the simulation date by one day
          }
        }
        if (saturnRingRef.current) { // rotate saturns rings
          saturnRingRef.current.rotation.y += rotationIncrement;
        }
      }
    }
  });

  useEffect(() => {
    // Set the axial tilt 
    if (meshRef.current) {
      meshRef.current.rotation.order = 'YXZ'; // ensure the tilt is applied around the world Y, then rotation around local Y
      meshRef.current.rotation.y = 0; // Reset initial Y rotation
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(axialTilt); // Apply axial tilt around the new local X
    }
  }, [axialTilt]);

  // Modify the handleClick to account for dragging
  const handleClick = e => {
    e.stopPropagation();
    if (isDragging) return;
    setSelectedPlanet(mergedData);
  };

  // New handler for pointer down
  const handlePointerDown = e => {
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state
    initialClickPosition.current = { x: e.clientX, y: e.clientY }; // Record initial click position
  };

  const handlePointerMove = e => {
    // Calculate the distance moved
    const distanceMoved = Math.sqrt(
      Math.pow(e.clientX - initialClickPosition.current.x, 2) + Math.pow(e.clientY - initialClickPosition.current.y, 2)
    );
    if (distanceMoved > 5) { // Threshold to consider as a drag
      setIsDragging(true);
    }
  };

  const handlePointerUp = e => {
    setIsDragging(false); // Reset dragging state
  };
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerOver = e => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setIsHovered(true);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    setIsHovered(false);
  };

  // scale planet size based on distance. Also use to toggle textures on/off
  const [scale, setScale] = useState(scaledRadius);
  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    const distance = localRef.current.position.distanceTo(camera.position);
    if (distance / 100 <= scaledRadius) {
      setScale(scaledRadius);
    } else {
      setScale(distance / 100);
    }
  });


  // texture for saturn rings
  const ringTexture = useLoader(THREE.TextureLoader, "../assets/saturn/saturn-rings-alpha.png");
  ringTexture.wrapS = THREE.RepeatWrapping;
  ringTexture.wrapT = THREE.ClampToEdgeWrapping;

  // get moons data
  const moons = moonsData[name] || [];

  return (
    <>
      {isPlanetSelected && localRef.current &&
        <Satellite target={localRef.current} color={color} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      }
      <group ref={localRef}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[scale, detailLevel, detailLevel]} />
          {isPlanetSelected && textures ?
            <meshStandardMaterial
              metalness={0.6}
              roughness={0.8}
              map={textures.map}
            /> :
            <meshBasicMaterial color={color} />
          }

        </mesh>
        {/* Saturns rings */}
        {name === "Saturn" && (
          <group ref={saturnRingRef} rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]} >
            <Torus args={[scaledRadius * 1.7, scaledRadius * 0.5, 2, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} transparent />
            </Torus>
          </group>
        )}

        {/* Display planet names */}
        {displayLabels && (
          <Html
            as='span'
            wrapperClass='label-wrapper'
            center
            occlude
            position-y={scale + scale * 0.25}
            zIndexRange={[100, 0]}
          >
            <span
              className='planet-label'
              style={{ color }}
              onClick={handleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              {name}
            </span>
          </Html>
        )}

        {/* Display planet name on hover */}
        {isHovered && !isPlanetSelected && !displayLabels && (
          <Html position={[0, 100, 0]} style={{ pointerEvents: 'none' }}>
            <div style={{ color: 'white', padding: '6px 10px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px' }}>
              {name}
            </div>
          </Html>
        )}

        {/* Render moons */}
        {isPlanetSelected && moons.map((moon, index) => (
          <Moon key={`${name}-moon-${index}`} moonData={moon} planetPosition={localRef.current?.position} />
        ))}

      </group>
      {orbitPaths && (
        <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} orbitalInclination={orbitalInclination} color={color} name={name} hiRes={isPlanetSelected} />
      )}
    </>
  );
});

export default Planet;
