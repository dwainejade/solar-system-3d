import React, { useRef, forwardRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { useTexture } from "@react-three/drei";
import { Vector3 } from "three";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";
import Labels from "./Labels";

const Moon = forwardRef(({ moonData, planetPosition }, ref) => {
  const { name, orbitalRadius, radius, color, orbitalPeriod, orbitalInclination } = moonData;
  const { simSpeed, toggleDetailsMenu } = useStore();
  const { selectedMoon, moonAngles, setSelectedMoon, updateMoonPosition, updateMoonWorldPosition, setSelectedPlanet, displayLabels, orbitPaths } = usePlanetStore();
  const { satelliteCamera, toggleSatelliteCamera } = useCameraStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(moonAngles[name] || Math.random() * 2 * Math.PI);

  const isMoonSelected = selectedMoon && selectedMoon.name === name;

  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/2k_moon.jpg') : null;

  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  const orbitalSpeed = useMemo(() => {
    return (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60); // Orbital period in Earth days
  }, [orbitalPeriod]);


  useFrame((state, delta) => {
    localAngleRef.current -= orbitalSpeed * simSpeed * delta;

    const angle = localAngleRef.current;
    const moonX = Math.cos(angle) * scaledOrbitalRadius;
    const moonZ = Math.sin(angle) * scaledOrbitalRadius;
    const inclination = orbitalInclination * (Math.PI / 180);
    const moonY = Math.sin(angle) * Math.sin(inclination) * scaledOrbitalRadius;

    if (localRef.current) {
      localRef.current.position.set(moonX, moonY, moonZ);
      updateMoonPosition(name, { x: moonX, y: moonY, z: moonZ });
      if (name === 'Moon' && planetPosition) {
        // Point the moon towards the parent planet's position
        const planetPos = new Vector3(...planetPosition);
        localRef.current.lookAt(planetPos);
      }
      // Log position to debug
      // console.log(`Moon ${name} position:`, localRef.current.position);
    } else {
      console.error(`Local ref is not set for moon ${name}`);
    }
  });

  const handleClick = e => {
    e.stopPropagation();
    // toggleDetailsMenu(false);

    // if (isMoonSelected) return;
    // setSelectedMoon(moonData);
  };

  const [isHovered, setIsHovered] = useState(false);
  const handlePointerOver = e => {
    e.stopPropagation();
    setIsHovered(true);
    // document.body.style.cursor = "pointer";
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    setIsHovered(false);
    // document.body.style.cursor = "auto";
  };

  const [scale, setScale] = useState(scaledRadius);
  const [textSize, setTextSize] = useState(1);
  useFrame(({ camera }) => {
    if (!localRef.current) return;

    const worldPosition = localRef.current.getWorldPosition(new Vector3());
    const distance = worldPosition.distanceTo(camera.position);
    updateMoonWorldPosition(name, { x: worldPosition.x, y: worldPosition.y, z: worldPosition.z });
    if (distance / 100 <= scaledRadius) {
      setScale(scaledRadius);
    } else {
      setScale(distance / 100);
    }

    const textSizeFactor = 0.016;
    setTextSize(textSizeFactor * distance);
  });

  // convert localRef.current.position to world position
  // const worldPosition = localRef.current?.getWorldPosition(new Vector3());
  // const newTarget = { position: worldPosition };

  return (
    <>
      {/* {isMoonSelected && localRef.current &&
        <SatelliteCamera target={localRef.current} targetName={name} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      } */}

      <group ref={localRef}>
        {/* Invisible mesh for interaction */}
        <mesh
          visible={false}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <sphereGeometry args={[(Math.max(scaledRadius, scale)) * 2, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>

        <mesh key={name + '-textured'} rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}>
          <sphereGeometry args={[scaledRadius, 32, 16]} />
          <meshStandardMaterial metalness={0.9} roughness={0.65} map={moonTexture || null} color={!moonTexture ? color : null} />
        </mesh>

        {(displayLabels || isHovered && !isMoonSelected) && simSpeed < 200000 && (
          <Labels key={name + '-label'} text={name} size={textSize} position={[0, scale * 1.5, 0]} color={color} font={'../assets/fonts/Termina_Heavy.ttf'} />
        )}
      </group>

      {orbitPaths && (
        <group position={[0, 0, 0]}>
          <OrbitPath
            origin={[0, 0, 0]}
            radius={scaledOrbitalRadius}
            orbitalInclination={orbitalInclination}
            color={color}
            name={name + "-orbit-path"}
            hiRes={isMoonSelected}
            lineType={'solid'}
            opacity={0.5}
          />
        </group>
      )}
    </>
  );
});

export default Moon;
