"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { CameraControls, useTexture } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import useExperimentsStore from "@/store/experiments";
import { sizeScaleFactor } from "@/data/planetsData";
import { moonSizeScaleFactor } from "@/data/moonsData";
import Sun from "@/components/Sun";
import Planet from "@/components/Planet";
import Stars from "@/components/Stars"
import { useFrame } from "@react-three/fiber";
import AsteroidBelt from "@/components/asteroids/AsteroidBelt";
import * as THREE from "three";

const Scene = () => {
  const { sunSettings, simSpeed, setSimSpeed, prevSpeed, setPrevSpeed, setViewOnlyMode } = useStore();
  const { planetPositions, selectedPlanet, selectedMoon, setSelectedMoon, planetsData, moonsData, moonPositions, resetPlanetsData } = usePlanetStore();
  const { satelliteCamera, isCameraTransitioning, toggleCameraTransitioning, isZoomingToSun, resetCamera, toggleZoomingToSun, activeCamera, setActiveCamera, setSceneCameras, sceneCameras, satelliteCameraState, setSatelliteCameraState } = useCameraStore();
  const { experimentMode, toggleExperimentMode } = useExperimentsStore();

  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(200);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initial camera animation settings
  const initialCameraPosition = [100000, 100000, 100000];
  const defaultCameraPosition = [20000, 20000, 20000];
  const initialTarget = [0, 0, 0];
  const transitioning = useRef(false);


  useEffect(() => {
    if (cameraControlsRef.current && !hasInitialized) {
      // Set initial camera position
      cameraControlsRef.current.setPosition(...initialCameraPosition, false);
      cameraControlsRef.current.setTarget(...initialTarget, false);

      // Animate to default position
      setTimeout(() => {
        cameraControlsRef.current.setPosition(...defaultCameraPosition, true);
        cameraControlsRef.current.setTarget(...initialTarget, true);
        setHasInitialized(true);
      }, 100); // Small delay to ensure camera is ready
    }
  }, [cameraControlsRef.current]);

  // Update the calculateOptimalDistance function to handle moons better
  const calculateOptimalDistance = (radius) => {
    const baseDistance = 4.2;
    return radius * baseDistance;
  };

  const findMoonByName = (moonName, parentPlanetName) => {
    const planetMoons = moonsData[parentPlanetName];
    if (!planetMoons) return null;
    return planetMoons.find(moon => moon.name === moonName);
  };

  // Handle camera adjustments when a planet is selected
  useFrame(() => {
    if (!cameraControlsRef.current) return;

    if (satelliteCameraState?.position && isCameraTransitioning) {
      // console.log("Transitioning to orbit camera with state:", satelliteCameraState);

      const { position, targetPosition } = satelliteCameraState;

      // First set position and target instantly to avoid starting from 0,0,0
      cameraControlsRef.current.setPosition(
        position.x,
        position.y,
        position.z,
        false // disable transition for initial position
      );

      cameraControlsRef.current.setTarget(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        false // disable transition for initial target
      );

      // Force an update
      cameraControlsRef.current.updateCameraUp();
      cameraControlsRef.current.update();

      // Clear the satellite camera state
      setSatelliteCameraState(null);
    }

    if (activeCamera.type === 'planet' && activeCamera.name !== 'Sun') {
      const planetPosition = planetPositions[selectedPlanet.name];

      setSelectedMoon(null);
      if (planetPosition) {
        const scaledRadius = planetsData[selectedPlanet.name].radius * sizeScaleFactor;
        const optimalDistance = calculateOptimalDistance(scaledRadius);
        setMinDistance(optimalDistance / 2);
        cameraControlsRef.current.setTarget(planetPosition.x, planetPosition.y, planetPosition.z, true);
        cameraControlsRef.current.dollyTo(optimalDistance, true);
        toggleZoomingToSun(false);
      }
    }

    if (activeCamera.type === 'moon') {
      const moonPosition = moonPositions[activeCamera.name];
      const moon = findMoonByName(activeCamera.name, activeCamera.parentName);
      if (moonPosition && moon) {
        // Adjust scaling for better moon visibility
        const scaledRadius = moon.radius * moonSizeScaleFactor;
        const optimalDistance = calculateOptimalDistance(scaledRadius);

        // Set a reasonable minimum distance for viewing moons
        setMinDistance(optimalDistance / 2);

        // Update camera target and distance
        cameraControlsRef.current.setTarget(
          moonPosition.x,
          moonPosition.y,
          moonPosition.z,
          true
        );

        // Adjust dollyTo distance for better moon viewing
        cameraControlsRef.current.dollyTo(optimalDistance, true);

        // Track transition completion
        const currentTarget = new THREE.Vector3();
        cameraControlsRef.current.getTarget(currentTarget);
        const distanceToTarget = currentTarget.distanceTo(new THREE.Vector3(moonPosition.x, moonPosition.y, moonPosition.z));

        if (distanceToTarget < 0.1) {
          // toggleZoomingToSun(false);
          toggleCameraTransitioning(false);
        }
      }
    }

    if (activeCamera.name === 'Sun' && transitioning.current) {
      const currentTarget = new THREE.Vector3();
      const currentPosition = new THREE.Vector3();
      cameraControlsRef.current.getTarget(currentTarget);
      cameraControlsRef.current.getPosition(currentPosition);

      const distanceToTarget = currentPosition.distanceTo(new THREE.Vector3(0, 0, 0));
      const targetDistance = 500; // Desired distance for Sun view

      if (Math.abs(distanceToTarget - targetDistance) < 10) {
        transitioning.current = false;
        toggleCameraTransitioning(false);
        // Enable manual control
        cameraControlsRef.current.enabled = true;
      } else {
        cameraControlsRef.current.setTarget(0, 0, 0, true);
        cameraControlsRef.current.dollyTo(targetDistance, true);
      }
    }

    if (activeCamera.name === 'Asteroid Belt' && transitioning.current) {
      const currentPosition = new THREE.Vector3();
      cameraControlsRef.current.getPosition(currentPosition);
      const targetPosition = activeCamera.position;
      const distanceToTarget = currentPosition.distanceTo(
        new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z)
      );

      if (distanceToTarget < 100) {
        transitioning.current = false;
        toggleCameraTransitioning(false);
        // Enable manual control
        cameraControlsRef.current.enabled = true;
      } else {
        cameraControlsRef.current.setPosition(
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          true
        );
        cameraControlsRef.current.setTarget(0, 0, 0, true);
      }
    }

    // Handle orbit camera transition
    if (activeCamera.name === 'default' && isCameraTransitioning) {
      const targetPosition = activeCamera.position;
      const targetLookAt = activeCamera.lookAt;

      // Get current camera position
      const currentPosition = new THREE.Vector3();
      const currentTarget = new THREE.Vector3();
      cameraControlsRef.current.getPosition(currentPosition);
      cameraControlsRef.current.getTarget(currentTarget);
      // Only animate if we're not already at the target
      const distanceToTarget = currentPosition.distanceTo(targetPosition);

      if (distanceToTarget > 100) {
        cameraControlsRef.current.setLookAt(
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          targetLookAt.x,
          targetLookAt.y,
          targetLookAt.z,
          true // enable smooth transition
        );
      }
      toggleCameraTransitioning(false);
      setMinDistance(200);
    }

    // When in orbit mode but not transitioning, allow free movement
    if (activeCamera.type === 'orbit' && !isCameraTransitioning) {
      setMinDistance(200);
      cameraControlsRef.current.maxDistance = 160000
    }
  });

  // Handle camera mode changes
  useEffect(() => {
    if (activeCamera.name === 'Sun' || activeCamera.name === 'Asteroid Belt') {
      transitioning.current = true;
      // Temporarily disable manual control during transition
      cameraControlsRef.current.enabled = false;

      if (activeCamera.name === 'Sun') {
        setMinDistance(200);
        cameraControlsRef.current.maxDistance = 1000;
      } else if (activeCamera.name === 'Asteroid Belt') {
        const beltDistance = 5000;
        setMinDistance(beltDistance * 0.85);
        cameraControlsRef.current.maxDistance = beltDistance * 1.8;
      }
    }

    if ((activeCamera.type === "planet" || activeCamera.type === "moon")) {
      if (simSpeed === 0) return
      toggleCameraTransitioning(true);
      setPrevSpeed(simSpeed);
      setSimSpeed(0);
    }

    cameraControlsRef.current?.camera.updateProjectionMatrix();
  }, [activeCamera]);

  useEffect(() => {
    setViewOnlyMode(true); // disable details menu
    toggleExperimentMode(false);
    resetPlanetsData()
    const handleMouseDown = (event) => {
      if (event.button === 1) {
        event.preventDefault();
      }
      if (cameraControlsRef.current) {
        cameraControlsRef.current.mouseButtons.right = 1;
      }
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);


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
    maxDistance: 120000,
    minDistance: minDistance,
    near: 0.01,
    far: 1500000,
    smoothTime: .6,
    enableDamping: true,
    draggingSmoothTime: 0.25, // Smooth drag movement
    azimuthRotateSpeed: 1,     // Horizontal rotation speed
    polarRotateSpeed: 1,       // Vertical rotation speed
    dollySpeed: .4,
  };

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        makeDefault={!satelliteCamera}
        enabled={!satelliteCamera}
        {...cameraConfig}
        truckSpeed={1}
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

      <AsteroidBelt meshCount={2500} />

      <Sun key={"Sun-plain"} textures={sunTextures} position={sunSettings.position} resetCamera={resetCamera} />

    </>
  );
};

export default Scene;
