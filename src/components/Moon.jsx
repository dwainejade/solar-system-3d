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
  const { selectedPlanet, selectedMoon, setSelectedMoon, setSelectedPlanet, displayLabels } = usePlanetStore();
  const { satelliteCamera, toggleSatelliteCamera } = useCameraStore()

  const localRef = ref || useRef();
  const localAngleRef = useRef(0);
  // const [moonPosition, setMoonPosition] = useState({ x: 0, y: 0, z: 0 });
  // load textures here
  // an object to store the moon's textures
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

      // Point the moon towards the Earth: Earth is assumed to be at the origin (0,0,0)
      localRef.current.lookAt(new Vector3(0, 0, 0));

      // setMoonPosition({ x: moonX, y: moonY, z: moonZ });
    }
  });




  // useEffect(() => {
  //   if (localRef.current) {
  //     // Calculate the initial direction vector pointing from the moon to the parent planet
  //     const initialDirectionToParent = new Vector3().subVectors(new Vector3(0, 0, 0));
  //     const initialAngleToParent = Math.atan2(initialDirectionToParent.z, initialDirectionToParent.x);

  //     // Set the initial rotation of the moon mesh to face away from the parent planet
  //     localRef.current.rotation.y = initialAngleToParent - Math.PI / 2; // Adjust as needed
  //   }
  // }, []);


  const handleClick = e => {
    e.stopPropagation();
    if (selectedMoon && selectedMoon.name === name) return

    // setSelectedPlanet(null);
    // setSelectedMoon(moonData);
  };

  // const [scale, setScale] = useState(scaledRadius);
  // useFrame(({ camera }) => {
  //   if (!localRef.current) return;

  //   const distance = localRef.current.position.distanceTo(camera.position);
  //   let newScale;

  //   if (distance > 20000) {
  //     // Scale down the moon as the camera gets closer but no smaller than scaledRadius
  //     newScale = Math.max(scaledRadius, (distance / 1000) * scaledRadius);
  //   } else {
  //     // When the distance is greater than 50 units, just use the scaledRadius
  //     newScale = scaledRadius;
  //   }

  //   setScale(newScale);
  //   if (name === 'Moon') {
  //     console.log({ newScale, scaledRadius })
  //   }
  // });

  // if planet not selected then moon will not be visible
  // if (!selectedPlanet || selectedPlanet.name !== moonData) {
  //   return null;
  // }

  const [isHovered, setIsHovered] = useState(false);
  const handlePointerOver = e => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return (
    <>
      {isMoonSelected && localRef.current &&
        <SatelliteCamera target={localRef.current} color={color} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      }
      <group ref={localRef}>

        {/* Invisible mesh for interaction */}
        <mesh
          visible={false}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
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
            position-y={scaledRadius * 2.5}
            // fix for top down view. maybe move + y and + z
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <span
              className='planet-label'
              style={{ color }}
              onClick={handleClick}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
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
          />
        </group>
      )}
    </>

  );
});

export default Moon;
