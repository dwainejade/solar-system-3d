"use client";
import React, { useRef, useEffect, useState } from "react";
import { CameraControls, useTexture } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import useExperimentsStore from "@/store/experiments";
import { sizeScaleFactor, distanceScaleFactor } from "@/data/planetsData";
import Sun from "@/components/Sun";
import Planet from "@/components/PlanetExperiments";
import Stars from "@/components/Stars"
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Scene = () => {
  const { sunSettings, simSpeed, setSimSpeed, prevSpeed, setPrevSpeed } = useStore();
  const { planetPositions, selectedPlanet, selectedMoon, setSelectedMoon, planetsData, moonsData, moonPositions } = usePlanetStore();
  const { satelliteCamera, isCameraTransitioning, toggleCameraTransitioning, isZoomingToSun, resetCamera, toggleZoomingToSun, activeCamera, switchToCustomCamera, satelliteCameraState, setSatelliteCameraState } = useCameraStore();
  const { experimentPlanet, experimentType, } = useExperimentsStore();

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
          // toggleZoomingToSun(false);
          toggleCameraTransitioning(false);
        }
      }
    }

    if (activeCamera.name === 'Sun' && activeCamera.type === 'planet') {
      setMinDistance(200);
      cameraControlsRef.current.setTarget(0, 0, 0, true);
      cameraControlsRef.current.maxDistance = 1000
      toggleCameraTransitioning(false);
      if (cameraControlsRef.current.distance > 300 && isZoomingToSun) {
        cameraControlsRef.current.dollyTo(200, true);
      } else {
        toggleZoomingToSun(false);
      }
    }

    if (activeCamera.name === 'Asteroid Belt') {
      const beltDistance = 5000; // Fixed viewing distance

      // if (isCameraTransitioning) {
      // Ensure activeCamera.position is a valid Vector3 or has x,y,z coordinates
      const targetPosition = activeCamera.position;
      if (targetPosition && typeof targetPosition.x === 'number') {
        cameraControlsRef.current.setPosition(
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          true
        );
        cameraControlsRef.current.setTarget(0, 0, 0, true);

        // Set constraints
        setMinDistance(beltDistance * 0.85);
        cameraControlsRef.current.maxDistance = beltDistance * 1.8;

        // Check transition completion
        const currentPosition = new THREE.Vector3();
        cameraControlsRef.current.getPosition(currentPosition);

        if (currentPosition.distanceTo(new THREE.Vector3(
          targetPosition.x,
          targetPosition.y,
          targetPosition.z
        )) < 100) {
          toggleCameraTransitioning(false);
        }
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

    if (activeCamera.name === 'kepler' && experimentPlanet && isCameraTransitioning) {
      const planet = planetsData[experimentPlanet];
      const orbitalRadius = planet.orbitalRadius * distanceScaleFactor;
      const eccentricity = planet.eccentricity;
      const centerOffset = orbitalRadius / 2 * eccentricity;
      let zoomMultiplier = 5;

      if (experimentType === 'kepler-3') {
        zoomMultiplier = 25;
      }

      // Position camera above the orbit's center
      cameraControlsRef.current.setPosition(
        centerOffset,
        orbitalRadius * zoomMultiplier,
        0,
        true
      );

      cameraControlsRef.current.setTarget(
        centerOffset,
        0,
        0,
        true
      );
      // Remove zoom constraints
      setMinDistance(orbitalRadius);
      cameraControlsRef.current.maxDistance = 2000000;

      // End the transition
      toggleCameraTransitioning(false);
    }

    // Handle 'newton' camera
    if (activeCamera.name === 'newton') {
      const planetPosition = planetPositions['Earth'] || { x: 1471.0167999983175, y: 0, z: 0 };
      // Always set target to Earth's position
      cameraControlsRef.current.setTarget(
        planetPosition.x,
        planetPosition.y,
        planetPosition.z,
        true
      );

      // Set initial camera position only when transitioning
      if (isCameraTransitioning) {
        const viewDistance = 90;
        cameraControlsRef.current.setPosition(
          planetPosition.x,
          viewDistance,
          planetPosition.z + viewDistance - 1.5,
          true
        );
        toggleCameraTransitioning(false);
      }

      // Set zoom constraints
      setMinDistance(5);
      cameraControlsRef.current.maxDistance = 200;
    }
  });

  useEffect(() => {
    if (activeCamera.name === 'newton') {
      console.log('Newton camera activated, setting transition');
      toggleCameraTransitioning(true);
    }
  }, [activeCamera.name]);

  // console.log({ isCameraTransitioning })
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
    // console.log(cameraControlsRef.current.position)
  }, [cameraControlsRef.current]);

  // Update useEffect to handle camera transitions
  useEffect(() => {
    if (activeCamera.name !== 'Sun') {
      // toggleZoomingToSun(false);
    }

    if ((activeCamera.type === "planet" || activeCamera.type === "moon")) {
      console.log('Transitioning camera')
      toggleCameraTransitioning(true);
      setPrevSpeed(simSpeed);
      setSimSpeed(0);
    }

    if (activeCamera.type === 'orbit' && activeCamera.name === 'default') {
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed);
      }
    }

    if (!selectedPlanet && !selectedMoon) {
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed);
      }
    }

    if (activeCamera.name === "Sun") {
      toggleZoomingToSun(true);
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed);
        // toggleCameraTransitioning(false);
      }
    }

    cameraControlsRef.current?.camera.updateProjectionMatrix();
  }, [selectedPlanet, selectedMoon, activeCamera]);

  useEffect(() => {
    if (!experimentType) return;
    if (experimentType.includes('kepler')) {
      switchToCustomCamera('kepler', planetsData[experimentPlanet]);
    } else if (experimentType === 'newton-1') {
      switchToCustomCamera('newton', planetsData['Earth']);
    }
  }, [experimentType, experimentPlanet]);

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
    map: "../assets/earth/earth_daymap.jpg",
    clouds: "../assets/earth/earth_clouds.jpg",
  });
  const sunTextures = useTexture({
    map: "../assets/sun/sun.jpg",
  })
  const venusTextures = useTexture({
    map: "../assets/venus/venus_surface.jpg",
  });
  const mercuryTextures = useTexture({
    map: "../assets/mercury/mercury.jpg",
  });
  const marsTextures = useTexture({
    map: "../assets/mars/mars.jpg",
  });
  const jupiterTextures = useTexture({
    map: "../assets/jupiter/jupiter.jpg",
  });
  const saturnTextures = useTexture({
    map: "../assets/saturn/saturn.jpg",
    ringTexture: "../assets/saturn/saturn-rings.png",
  });
  const uranusTextures = useTexture({
    map: "../assets/uranus/uranus.jpg",
    ringTexture: "../assets/uranus/uranus-rings.png",
  });
  const neptuneTextures = useTexture({
    map: "../assets/neptune/neptune.jpg",
  });


  const renderPlanet = () => {
    switch (experimentPlanet) {
      case 'Mars':
        return <Planet key={experimentPlanet} name="Mars" textures={marsTextures} />
      case 'Venus':
        return <Planet key={experimentPlanet} name="Venus" textures={venusTextures} />
      case 'Mercury':
        return <Planet key={experimentPlanet} name="Mercury" textures={mercuryTextures} />
      case 'Jupiter':
        return <Planet key={experimentPlanet} name="Jupiter" textures={jupiterTextures} />
      case 'Saturn':
        return <Planet key={experimentPlanet} name="Saturn" textures={saturnTextures} />
      case 'Uranus':
        return <Planet key={experimentPlanet} name="Uranus" textures={uranusTextures} />
      case 'Neptune':
        return <Planet key={experimentPlanet} name="Neptune" textures={neptuneTextures} />
      case 'Earth':
      default:
        return <Planet key={experimentPlanet} name="Earth" textures={earthTextures} />
    }
  }

  // camera settings
  const cameraConfig = {
    maxDistance: 1200000,
    minDistance: minDistance, // Use the state value
    smoothTime: 0.6,
    enableDamping: true,
    near: 0.01,
    far: 1500000,
  };

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        makeDefault={!satelliteCamera}
        maxDistance={cameraConfig.maxDistance}
        minDistance={cameraConfig.minDistance}
        smoothTime={cameraConfig.smoothTime}
        enableDamping={cameraConfig.enableDamping}
        near={cameraConfig.near}
        far={cameraConfig.far}
        autoRotate
        enabled={!satelliteCamera}
      />


      <Stars />

      {renderPlanet()}
      <Sun key={"Sun-plain"} textures={sunTextures} position={sunSettings.position} resetCamera={resetCamera} />

    </>
  );
};

export default Scene;
