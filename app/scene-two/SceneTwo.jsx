"use client";

import React, { useRef, useEffect, useState } from "react";
import { CameraControls, useTexture, PerspectiveCamera, useHelper } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import planetsData, { sizeScaleFactor } from "@/data/planetsData";
import { moonsData, moonSizeScaleFactor } from "@/data/moonsData";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import Moon from "@/components/Moon";
import Sun from "@/components/Sun";
import Planet from "@/components/DetailedPlanet";
import Stars from "@/components/Stars"

const SceneOne = () => {
  const { sunSettings } = useStore();
  const { planetPositions, selectedPlanet, setSelectedPlanet, selectedMoon, setSelectedMoon } = usePlanetStore();
  const { cameraTarget, setCameraTarget, surfaceNormal, cameraSurfacePoint, cameraSurfaceNormal } = useCameraStore();
  const { surfacePoint, isSurfaceCameraActive, triggerReset, setTriggerReset } = useCameraStore();
  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(200);
  const [cameraOffset, setCameraOffset] = useState(0); // Initial offset distance
  const [target, setTarget] = useState(null)

  const resetCamera = () => {
    if (!cameraControlsRef.current) return;
    setSelectedPlanet(null)
    setSelectedMoon(null)
    setMinDistance(200);
    setCameraTarget(new Vector3(sunSettings.position.x, sunSettings.position.y, sunSettings.position.z));
    const isometricPosition = {
      x: sunSettings.position.x - 2000,
      y: sunSettings.position.y + 1000,
      z: sunSettings.position.z + 1000,
    };
    cameraControlsRef.current.setPosition(isometricPosition.x, isometricPosition.y, isometricPosition.z, true);
  };

  // Handle camera adjustments when a planet is selected
  useEffect(() => {
    if (selectedPlanet && cameraControlsRef.current) {
      setTarget('planet')
      const planetPosition = planetPositions[selectedPlanet.name];
      if (planetPosition) {
        setCameraTarget(new Vector3(planetPosition.x, planetPosition.y, planetPosition.z));
        // Assuming planet's position and other data are ready
        const scaledRadius = planetsData[selectedPlanet.name].radius * .001;
        const optimalDistance = calculateOptimalDistance(scaledRadius);
        setCameraOffset(optimalDistance)
        setMinDistance(optimalDistance);
        cameraControlsRef.current.setTarget(planetPosition.x, planetPosition.y, planetPosition.z, true);
        cameraControlsRef.current.dollyTo(optimalDistance, true);
      }
      if (selectedPlanet.name === "Sun") {
        setMinDistance(200);
        cameraControlsRef.current.setTarget(0, 0, 0, true);
        cameraControlsRef.current.dollyTo(200, true);
      }
    }
    if (selectedMoon && cameraControlsRef.current) {
      setTarget('moon')
      setCameraTarget(new Vector3(selectedMoon.position.x, selectedMoon.position.y, selectedMoon.position.z));
      const moonPosition = selectedMoon.position;
      if (moonPosition) {
        setCameraTarget(new Vector3(moonPosition.x, moonPosition.y, moonPosition.z));
        // Calculate the optimal distance to view the moon
        const scaledRadius = selectedMoon.bodyData.radius * moonSizeScaleFactor;
        const optimalDistance = calculateOptimalDistance(scaledRadius);
        setCameraOffset(optimalDistance)
        // Adjust the minimum distance for the camera to avoid getting too close
        setMinDistance(optimalDistance / 2);

        // Smoothly transition the camera to the moon's position
        cameraControlsRef.current.setTarget(moonPosition.x, moonPosition.y, moonPosition.z, true);
        cameraControlsRef.current.dollyTo(optimalDistance, true);
      }
    }
    if (!selectedMoon && !selectedPlanet) {
      setTarget(null)
    }
  }, [selectedPlanet, selectedMoon]);


  // Handle resetting the camera when no planet is selected
  useEffect(() => {
    if (!selectedPlanet && cameraControlsRef.current) {
      resetCamera();
    }
  }, [selectedPlanet, sunSettings.position]);

  // Handle resetting the camera from state
  useEffect(() => {
    if (resetCamera) {
      resetCamera()
      setTriggerReset(false)
    }
  }, [triggerReset]);


  useFrame(() => {
    // Update the camera target position if a planet or moon is selected
    if (cameraControlsRef.current) {
      if (target === 'planet') {
        const planetPosition = planetPositions[selectedPlanet.name];
        if (planetPosition) {
          cameraControlsRef.current.setTarget(planetPosition.x, planetPosition.y, planetPosition.z, true);
          cameraControlsRef.current.dollyTo(cameraOffset, true);
        }
      } else if (target === 'moon') {
        const moonPosition = selectedMoon.position;
        if (moonPosition) {
          cameraControlsRef.current.setTarget(moonPosition.x, moonPosition.y, moonPosition.z, true);
          cameraControlsRef.current.dollyTo(cameraOffset, true);
        }
        if (!target) return;
      } else {
        // If nothing is selected, reset the camera to the default target
        const sunPosition = new Vector3(sunSettings.position.x, sunSettings.position.y, sunSettings.position.z);
        cameraControlsRef.current.setTarget(sunPosition.x, sunPosition.y, sunPosition.z, true);
      }
    }
  });





  // A simplistic approach to calculate optimal distance
  function calculateOptimalDistance(planetRadius) {
    // This is a simple heuristic. You might need a more complex calculation based on FOV and viewport size.
    const baseDistance = 4; // This depends on how large you want the planet to appear
    return planetRadius * baseDistance;
  }

  const earthTextures = useTexture({
    map: "../assets/earth/2k_earth_daymap.jpg",
    normal: "../assets/earth/2k_earth_normal_map.png",
    specular: "../assets/earth/2k_earth_specular_map.png",
  });
  const moonTextures = useTexture({
    map: "../assets/earth/moon/moon.jpg",
  });

  // camera settings
  const cameraConfig = {
    maxDistance: 1000000,
    smoothTime: 0.8, // 1.5 is default
    truckSpeed: 0.8,
    rotateSpeed: 0.1,
    zoomSpeed: 0.8,
  };

  return (
    <>
      {!isSurfaceCameraActive && (
        <CameraControls ref={cameraControlsRef} makeDefault {...cameraConfig} minDistance={Math.max(0.01, minDistance)} />
      )}

      <Stars />

      <Planet bodyData={planetsData.Earth} textures={earthTextures} />

      <Moon
        key='Earth-moon'
        bodyData={moonsData.Earth[0]}
        parentPosition={planetPositions.Earth}
        parentName='Earth'
        textures={moonTextures}
      />

      <Sun key={"Sun-plain"} position={sunSettings.position} resetCamera={resetCamera} />

    </>
  );
};

export default SceneOne;
