"use client";

import React, { useRef, useEffect, useState } from "react";
import { CameraControls, useTexture } from "@react-three/drei";
import useStore, { useCameraStore, usePlanetStore } from "@/store/store";
import { sizeScaleFactor } from "@/data/planetsData";
// import { moonsData, moonSizeScaleFactor } from "@/data/moonsData";
import Sun from "@/components/Sun";
import Planet from "@/components/PlanetBasic";
import Stars from "@/components/Stars"
import { useFrame } from "@react-three/fiber";
import AsteroidBelt from "@/components/AsteroidBelt";


const SceneThree = () => {
  const { sunSettings, simSpeed, setSimSpeed, prevSpeed, setPrevSpeed } = useStore();
  const { planetPositions, selectedPlanet, setSelectedPlanet, selectedMoon, setSelectedMoon, planetsData } = usePlanetStore();
  const { satelliteCamera, triggerReset, setTriggerReset, isCameraTransitioning, toggleCameraTransitioning, isZoomingToSun, toggleZoomingToSun } = useCameraStore();
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

  /// MOON SELECTED CAMERA
  // const getMoonData = (planetName, moonName) => {
  //   const moons = moonsData[planetName];
  //   const moon = moons.find(m => m.name === moonName);
  //   return moon;
  // };
  // useFrame(() => {
  //   if (selectedMoon && cameraControlsRef.current) {
  //     const moonPosition = moonWorldPositions[selectedMoon.name];
  //     if (moonPosition) {
  //       const moonInfo = getMoonData(moonsParent, selectedMoon.name);
  //       const scaledRadius = moonInfo.radius * moonSizeScaleFactor;
  //       const optimalDistance = calculateOptimalDistance(scaledRadius);
  //       setMinDistance(optimalDistance / 2);

  //       // Use worldPosition instead of moonObject.position
  //       cameraControlsRef.current.setTarget(moonPosition.x, moonPosition.y, moonPosition.z, true);
  //       cameraControlsRef.current.dollyTo(optimalDistance, true);
  //       toggleZoomingToSun(false);
  //     }
  //   }
  // });

  // Handle camera adjustments when a planet is selected
  useFrame(() => {
    if (selectedPlanet && !selectedMoon && cameraControlsRef.current) {
      // setMoonsParent(selectedPlanet.name);
      setSelectedMoon(null)
      const planetPosition = planetPositions[selectedPlanet.name];
      if (planetPosition) {
        const scaledRadius = planetsData[selectedPlanet.name].radius * sizeScaleFactor;
        const optimalDistance = calculateOptimalDistance(scaledRadius);
        setMinDistance(optimalDistance / 2);
        cameraControlsRef.current.setTarget(planetPosition.x, planetPosition.y, planetPosition.z, true);
        cameraControlsRef.current.dollyTo(optimalDistance, true);
        toggleZoomingToSun(false)
      }
      if (selectedPlanet.name === "Sun" && isZoomingToSun) {
        setMinDistance(200);
        cameraControlsRef.current.setTarget(0, 0, 0, true);
        if (cameraControlsRef.current.distance < 800) toggleZoomingToSun(false)
        cameraControlsRef.current.dollyTo(200, true);
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
    if (selectedPlanet && !selectedMoon && selectedPlanet.name !== "Sun" && !isCameraTransitioning) {
      setSelectedMoon(null);
      toggleCameraTransitioning(true); // Start the camera transition
      setPrevSpeed(simSpeed);
      setSimSpeed(0); // Pause the simulation
    }
    // if (selectedMoon && !isCameraTransitioning) { // moon selected camera
    //   toggleCameraTransitioning(true);
    //   setPrevSpeed(simSpeed);
    //   setSimSpeed(0);
    // }
    if (!selectedPlanet && !selectedMoon) {
      toggleZoomingToSun(false)
      setSimSpeed(prevSpeed);
      toggleCameraTransitioning(false);
    }
    if (selectedPlanet?.name === "Sun") {
      toggleZoomingToSun(true)
      if (simSpeed === 0) {
        setSimSpeed(prevSpeed)
        toggleCameraTransitioning(false);
      }
    }

    cameraControlsRef.current?.camera.updateProjectionMatrix()
  }, [selectedPlanet, selectedMoon]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.button === 1) { // 1 is the button code for the middle mouse button
        event.preventDefault();
      }
      if (cameraControlsRef.current) { // remove pannig
        cameraControlsRef.current.mouseButtons.right = 1
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
    smoothTime: .65,
    enableDamping: true,
    near: 0.1,
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
          maxZoom={10}
        />
      )}
      {/* <axesHelper args={[400]} /> */}
      {/* <gridHelper args={[20000, 200]} scale={4} colorGrid={"red"} /> */}
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

      {/* Render moons */}
      {/* {Object.entries(moonsData).map(([planetName]) => renderMoons(planetName))} */}

      {/* <Planet bodyData={planetsData.Pluto} /> */}
      <Sun key={"Sun-plain"} textures={sunTextures} position={sunSettings.position} resetCamera={resetCamera} />

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
