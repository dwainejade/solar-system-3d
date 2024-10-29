"use client";
// experiments
import React, { useRef, useEffect, useState } from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import { sizeScaleFactor } from "@/data/planetsData";
import Sun from "@/components/Sun";
import Planet from "@/components/PlanetBasic";
import Stars from "@/components/Stars";
import { useFrame } from "@react-three/fiber";
import AsteroidBelt from "@/components/AsteroidBelt";
import * as THREE from 'three';

const Scene = () => {
  const { sunSettings, simSpeed, setSimSpeed, prevSpeed, setPrevSpeed } = useStore();
  const { planetPositions, selectedPlanet, setSelectedPlanet, selectedMoon, setSelectedMoon, planetsData } = usePlanetStore();
  const { satelliteCamera, triggerReset, setTriggerReset, isCameraTransitioning, toggleCameraTransitioning, isZoomingToSun, toggleZoomingToSun } = useCameraStore();
  const controlsRef = useRef();
  const [minDistance, setMinDistance] = useState(200);

  // Reference to the moving target (e.g., satellite)
  const target = useRef();

  // Calculate optimal viewing distance based on object size
  const calculateOptimalDistance = (objectRadius) => {
    return objectRadius * 4.2;
  };

  // Smooth camera transition function
  const transitionCamera = (targetPosition, targetLookAt, duration = 2000) => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const startPosition = controls.object.position.clone();
    const startTarget = controls.target.clone();
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Smooth easing function
      const eased = 1 - Math.pow(1 - progress, 3);

      // Interpolate camera position
      controls.object.position.lerpVectors(startPosition, targetPosition, eased);

      // Interpolate target (look-at point)
      controls.target.lerpVectors(startTarget, targetLookAt, eased);

      controls.update();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        toggleCameraTransitioning(false);
        if (selectedPlanet?.name !== "Sun") {
          setSimSpeed(prevSpeed);
        }
      }
    };

    animate();
  };

  // Reset camera to default view
  const resetCamera = () => {
    if (!controlsRef.current) return;

    const defaultPosition = new THREE.Vector3(-2000, 1000, 1000);
    const sunPosition = new THREE.Vector3(
      sunSettings.position.x,
      sunSettings.position.y,
      sunSettings.position.z
    );

    transitionCamera(defaultPosition, sunPosition);
    setSelectedPlanet(null);
    setSelectedMoon(null);
  };

  // Handle camera transitions when selection changes
  useEffect(() => {
    if (!controlsRef.current) return;

    if (selectedPlanet && !selectedMoon && !isCameraTransitioning) {
      const planetPos = planetPositions[selectedPlanet.name];
      if (!planetPos) return;

      toggleCameraTransitioning(true);
      setPrevSpeed(simSpeed);
      setSimSpeed(0);

      const scaledRadius = planetsData[selectedPlanet.name].radius * 10; // Adjust scale factor as needed
      const distance = calculateOptimalDistance(scaledRadius);

      const targetPosition = new THREE.Vector3(
        planetPos.x + distance,
        planetPos.y + distance / 2,
        planetPos.z + distance
      );

      transitionCamera(targetPosition, planetPos);
    }

    if (!selectedPlanet && !selectedMoon) {
      toggleZoomingToSun(false);
      setSimSpeed(prevSpeed);
    }

    if (selectedPlanet?.name === "Sun") {
      toggleZoomingToSun(true);
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed);
        toggleCameraTransitioning(false);
      }
    }
  }, [selectedPlanet, selectedMoon]);

  const earthTextures = useTexture({
    map: "../assets/earth/8k_earth_daymap.jpg",
    clouds: "../assets/earth/8k_earth_clouds.jpg",
  });
  const sunTextures = useTexture({
    map: "../assets/sun/8k_sun.jpg",
  })
  const venusTextures = useTexture({
    map: "../assets/venus/2k_venus_surface.jpg",
  });
  const mercuryTextures = useTexture({
    map: "../assets/mercury/2k_mercury.jpg",
  });
  const marsTextures = useTexture({
    map: "../assets/mars/1k_mars.jpg",
  });
  const jupiterTextures = useTexture({
    map: "../assets/jupiter/8k_jupiter.jpg",
  });
  const saturnTextures = useTexture({
    map: "../assets/saturn/2k_saturn.jpg",
    ringTexture: "../assets/saturn/saturn-rings.png"
  });
  const uranusTextures = useTexture({
    map: "../assets/uranus/2k_uranus.jpg",
    ringTexture: "../assets/uranus/uranus-rings-2.png"
  });
  const neptuneTextures = useTexture({
    map: "../assets/neptune/2k_neptune.jpg",
  });

  // camera settings
  const cameraConfig = {
    maxDistance: 90000,
    enableDamping: false,
    dampingFactor: 0,
    near: 0.1,
    far: 1000000,
    maxZoom: 10,
  };

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        {...cameraConfig}
        minDistance={100}
        maxDistance={90000}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        enablePan={true}
        panSpeed={1}
        rotateSpeed={0.5}
        zoomSpeed={1.2}
        target={[0, 0, 0]}
      />

      <Stars />

      <Planet name="Earth" textures={earthTextures} />
      <Planet name="Mars" textures={marsTextures} />
      <Planet name="Venus" textures={venusTextures} />
      <Planet name="Mercury" textures={mercuryTextures} />
      <Planet name="Jupiter" textures={jupiterTextures} />
      <Planet name="Saturn" textures={saturnTextures} />
      <Planet name="Uranus" textures={uranusTextures} />
      <Planet name="Neptune" textures={neptuneTextures} />

      <AsteroidBelt meshCount={200} pointCount={0} />

      {/* Moving Target (e.g., satellite) */}
      <mesh ref={target} position={[0, 0, 0]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <Sun
        key={"Sun-plain"}
        textures={sunTextures}
        position={sunSettings.position}
        resetCamera={resetCamera}
      />
    </>
  );
};

export default Scene;