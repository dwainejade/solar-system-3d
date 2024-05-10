import React, { useRef, forwardRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { useTexture, Html } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";

const Moon = forwardRef(({ moonData }, ref) => {
  const { simSpeed, orbitPaths } = useStore();
  const { selectedPlanet, selectedMoon, setSelectedMoon, updateMoonPosition, setSelectedPlanet, displayLabels } = usePlanetStore();
  const { satelliteCamera, toggleSatelliteCamera } = useCameraStore()

  const localRef = ref || useRef();
  const localAngleRef = useRef(0);

  const moonTextures = useTexture({
    Moon: '../assets/earth/moon/2k_moon.jpg'
  })

  const { name, orbitalRadius, radius, color, orbitalPeriod, orbitalInclination } = moonData;
  const isMoonSelected = selectedMoon && selectedMoon.name === name; // clicked planet

  // Apply moon-specific scaling factors
  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;
  // console.log(name, scaledRadius)
  // Calculate the moon's orbital speed
  const orbitalSpeed = useMemo(() => {
    return (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Orbital period in Earth days
  }, [orbitalPeriod]);

  useEffect(() => {
    localAngleRef.current = Math.random() * 2 * Math.PI; // Random angle between 0 and 2π
  }, []);

  useFrame((state, delta) => {
    // Update the angle based on the simulation speed
    localAngleRef.current -= orbitalSpeed * simSpeed * delta;

    // Calculate moon's position relative to its parent planet
    const angle = localAngleRef.current;
    const moonX = Math.cos(angle) * scaledOrbitalRadius;
    const moonZ = Math.sin(angle) * scaledOrbitalRadius;
    const inclination = orbitalInclination * (Math.PI / 180);
    const moonY = Math.sin(angle) * Math.sin(inclination) * scaledOrbitalRadius;

    // Update the moon's position
    if (localRef.current) {
      localRef.current.position.set(moonX, moonY, moonZ);
      updateMoonPosition(name, { moonX, moonY, moonZ });
      // Point the moon towards the Earth: Earth is assumed to be at the origin (0,0,0)
      localRef.current.lookAt(new Vector3(0, 0, 0));
    }
  });


  const handleClick = e => {
    e.stopPropagation();
    if (selectedMoon && selectedMoon.name === name) return

    setSelectedPlanet(null);
    setSelectedMoon(moonData);
  };

  const [isHovered, setIsHovered] = useState(false);
  const handlePointerOver = e => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setIsHovered(true);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <>
      {isMoonSelected && localRef.current &&
        <SatelliteCamera target={localRef.current} targetName={name} color={color} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      }

      <group ref={localRef}>

        {/* Invisible mesh for interaction */}
        <mesh
          visible={false}
          // onClick={handleClick}
          // onPointerOver={handlePointerOver}
          // onPointerOut={handlePointerOut}
          position={localRef.current?.position || null}
        >
          {isMoonSelected
            ? <sphereGeometry args={[scaledRadius, 16, 16]} />
            : <sphereGeometry args={[scaledRadius * 2, 8, 8]} />}
          <meshBasicMaterial color={color} wireframe />
        </mesh>


        <mesh >
          <sphereGeometry args={[scaledRadius, 32, 16]} />
          <meshStandardMaterial metalness={0.9} roughness={0.65} map={moonTextures[name] || null} zIndexRange={[100 - 1]} />
        </mesh>

        {(displayLabels || isHovered && !isMoonSelected) && simSpeed < 200000 && (
          <Html
            as='span'
            wrapperClass='label-wrapper'
            center
            occlude
            position-y={scaledRadius * 5}
            // fix for top down view. maybe move + y and + z
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <span
              className='planet-label'
              style={{ color }}
            // onClick={handleClick}
            // onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            >
              {name}
            </span>
          </Html>
        )}

      </group>
      {orbitPaths && (
        <group position={[0, 0, 0]} >
          <OrbitPath
            origin={[0, 0, 0]}
            radius={scaledOrbitalRadius}
            orbitalInclination={orbitalInclination}
            color={color}
            name={name + "-orbit-path"}
            hiRes={isMoonSelected}
            lineType={'solid'}
            opacity={.3}
          />
        </group>
      )}
    </>

  );
});

export default Moon;
