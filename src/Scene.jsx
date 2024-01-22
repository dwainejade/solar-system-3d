import React, { useRef, useEffect, useState } from "react";
import { CameraControls, useTexture, Environment, PerspectiveCamera } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "./store/store";
import planetsData, { sizeScaleFactor } from "./data/planetsData";
import { moonsData, moonSizeScaleFactor } from "./data/moonsData";

import Planet from "./components/Planet";
// import Moon from "./components/Moon";
import Sun from "./components/Sun";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import Stars from "./components/Stars";
import Moon from "./components/Moon";

const Scene = () => {
  const { sunSettings, rotationCounts, simulationDate } = useStore();
  const { planetPositions, selectedPlanet, selectedMoon } = usePlanetStore();
  const { surfacePoint, isSurfaceCameraActive } = useCameraStore();
  const surfaceCameraRef = useRef();
  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(200);

  const resetCamera = () => {
    if (!cameraControlsRef.current) return;
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
    console.log({ selectedMoon });
    if (selectedMoon && cameraControlsRef.current) {
      const moonPosition = selectedMoon.position;
      console.log(moonPosition, cameraControlsRef.current.camera.position);
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

  // Handle resetting the camera when no planet is selected
  useEffect(() => {
    if (!selectedPlanet && cameraControlsRef.current) {
      resetCamera();
    }
  }, [selectedPlanet, sunSettings.position]);

  const heightAboveSurface = 0.1;

  useFrame(() => {
    if (isSurfaceCameraActive && surfacePoint && selectedPlanet) {
      const planetPosition = planetPositions[selectedPlanet.name];
      if (planetPosition) {
        // Create a Vector3 instance from the planet's position
        const planetPositionVector = new Vector3(planetPosition.x, planetPosition.y, planetPosition.z);

        // Calculate the initial offset if it's not already set
        const initialOffset = new Vector3(surfacePoint.x, surfacePoint.y, surfacePoint.z).sub(planetPositionVector);

        // Calculate the new camera position
        const newCameraPosition = planetPositionVector.add(initialOffset);

        // Update the camera's position
        surfaceCameraRef.current.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);

        // Orient the camera - adjust as needed
        surfaceCameraRef.current.lookAt(planetPositionVector);
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
    map: "./assets/earth/2k_earth_daymap.jpg",
    // normal: "/assets/earth/2k_earth_normal_map.png",
    // specular: "/assets/earth/2k_earth_specular_map.png",
  });
  // const sunTextures = useTexture({
  //   map: "/assets/sun/2k_sun.jpg",
  // });
  const venusTextures = useTexture({
    map: "./assets/venus/2k_venus_surface.jpg",
    surface: "./assets/venus/2k_venus_atmosphere.jpg",
  });
  const mercuryTextures = useTexture({
    map: "./assets/mercury/2k_mercury.jpg",
  });
  const marsTextures = useTexture({
    map: "./assets/mars/2k_mars.jpg",
  });
  const jupiterTextures = useTexture({
    map: "./assets/jupiter/2k_jupiter.jpg",
  });
  const saturnTextures = useTexture({
    map: "./assets/saturn/2k_saturn.jpg",
    ring: "./assets/saturn/2k_saturn_ring_alpha.png",
  });
  const uranusTextures = useTexture({
    map: "./assets/uranus/2k_uranus.jpg",
  });
  const neptuneTextures = useTexture({
    map: "./assets/neptune/2k_neptune.jpg",
  });

  // camera settings
  const cameraConfig = {
    maxDistance: 100000,
    smoothTime: 0.8, // 1.5 is default
    truckSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 2,
  };

  const renderPlanetWithMoons = (planetName, planetData) => {
    // Ensure planetMoons is always an array. If moonsData[planetName] is undefined, use an empty array
    const planetMoons = moonsData[planetName] || [];

    return (
      <React.Fragment key={planetName}>
        <Planet
          bodyData={planetData}
          // textures={/* appropriate textures for the planet */}
        />
        {planetMoons.map((moonData, index) => (
          <Moon
            key={`${planetName}-moon-${index}`}
            bodyData={moonData}
            parentPosition={planetPositions[planetName]}
            parentName={planetName}
          />
        ))}
      </React.Fragment>
    );
  };

  return (
    <>
      {!isSurfaceCameraActive && <CameraControls ref={cameraControlsRef} makeDefault {...cameraConfig} minDistance={minDistance} />}

      {/* First Person Camera */}
      {surfacePoint && isSurfaceCameraActive && (
        <PerspectiveCamera
          ref={surfaceCameraRef}
          makeDefault
          position={[surfacePoint.x, surfacePoint.y + heightAboveSurface, surfacePoint.z]}
          fov={70}
          near={0.00001}
          far={1000}
          // You may also want to set the lookAt property
        />
      )}
      <Stars />
      <ambientLight intensity={0.1} />
      <pointLight color='#f6f3ea' intensity={1} position={[0, 0, 0]} />
      <Planet bodyData={planetsData.Earth} textures={earthTextures} moonsData={moonsData.Earth} />
      <Planet bodyData={planetsData.Mars} textures={marsTextures} moonsData={moonsData.Mars} />
      <Planet bodyData={planetsData.Venus} textures={venusTextures} moonsData={moonsData.Venus} />
      <Planet bodyData={planetsData.Mercury} textures={mercuryTextures} moonsData={moonsData.Mercury} />
      <Planet bodyData={planetsData.Jupiter} textures={jupiterTextures} moonsData={moonsData.Jupiter} />
      <Planet bodyData={planetsData.Saturn} textures={saturnTextures} moonsData={moonsData.Saturn} />
      <Planet bodyData={planetsData.Uranus} textures={uranusTextures} moonsData={moonsData.Uranus} />
      <Planet bodyData={planetsData.Neptune} textures={neptuneTextures} moonsData={moonsData.Neptune} />

      {/* Render planets and their moons */}
      {Object.entries(moonsData).map(([planetName, planetData]) => renderPlanetWithMoons(planetName, planetData))}

      {/* <Planet bodyData={planetsData.Pluto} /> */}
      <Sun key={"Sun-plain"} position={sunSettings.position} resetCamera={resetCamera} />

      {/* <Stars radius={7000} count={1000} factor={100} saturation={0} fade speed={0.5} /> */}
      {/* <Environment
        background
        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        path={`/assets/stars/stars-cube-map/`}
        near={100}
        far={2000}
      /> */}
    </>
  );
};

export default Scene;
