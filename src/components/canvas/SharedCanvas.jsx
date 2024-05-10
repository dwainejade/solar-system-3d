"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload, Stats, useProgress } from "@react-three/drei";
import useStore, { usePlanetStore } from "../../store/store";
import Menu from "../UI/Menu";
import "../../styles.css";

const SharedCanvas = ({ children }) => {
  const { fullscreen } = useStore();
  const { selectedPlanet } = usePlanetStore();
  const { errors, loaded } = useProgress();
  const totalAssets = 12;
  const progressPercentage = (loaded / totalAssets) * 100;

  useEffect(() => {
    if (errors.length) {
      console.warn(errors);
    }
  }, [errors]);

  const Loader = () => {
    return (
      <Html as='div' fullscreen className='loading-screen'>
        <div className='loading-con'>
          <p>Loading...</p>
          <div className='loading-bar-container'>
            <div className='loading-bar' style={{ width: `${progressPercentage}%` }}></div>
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
          antialias: false,
          alpha: false,
          stencil: true,
          logarithmicDepthBuffer: true

        }}
        camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.01, far: 1000000 }}

      >
        <Stats showPanel={2} />

        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.04} />
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} key={selectedPlanet?.name || 'basic'} />
          {children}
        </Suspense>
        {/* <Preload all /> */}
      </Canvas>
      <Menu />
    </div>
  );
};

export default SharedCanvas;
