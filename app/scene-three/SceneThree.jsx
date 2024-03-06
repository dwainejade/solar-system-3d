"use client";

import React, { useRef, useEffect, useState } from "react";
import { CameraControls, useTexture, PerspectiveCamera } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import { sizeScaleFactor } from "@/data/planetsData";
import { moonsData, moonSizeScaleFactor } from "@/data/moonsData";
import Moon from "@/components/Moon";
import Sun from "@/components/Sun";
import Planet from "@/components/PlanetBasic";
import Stars from "@/components/Stars"

const SceneThree = () => {
  const { sunSettings, rotationCounts, simulationDate } = useStore();
  const { planetPositions, selectedPlanet, setSelectedPlanet, selectedMoon, setSelectedMoon, planetsData } = usePlanetStore();
  const { surfacePoint, isSurfaceCameraActive, triggerReset, setTriggerReset } = useCameraStore();
  const surfaceCameraRef = useRef();
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
  useEffect(() => {
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
  }, [selectedPlanet, planetPositions]);
  useEffect(() => {
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
  }, [selectedMoon, moonsData]);

  // Handle resetting the camera from state
  useEffect(() => {
    if (resetCamera) {
      resetCamera()
      setTriggerReset(false)
    }
  }, [triggerReset]);


  // const heightAboveSurface = 10;
  // useFrame(() => {
  //   if (isSurfaceCameraActive && surfacePoint && selectedPlanet) {
  //     const planetPosition = planetPositions[selectedPlanet.name];
  //     if (planetPosition) {
  //       // Assuming planetPosition is the center of the planet
  //       const centerOfPlanet = new Vector3(planetPosition.x, planetPosition.y, planetPosition.z);

  //       // Calculate the normal as the vector from the planet's center to the surface point
  //       const surfaceNormal = new Vector3(surfacePoint.x, surfacePoint.y, surfacePoint.z).sub(centerOfPlanet).normalize();

  //       // Position the camera slightly above the surface point
  //       const cameraHeightAboveSurface = 0.1; // Adjust as needed
  //       const cameraPosition = new Vector3(surfacePoint.x, surfacePoint.y, surfacePoint.z).add(
  //         surfaceNormal.multiplyScalar(cameraHeightAboveSurface)
  //       );

  //       surfaceCameraRef.current.position.copy(cameraPosition);

  //       // Set the camera to look at a point directly 'up' from the surface
  //       const lookAtPoint = cameraPosition.clone().add(surfaceNormal);
  //       surfaceCameraRef.current.lookAt(lookAtPoint);

  //       // Align the camera's up vector with the surface normal
  //       surfaceCameraRef.current.up.copy(surfaceNormal);
  //     }
  //   }
  // });

  const earthTextures = useTexture({
    map: "../assets/earth/2k_earth_daymap.jpg",
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
    smoothTime: 1, // 1.5 is default
    truckSpeed: 0.6,
    rotateSpeed: 0.6,

  };

  const renderMoons = (planetName, planetData) => {
    // Ensure planetMoons is always an array. If moonsData[planetName] is undefined, use an empty array
    const planetMoons = moonsData[planetName] || [];
    return planetMoons.map((moonData, index) => (
      <Moon key={`${planetName}-moon-${index}`} bodyData={moonData} parentPosition={planetPositions[planetName]} parentName={planetName} />
    ));
  };

  return (
    <>
      {!isSurfaceCameraActive && (
        <CameraControls ref={cameraControlsRef} makeDefault {...cameraConfig} minDistance={Math.min(1, minDistance)} />
      )}

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
      {Object.entries(moonsData).map(([planetName, planetData]) => renderMoons(planetName, planetData))}

      {/* <Planet bodyData={planetsData.Pluto} /> */}
      <Sun key={"Sun-plain"} position={sunSettings.position} resetCamera={resetCamera} />
    </>
  );
};

export default SceneThree;
