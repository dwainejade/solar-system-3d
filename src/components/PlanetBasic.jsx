// Planet without surface camera

import React, { useRef, forwardRef, useState, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Html, Torus, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import useFollowCam from "../hooks/useFollowCam";
import Satellite from "./Satellite";

// extend({ OrbitControls });

// default values
const Planet = forwardRef(({ name = 'Earth', textures }, ref) => {
  const { planetsData } = usePlanetStore()
  const bodyData = planetsData[name];

  const { camera, gl } = useThree();
  const planetCameraRef = useRef();
  const controlsRef = useRef();

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

  const { simSpeed, updateRotationCount, incrementDate, simulationDate, orbitPaths } = useStore();
  const { planetAngles, updatePlanetPosition, selectedPlanet, setSelectedPlanet, displayLabels, planetPositions } = usePlanetStore();
  const { setSurfacePoint, surfacePoint, isSurfaceCameraActive, satelliteCamera, toggleSatelliteCamera } = useCameraStore();
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

  const [planetRotation, setPlanetRotation] = useState({ x: 0, y: 0, z: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });

  const meshRef = useRef();

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
        localRef.current.rotation.y += rotationIncrement;
        setPlanetRotation({
          x: localRef.current.rotation.x,
          y: localRef.current.rotation.y,
          z: localRef.current.rotation.z,
        });
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

  const [showTextures, setShowTextures] = useState(false);
  const textureDisplayDistance = 8000; // Set the distance threshold for showing textures
  useFrame(({ camera }) => {
    if (localRef.current) {
      const distance = camera.position.distanceTo(localRef.current.position);
      setShowTextures(distance < textureDisplayDistance);
    }
  });

  // useFollowCam(isPlanetSelected ? localRef : null, camera, { x: 0, y: 0, z: 20 });  // Pass the camera to the hook
  // ************************ NEW CAMERA CODE HERE *************************************************************************************************************************
  // const [firstRender, setFirstRender] = useState(false);
  // useFrame(() => {
  //   // Setup and position the camera when the planet is selected
  //   if (isPlanetSelected) {
  //     // useFollowCam(localRef, { x: 0, y: 0, z: orbitalRadius * 1.5 });
  //   }
  // });

  useFrame(() => {
    if (isPlanetSelected && planetCameraRef.current) {
      planetCameraRef.current.target.set(localRef.current.position.x, localRef.current.position.y, localRef.current.position.z);
    }
  });
  // ************************ NEW CAMERA CODE HERE************************************************************************************************************************


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
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
  };

  const detailLevel = isPlanetSelected ? 64 : 32;


  return (
    <>
      {/* <FakeCamera target={localRef.current} satelliteCamera={satelliteCamera} size={scaledRadius} /> */}
      {isPlanetSelected && localRef.current &&
        <Satellite target={localRef.current} color={color} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      }

      <group ref={localRef}>
        {/* place a camera here that follows the planet and can be controlled */}
        {/* {isPlanetSelected && (
          <OrbitControls
            ref={planetCameraRef}
            args={[camera, gl.domElement]} // Attach the default camera and DOM element
            enableZoom={true}
            enableRotate={true}
            enablePan={false}
            target={localRef.current.position}
            maxDistance={scaledRadius * 6}
            minDistance={scaledRadius * 2.5}
            enableDamping={true}
            dampingFactor={0.1}
          />
        )} */}

        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[scaledRadius, detailLevel, detailLevel]} />
          {textures ? (
            <meshStandardMaterial metalness={0.3} roughness={0.65} map={textures.map} />
          ) : (
            <meshStandardMaterial color={color} />
          )}
        </mesh>
        {name === "Saturn" && (
          <group>
            <Torus args={[scaledRadius * 2, scaledRadius * 0.15, 2, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color={"#Ffffff"} transparent opacity={0.25} />
            </Torus>
            <Torus args={[scaledRadius * 1.5, scaledRadius * 0.3, 2, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color={"#F4E1C1"} transparent opacity={0.25} />
            </Torus>
          </group>
        )}

        {/* Display planet names */}
        {displayLabels ? (
          <Html
            as='span'
            wrapperClass='label-wrapper'
            center
            occlude
            position-y={scaledRadius + scaledRadius * 0.25}
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
        ) : (
          <Html as='div' center zIndexRange={[100, 0]}>
            <div
              className='planet-point'
              style={{ backgroundColor: color }}
              onClick={handleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            />
          </Html>
        )}

      </group>
      {orbitPaths && (
        <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} orbitalInclination={orbitalInclination} color={color} name={name} />
      )}
    </>
  );
});

export default Planet;
