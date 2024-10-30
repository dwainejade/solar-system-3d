"use client";
import React, { useRef, useEffect, useState } from "react";
import { CameraControls, useTexture } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import { sizeScaleFactor } from "@/data/planetsData";
import Sun from "@/components/Sun";
import Planet from "@/components/Planet";
import Stars from "@/components/Stars"
import { useFrame } from "@react-three/fiber";
import AsteroidBelt from "@/components/asteroids/AsteroidBelt";
import * as THREE from "three";

const SceneThree = () => {
  const { sunSettings, simSpeed, setSimSpeed, prevSpeed, setPrevSpeed, setViewOnlyMode } = useStore();
  const { planetPositions, selectedPlanet, selectedMoon, setSelectedMoon, planetsData, moonsData, moonPositions } = usePlanetStore();
  const { satelliteCamera, isCameraTransitioning, toggleCameraTransitioning, isZoomingToSun, resetCamera, toggleZoomingToSun, activeCamera } = useCameraStore();
  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(200);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initial camera animation settings
  const initialCameraPosition = [100000, 100000, 100000];
  const defaultCameraPosition = [20000, 20000, 20000];
  const initialTarget = [0, 0, 0];

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
    if (activeCamera.type === 'moon') {
      // Use a larger base distance for moons
      const baseDistance = .5;
      return Math.max(radius * baseDistance, 0.01); //  minimum viewing distance
    }
    // Regular planet distance calculation
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

    if (activeCamera.type === 'planet') {
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
        const scaledRadius = moon.radius * sizeScaleFactor;
        const optimalDistance = calculateOptimalDistance(scaledRadius);

        // Set a reasonable minimum distance for viewing moons
        setMinDistance(scaledRadius * 2);

        // Update camera target and distance
        cameraControlsRef.current.setTarget(
          moonPosition.x,
          moonPosition.y,
          moonPosition.z,
          true
        );

        // Adjust dollyTo distance for better moon viewing
        cameraControlsRef.current.dollyTo(optimalDistance * 4, true);

        // Track transition completion
        const currentTarget = new THREE.Vector3();
        cameraControlsRef.current.getTarget(currentTarget);
        const distanceToTarget = currentTarget.distanceTo(new THREE.Vector3(moonPosition.x, moonPosition.y, moonPosition.z));

        if (distanceToTarget < 0.1) {
          toggleZoomingToSun(false);
          toggleCameraTransitioning(false);
        }
      }
    }

    if (activeCamera.name === 'Sun') {
      setMinDistance(200);
      cameraControlsRef.current.setTarget(0, 0, 0, true);
      if (cameraControlsRef.current.distance < 800) toggleZoomingToSun(false);
      cameraControlsRef.current.dollyTo(200, true);
    }

    if (activeCamera.type === 'custom') {
      // Update camera position
      cameraControlsRef.current.setPosition(activeCamera.position.x, activeCamera.position.y, activeCamera.position.z, true);
      cameraControlsRef.current.setTarget(activeCamera.target.x, activeCamera.target.y, activeCamera.target.z, true);
    }

    // Handle orbit camera transition
    if (activeCamera.type === 'orbit' && activeCamera.name === 'default' && isCameraTransitioning) {
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
    }
  });

  useEffect(() => {
    if (cameraControlsRef.current && !hasInitialized) {
      // Set initial camera position
      cameraControlsRef.current.setPosition(...initialCameraPosition, false);
      cameraControlsRef.current.setTarget(...initialTarget, false);

      // Ensure controls are ready
      cameraControlsRef.current.camera.updateProjectionMatrix();

      // Animate to default position with a slight delay
      setTimeout(() => {
        resetCamera();
        setHasInitialized(true);
      }, 100);
    }
  }, [cameraControlsRef.current]);

  // Update useEffect to handle camera transitions
  useEffect(() => {
    if ((activeCamera.type === "planet" || activeCamera.type === "moon")) {
      toggleCameraTransitioning(true);
      setPrevSpeed(simSpeed);
      setSimSpeed(0);
    }

    if (activeCamera.type === 'orbit' && activeCamera.name === 'default') {
      // toggleCameraTransitioning(true);
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed);
      }
    }

    if (!selectedPlanet && !selectedMoon) {
      toggleZoomingToSun(false);
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed);
      }
    }

    if (activeCamera.name === "Sun") {
      toggleZoomingToSun(true);
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed);
        toggleCameraTransitioning(false);
      }
    }

    cameraControlsRef.current?.camera.updateProjectionMatrix();
  }, [selectedPlanet, selectedMoon, activeCamera]);

  useEffect(() => {
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
    maxDistance: 90000,
    smoothTime: .6,
    enableDamping: true,
    near: 0.01,
    far: 1000000,
  };


  return (
    <>
      {!satelliteCamera && (
        <CameraControls
          ref={cameraControlsRef}
          makeDefault={!satelliteCamera}
          {...cameraConfig}
          minDistance={minDistance}
          autoRotate
        />
      )}

      <Stars />

      <Planet name="Earth" textures={earthTextures} />
      <Planet name="Mars" textures={marsTextures} />
      <Planet name="Venus" textures={venusTextures} />
      <Planet name="Mercury" textures={mercuryTextures} />
      <Planet name="Jupiter" textures={jupiterTextures} />
      <Planet name="Saturn" textures={saturnTextures} />
      <Planet name="Uranus" textures={uranusTextures} />
      <Planet name="Neptune" textures={neptuneTextures} />

      <AsteroidBelt meshCount={500} />

      {/* <Planet bodyData={planetsData.Pluto} /> */}
      <Sun key={"Sun-plain"} textures={sunTextures} position={sunSettings.position} resetCamera={resetCamera} />

    </>
  );
};

export default SceneThree;
