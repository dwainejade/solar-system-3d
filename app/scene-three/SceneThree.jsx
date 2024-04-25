"use client";

import React, { useRef, useEffect, useState } from "react";
import { CameraControls, useTexture } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import { sizeScaleFactor } from "@/data/planetsData";
import { moonsData, moonSizeScaleFactor } from "@/data/moonsData";
import Moon from "@/components/Moon";
import Sun from "@/components/Sun";
import Planet from "@/components/PlanetBasic";
import Stars from "@/components/Stars"
import { useFrame } from "@react-three/fiber";
import CameraPath from '@/components/CameraPath';

const SceneThree = () => {
  const { sunSettings, simSpeed, setSimSpeed, prevSpeed, setPrevSpeed } = useStore();
  const { planetPositions, selectedPlanet, setSelectedPlanet, selectedMoon, setSelectedMoon, planetsData } = usePlanetStore();
  const { satelliteCamera, triggerReset, setTriggerReset, toggleCameraTransitioning, isCameraTransitioning } = useCameraStore();
  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(200);

  // A simplistic approach to calculate optimal distance
  const calculateOptimalDistance = (planetRadius) => {
    const baseDistance = 4.2;
    return planetRadius * baseDistance;
  }


  const resetCamera = () => {
    if (!cameraControlsRef.current) return;
    setSelectedPlanet(null)
    setSelectedMoon(null)
    setMinDistance(200);
    // Set the target to the sun's position
    cameraControlsRef.current.setTarget(sunSettings.position.x, sunSettings.position.y, sunSettings.position.z, true);

    // Define an isometric position for the camera
    const isometricPosition = {
      x: sunSettings.position.x + -2000,
      y: sunSettings.position.y + 1000,
      z: sunSettings.position.z + 1000,
    };
    cameraControlsRef.current.setPosition(isometricPosition.x, isometricPosition.y, isometricPosition.z, true);
  };

  // Handle camera adjustments when a planet is selected
  useFrame(() => {
    if (selectedPlanet && cameraControlsRef.current) {
      const planetPosition = planetPositions[selectedPlanet.name];
      if (planetPosition) {
        // Assuming planet's position and other data are ready
        const scaledRadius = planetsData[selectedPlanet.name].radius * sizeScaleFactor;
        const optimalDistance = calculateOptimalDistance(scaledRadius);
        setMinDistance(optimalDistance / 2);
        cameraControlsRef.current.setTarget(planetPosition.x, planetPosition.y, planetPosition.z, true);
        cameraControlsRef.current.dollyTo(optimalDistance, true);
      }
      if (selectedPlanet.name === "Sun") {
        setMinDistance(200);
        cameraControlsRef.current.setTarget(0, 0, 0, true);
        cameraControlsRef.current.dollyTo(200, true);
      }
    }
  });
  useFrame(() => {
    if (selectedMoon && cameraControlsRef.current) {
      const moonPosition = selectedMoon.position;
      if (moonPosition) {
        // Calculate the optimal distance to view the moon
        const scaledRadius = selectedMoon.bodyData.radius * moonSizeScaleFactor;
        const optimalDistance = calculateOptimalDistance(scaledRadius);
        // Adjust the minimum distance for the camera to avoid getting too close
        setMinDistance(optimalDistance / 2);

        // Smoothly transition the camera to the moon's position
        cameraControlsRef.current.setTarget(moonPosition.x, moonPosition.y, moonPosition.z, true);
        cameraControlsRef.current.dollyTo(optimalDistance, true);
      }
    }
  });

  // Handle resetting the camera from state
  useEffect(() => {
    if (resetCamera) {
      resetCamera()
      setTriggerReset(false)
    }
  }, [triggerReset]);

  useEffect(() => {
    if (selectedPlanet) {
      setPrevSpeed(simSpeed);
      setSimSpeed(0); // Pause the simulation
      toggleCameraTransitioning(true); // Start the camera transition
      console.log("Camera transition started", { simSpeed, prevSpeed });
      console.log({ isCameraTransitioning })
    }
  }, [selectedPlanet]);


  const earthTextures = useTexture({
    map: "../assets/earth/8k_earth_daymap.jpg",
    clouds: "../assets/earth/2k_earth_clouds.jpg",
    night: "../assets/earth/2k_earth_nightmap.jpg",
    normal: "../assets/earth/2k_earth_normal_map.png",
    specular: "../assets/earth/2k_earth_specular_map.png",
  });
  const venusTextures = useTexture({
    map: "../assets/venus/2k_venus_surface.jpg",
    surface: "../assets/venus/2k_venus_atmosphere.jpg",
  });
  const mercuryTextures = useTexture({
    map: "../assets/mercury/2k_mercury.jpg",
  });
  const marsTextures = useTexture({
    map: "../assets/mars/2k_mars.jpg",
  });
  const jupiterTextures = useTexture({
    map: "../assets/jupiter/2k_jupiter.jpg",
  });
  const saturnTextures = useTexture({
    map: "../assets/saturn/2k_saturn.jpg",
  });
  const uranusTextures = useTexture({
    map: "../assets/uranus/2k_uranus.jpg",
  });
  const neptuneTextures = useTexture({
    map: "../assets/neptune/2k_neptune.jpg",
  });

  // camera settings
  const cameraConfig = {
    maxDistance: 90000,
    smoothTime: .8,
    truckSpeed: 1,
    rotateSpeed: 1,
  };


  return (
    <>
      {!satelliteCamera && (
        <CameraControls
          ref={cameraControlsRef}
          makeDefault={!satelliteCamera}
          {...cameraConfig}
          minDistance={Math.min(1, minDistance)}
        />
      )}
      {/* {selectedPlanet && <CameraPath targetPosition={planetPositions[selectedPlanet.name]} />} */}

      {/* First Person Camera */}
      {/* {surfacePoint && isSurfaceCameraActive && (
        <PerspectiveCamera
          ref={surfaceCameraRef}
          makeDefault
          position={[surfacePoint.x, surfacePoint.y + heightAboveSurface, surfacePoint.z]}
          fov={70}
          near={0.01}
          far={1000000}
        />
      )} */}

      <Stars />

      <Planet name="Earth" textures={earthTextures} />
      <Planet name="Mars" textures={marsTextures} />
      <Planet name="Venus" textures={venusTextures} />
      <Planet name="Mercury" textures={mercuryTextures} />
      <Planet name="Jupiter" textures={jupiterTextures} />
      <Planet name="Saturn" textures={saturnTextures} />
      <Planet name="Uranus" textures={uranusTextures} />
      <Planet name="Neptune" textures={neptuneTextures} />

      {/* Render moons */}
      {/* {Object.entries(moonsData).map(([planetName]) => renderMoons(planetName))} */}

      {/* <Planet bodyData={planetsData.Pluto} /> */}
      <Sun key={"Sun-plain"} position={sunSettings.position} resetCamera={resetCamera} />
    </>
  );
};

// function ControlledCamera({ selectedPlanet, planetPositions, planetsData, sizeScaleFactor }) {
//   const orbitRef = useRef();
//   const { camera, gl } = useThree();

//   useEffect(() => {
//     if (selectedPlanet && orbitRef.current) {
//       const position = planetPositions[selectedPlanet.name];
//       const data = planetsData[selectedPlanet.name];
//       const distance = data.radius * sizeScaleFactor * 4.2; // or any other logic to determine the distance

//       orbitRef.current.target.set(position.x, position.y, position.z);
//       camera.position.set(position.x + distance, position.y + distance, position.z + distance);
//       orbitRef.current.update();
//     }
//   }, [selectedPlanet, planetPositions, planetsData, sizeScaleFactor, camera]);

//   return <OrbitControls makeDefault ref={orbitRef} args={[camera, gl.domElement]} />;
// }

export default SceneThree;
