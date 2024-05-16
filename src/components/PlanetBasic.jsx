// Planet without surface camera

import React, { useRef, forwardRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Torus } from "@react-three/drei";
import * as THREE from "three";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";
import Moon from "./Moon";
import Labels from "./Labels";
import { moonsData } from "@/data/moonsData";
import { earthAtmosphereShader } from "../shaders/atmosphere";
import Rings from "./Rings";

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
    interestPoints
  } = mergedData;


  const { simSpeed, orbitPaths, toggleDetailsMenu } = useStore();
  const { planetAngles, updatePlanetPosition, selectedPlanet, setSelectedPlanet, displayLabels, setSelectedMoon } = usePlanetStore();
  const { isSurfaceCameraActive, satelliteCamera, toggleSatelliteCamera, setAutoRotate, autoRotate } = useCameraStore();
  const localRef = ref || useRef();
  const localAngleRef = useRef(planetAngles[name] || 0); // Initialize with saved angle or 0
  const cloudsRef = useRef();

  const [texturesLoaded, setTexturesLoaded] = useState(false);
  // calculating scaled values
  const scaledOrbitalRadius = orbitalRadius * (isSurfaceCameraActive ? .0001 : distanceScaleFactor);
  const scaledRadius = radius * sizeScaleFactor;
  // const scaledOrbitalSpeed = orbitalSpeed * simSpeed;
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name; // clicked planet
  const detailLevel = isPlanetSelected ? 64 : 32;

  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });
  const meshRef = useRef();
  const saturnRingRef = useRef();

  // scale planet size based on distance. Also use to toggle textures on/off
  const [scale, setScale] = useState(scaledRadius);
  const textSize = useRef(1);
  const [showTextures, setShowTextures] = useState(false);
  const textureDisplayDistance = 500;
  const [orbitPathOpacity, setOrbitPathOpacity] = useState(1);

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
      const planetInclination = axialTilt * (Math.PI / 180); // Convert to radians
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
        if (localRef.current.rotation.y >= 2 * Math.PI && isPlanetSelected) {
          localRef.current.rotation.y %= 2 * Math.PI; // Reset rotation for next cycle
        }
        if (saturnRingRef.current) { // rotate saturn's rings
          saturnRingRef.current.rotation.y += rotationIncrement;
        }
        if (cloudsRef.current) {
          cloudsRef.current.rotation.y += rotationIncrement * 1.2; // rotate faster than planet
        }
      }

      const distance = localRef.current.position.distanceTo(state.camera.position);
      if (distance / 100 <= scaledRadius) {
        setScale(scaledRadius);
      } else {
        setScale(distance / 100);
      }
      setShowTextures(distance < textureDisplayDistance);

      // Calculate orbit path opacity based on distance
      const maxDistance = scaledRadius * 100;
      const minDistance = scaledRadius * 10;
      const opacity = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));
      setOrbitPathOpacity(opacity);

      if (textSize.current) {
        textSize.current = distance * 0.02;
      }
    }
  });


  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.order = 'YXZ'; // to ensure the tilt is applied around the world Y, then rotation around local Y
      meshRef.current.rotation.y = 0; // Reset initial Y rotation
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(axialTilt); // Apply axial tilt around the new local X after Y rotation reset
    }
  }, [axialTilt, selectedPlanet]);

  useEffect(() => {
    const specificDate = new Date(2023, 0, 1, 1, 45, 30);
    const hourOfDay = specificDate.getHours();
    const minuteOfHour = specificDate.getMinutes();
    const secondOfMinute = specificDate.getSeconds();

    const currentTimeOfDayInSeconds = hourOfDay * 3600 + minuteOfHour * 60 + secondOfMinute;
    const rotationPeriodInSeconds = rotationPeriod * 3600;
    const initialRotationFraction = currentTimeOfDayInSeconds / rotationPeriodInSeconds;
    const initialRotationAngleRadians = initialRotationFraction * 2 * Math.PI;

    if (meshRef.current) {
      meshRef.current.rotation.order = 'YXZ';
      meshRef.current.rotation.y = initialRotationAngleRadians;
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(axialTilt);
    }
  }, [rotationPeriod, axialTilt]);


  // Modify the handleClick to account for dragging
  const handleClick = e => {
    e.stopPropagation();
    if (isDragging) return;

    toggleDetailsMenu(true);

    if (isPlanetSelected) return
    setSelectedPlanet(mergedData);
    setSelectedMoon(null);
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

  const handleDoubleClick = e => {
    e.stopPropagation();
    setAutoRotate(!autoRotate);
  };

  // get moons data
  const moons = moonsData[name] || [];


  return (
    <>
      {isPlanetSelected && localRef.current &&
        <SatelliteCamera target={localRef.current} targetName={name} color={color} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      }

      <group ref={localRef}>
        {/* Invisible mesh for interaction */}
        <mesh
          visible={false}
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onDoubleClick={handleDoubleClick}
        >
          {isPlanetSelected
            ? <sphereGeometry args={[scaledRadius, 16, 16]} />
            : <sphereGeometry args={[scale * 3, 8, 8]} />
          }
        </mesh>

        <mesh
          ref={meshRef}
          key={isPlanetSelected ? name + '-textured' : name + '-basic'}
        >
          <sphereGeometry args={[(isPlanetSelected ? scaledRadius : scale), detailLevel, detailLevel]} />
          {(!isPlanetSelected && texturesLoaded && !showTextures) ?
            <meshBasicMaterial color={color} />
            :
            <>
              <meshStandardMaterial
                metalness={0.6}
                roughness={0.8}
                map={textures?.map}
                onBuild={() => setTexturesLoaded(true)}   // load textures first then swap to basic material. Trick for color issues
              />
              {name === "Earth" &&
                <>
                  <mesh key={`${name}-atmosphere`}>
                    <sphereGeometry args={[scaledRadius * 1.035, detailLevel, detailLevel]} />
                    <shaderMaterial args={[earthAtmosphereShader]} />
                  </mesh>

                  <mesh ref={cloudsRef} key={`${name}-cloud_texture`}>
                    <sphereGeometry args={[scaledRadius * 1.005, detailLevel, detailLevel]} />
                    <meshStandardMaterial alphaMap={textures?.clouds} transparent />
                  </mesh>
                </>}
            </>
          }

        </mesh>


        {/* Saturns rings */}
        {name === "Saturn" && showTextures && (
          <Rings innerRadius={scaledRadius * 1.2} outerRadius={scaledRadius * 2} height={0} rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]} texture={textures?.ringTexture} detail={detailLevel * 2} />
        )}
        {/* Uranus rings */}
        {name === "Uranus" && showTextures && (
          <Rings innerRadius={scaledRadius * 1.5} outerRadius={scaledRadius * 1.9} height={0} texture={textures?.ringTexture} detail={detailLevel * 2} rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]} />
        )}

        {/* Display planet names */}
        {(displayLabels && !isPlanetSelected || isHovered && !isPlanetSelected) && (
          <Labels key={name} text={name} size={textSize?.current} position={[0, scale * 1.2 + textSize?.current, 0]} color={color} handleClick={handleClick} font={'../assets/fonts/Termina_Black.ttf'} />
        )}

        {/* Display planet names */}
        {(displayLabels && isPlanetSelected) && (
          <Html
            as='span'
            wrapperClass='label-wrapper'
            center
            position-y={isPlanetSelected ? scale + scale * 0.25 : scale * 4}
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none' }}
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


        {/* Render moons */}
        {isPlanetSelected && moons.map((moon, index) => {
          const shouldAlignWithTilt = ["Saturn", "Uranus"].includes(name);  // List planets whose moons should align with the axial tilt

          return (
            <group key={`${name}-moon-group-${index}`} rotation={shouldAlignWithTilt ? [THREE.MathUtils.degToRad(axialTilt), 0, 0] : [0, 0, 0]}>
              <Moon
                key={`${name}-moon-${index}`}
                moonData={moon}
                planetPosition={localRef.current?.position}
              />
            </group>
          );
        })}


      </group >
      {orbitPaths && (
        <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} orbitalInclination={orbitalInclination} color={color} name={name} opacity={isPlanetSelected ? orbitPathOpacity : .5} hiRes={isPlanetSelected} />
      )}
    </>
  );
});

export default Planet;
