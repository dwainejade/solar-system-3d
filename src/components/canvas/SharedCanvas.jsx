"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload, Stats, useProgress } from "@react-three/drei";
import useStore, { usePlanetStore } from "../../store/store";
import Menu from "../UI/Menu";
import "../../styles.css";

const SharedCanvas = ({ children }) => {
  const { fullscreen, isLoading, toggleLoading } = useStore();
  const { selectedPlanet } = usePlanetStore();
  const { errors, loaded, total } = useProgress();

  const progressPercentage = (loaded / total) * 100;

  useEffect(() => {
    if (errors.length) {
      console.warn(errors);
    }
    if (progressPercentage >= 100) {
      toggleLoading(false);
    } else {
      toggleLoading(true);
    }
    console.log(progressPercentage);
  }, [errors, progressPercentage, toggleLoading]);

  const Loader = () => {
    const { progress } = useProgress();
    return (
      <Html as='div' fullscreen className='loading-screen'>
        <div className='loading-con'>
          <p>Loading...</p>
          <div className='loading-bar-container'>
            <div className='loading-bar' style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </Html>
    );
  };

  return (
    <div className={`Main ${fullscreen ? "fullscreen" : "minimized"}`}>
      <Canvas
        id='Canvas'
        shadows dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          logarithmicDepthBuffer: true,
        }}
        camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.01, far: 1000000 }}
      >
        <Stats showPanel={2} />

        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.04} />
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} key={selectedPlanet?.name || 'basic'} />
          {children}
        </Suspense>
        <Preload all />
      </Canvas>
      {!isLoading && <Menu />}
    </div>
  );
};

export default SharedCanvas;
