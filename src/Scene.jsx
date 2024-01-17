import React, { useRef, useEffect, useState } from "react";
import { Stars, CameraControls, useTexture, Environment } from "@react-three/drei";
import useStore, { usePlanetStore } from "./store/store";
import planetsData from "./data/planetsData";
import Planet from "./components/Planet";
// import Moon from "./components/Moon";
import Sun from "./components/Sun";
import { sizeScaleFactor } from "./data/planetsData";

const Scene = () => {
  const { sunSettings, rotationCounts, simulationDate } = useStore();
  const { planetPositions, selectedPlanet } = usePlanetStore();
  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(5);

  const resetCamera = () => {
    if (!cameraControlsRef.current) return;

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
        setMinDistance(4);
        cameraControlsRef.current.setTarget(0, 0, 0, true);
        cameraControlsRef.current.dollyTo(8, true);
      }
    }
  }, [selectedPlanet, planetPositions]);

  // Handle resetting the camera when no planet is selected
  useEffect(() => {
    if (!selectedPlanet && cameraControlsRef.current) {
      resetCamera();
    }
  }, [selectedPlanet, sunSettings.position]);

  // A simplistic approach to calculate optimal distance
  function calculateOptimalDistance(planetRadius) {
    // This is a simple heuristic. You might need a more complex calculation based on FOV and viewport size.
    const baseDistance = 4; // This depends on how large you want the planet to appear
    return planetRadius * baseDistance;
  }

  const earthTextures = useTexture({
    map: "/assets/earth/2k_earth_daymap.jpg",
    normal: "/assets/earth/2k_earth_normal_map.png",
    specular: "/assets/earth/2k_earth_specular_map.png",
  });
  // const sunTextures = useTexture({
  //   map: "/assets/sun/2k_sun.jpg",
  // });
  const venusTextures = useTexture({
    map: "/assets/venus/2k_venus_surface.jpg",
    surface: "/assets/venus/2k_venus_atmosphere.jpg",
  });
  const mercuryTextures = useTexture({
    map: "/assets/mercury/2k_mercury.jpg",
  });
  const marsTextures = useTexture({
    map: "/assets/mars/2k_mars.jpg",
  });
  const jupiterTextures = useTexture({
    map: "/assets/jupiter/2k_jupiter.jpg",
  });
  const saturnTextures = useTexture({
    map: "/assets/saturn/2k_saturn.jpg",
    ring: "/assets/saturn/2k_saturn_ring_alpha.png",
  });
  const uranusTextures = useTexture({
    map: "/assets/uranus/2k_uranus.jpg",
  });
  const neptuneTextures = useTexture({
    map: "/assets/neptune/2k_neptune.jpg",
  });

  // camera settings
  const cameraConfig = {
    maxDistance: 100000,
    smoothTime: 1,
    truckSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 2,
  };

  return (
    <>
      <CameraControls ref={cameraControlsRef} makeDefault {...cameraConfig} minDistance={minDistance} />
      <ambientLight intensity={0.1} />
      <pointLight color='#f6f3ea' intensity={1} position={[0, 0, 0]} />
      <Planet
        key={selectedPlanet ? selectedPlanet.name === "Earth-textured" : "Earth-plain"}
        bodyData={planetsData.Earth}
        textures={earthTextures}
      />
      {/* <Moon bodyData={planetsData.Moon} parentPosition={planetPositions.Earth} /> */}
      <Planet
        key={selectedPlanet?.name === "Mars-textured" ? selectedPlanet.name : "Mars-plain"}
        bodyData={planetsData.Mars}
        textures={marsTextures}
      />
      <Planet
        key={selectedPlanet?.name === "Venus-textured" ? selectedPlanet.name : "Venus-plain"}
        bodyData={planetsData.Venus}
        textures={venusTextures}
      />
      <Planet
        key={selectedPlanet?.name === "Mercury-textured" ? selectedPlanet.name : "Mercury-plain"}
        bodyData={planetsData.Mercury}
        textures={mercuryTextures}
      />
      <Planet
        key={selectedPlanet?.name === "Jupiter-textured" ? selectedPlanet.name : "Jupiter-plain"}
        bodyData={planetsData.Jupiter}
        textures={jupiterTextures}
      />
      <Planet
        key={selectedPlanet?.name === "Saturn-textured" ? selectedPlanet.name : "Saturn-plain"}
        bodyData={planetsData.Saturn}
        textures={saturnTextures}
      />
      <Planet
        key={selectedPlanet?.name === "Uranus-textured" ? selectedPlanet.name : "Uranus-plain"}
        bodyData={planetsData.Uranus}
        textures={uranusTextures}
      />
      <Planet
        key={selectedPlanet?.name === "Neptune-textured" ? selectedPlanet.name : "Neptune-plain"}
        bodyData={planetsData.Neptune}
        textures={neptuneTextures}
      />
      {/* <Planet bodyData={planetsData.Pluto} /> */}
      <Sun key={"Sun-plain"} position={sunSettings.position} resetCamera={resetCamera} />

      {/* <Stars radius={7000} count={1000} factor={100} saturation={0} fade speed={0.5} /> */}
      <Environment
        background
        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        path={`/assets/stars/stars-cube-map/`}
        near={100}
        far={2000}
      />
    </>
  );
};

export default Scene;
