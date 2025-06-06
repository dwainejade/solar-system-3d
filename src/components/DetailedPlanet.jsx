import React, { useRef, forwardRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import OrbitPath from "./OrbitPath";
import { Html, Torus } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import planetsData, { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import { Vector3 } from "three";
import SurfaceCamera from "./SurfaceCamera";

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
    initialOrbitalAngle,
  } = mergedData;

  const { map, normal, specular } = textures

  const { simSpeed, updateRotationCount, incrementDate, simulationDate } = useStore();
  const { planetAngles, updatePlanetPosition, selectedPlanet, setSelectedPlanet, displayLabels, setSelectedMoon, orbitPaths } = usePlanetStore();
  const { setSurfacePoint, surfacePoint, setSurfaceNormal, surfaceNormal, setCameraSurfacePoint, isSurfaceCameraActive } = useCameraStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(planetAngles[name] || 0); // Initialize with saved angle or 0
  const groupRef = useRef();

  // calculating scaled values
  // const numberOfRotationsPerOrbit = rotationPeriod ? (orbitalPeriod * 24) / rotationPeriod : 0;
  const scaledOrbitalRadius = orbitalRadius * .0001;
  const scaledRadius = radius * .001;
  // const scaledOrbitalSpeed = orbitalSpeed * simSpeed;
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name; // clicked planet

  // const [rotationCount, setRotationCount] = useState(0);
  // const lastRotationRef = useRef(0);
  // const [rotationElapsedTime, setRotationElapsedTime] = useState(0);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [planetRotation, setPlanetRotation] = useState({ x: 0, y: 0, z: 0 });
  // Define state and refs to track dragging
  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });


  const { raycaster, mouse, camera } = useThree();
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Adjust delta based on simulation speed (simSpeed)
    const adjustedDelta = delta * simSpeed;

    // Update planet's orbital position
    const planetOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Assuming orbitalPeriod is in Earth days
    // localAngleRef.current += planetOrbitalSpeed * adjustedDelta;
    // Initialize the angle if it's the first frame
    if (localAngleRef.current === 0) {
      localAngleRef.current = initialOrbitalAngle * (Math.PI / 180); // Convert to radians if initialOrbitalAngle is in degrees
    } else {
      localAngleRef.current -= planetOrbitalSpeed * adjustedDelta;
    }
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

  // Modify the handleClick to account for dragging
  const handleClick = e => {
    e.stopPropagation();
    if (isDragging || isSurfaceCameraActive) return;
    setSelectedMoon(null);
    setSelectedPlanet(mergedData);

    // code to position SurfaceCamera
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshRef.current, true);
    if (intersects.length > 0) {
      let intersectionPoint = intersects[0].point; // This is in world space
      let cameraIntersectionPoint = intersects[0].point; // This is in world space
      // Convert from world to local space relative to the planet
      intersectionPoint = localRef.current.worldToLocal(intersectionPoint.clone());
      setSurfacePoint([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]);
      setCameraSurfacePoint([cameraIntersectionPoint.x, cameraIntersectionPoint.y, cameraIntersectionPoint.z]);
      const normal = new Vector3().subVectors(intersectionPoint, new Vector3()).normalize();
      setSurfaceNormal([normal.x, normal.y, normal.z]);
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

  const detailLevel = isSurfaceCameraActive ? 128 : (isPlanetSelected ? 64 : 32);

  // Calculate points for the axial tilt line
  // const lineLength = scaledRadius * 2; // Make the line extend out of the planet
  // const axialTiltLinePoints = [
  //   [0, -lineLength / 1.8, 0], // Starting point of the line
  //   [0, lineLength / 1.8, 0], // Ending point of the line
  // ];


  return (
    <>
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
          <sphereGeometry args={[scaledRadius, detailLevel, detailLevel]} />
          <meshStandardMaterial
            metalness={.3}
            roughness={.65}
            // bumpMap={textures.normal}
            map={textures.map}
          // normalMap={textures.normal}
          // roughnessMap={textures.specular}
          />
        </mesh>
        {name === "Saturn" && (
          <group>
            <Torus args={[scaledRadius * 2, scaledRadius * 0.15, 2, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color={"#Ffffff"} transparent opacity={0.6} />
            </Torus>
            <Torus args={[scaledRadius * 1.5, scaledRadius * 0.3, 2, 80]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color={"#F4E1C1"} transparent opacity={0.6} />
            </Torus>
          </group>
        )}
        {/* <Line points={axialTiltLinePoints} color={color} /> */}
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
              style={{ backgroundColor: color, opacity: isPlanetSelected ? .2 : .8 }}
              onClick={handleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            />
          </Html>
        )}
        {/* Plane for surface view */}
        {/* {surfacePoint && surfaceNormal && isPlanetSelected && (
          <SurfaceCamera position={surfacePoint} normal={surfaceNormal} planetRef={localRef} color={color} />
        )} */}
      </group>

      {orbitPaths && (
        <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} orbitalInclination={orbitalInclination} color={color} name={name} />
      )}
    </>
  );
});

export default Planet;
