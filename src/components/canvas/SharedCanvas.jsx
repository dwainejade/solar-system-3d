"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Stars from "../Stars";
import { Html, Preload, Stats, useProgress } from "@react-three/drei";
import "../../styles.css";
import useStore from "../../store/store";
import Menu from "../Menu";
import * as THREE from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const SharedCanvas = ({ children }) => {
  const { fullscreen } = useStore();
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
        <div>
          <p>Loading: {progressPercentage.toFixed(0)}%</p>
          <div className='loading-bar-container'>
            <div className='loading-bar' style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </Html>
    );
  };

  return (
    <div className={`Main ${fullscreen ? "fullscreen" : "minimized"}`}>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.01, far: 200000 }}>
        <Suspense fallback={<Loader />}>
          <Stats />
          <Stars />

          <ambientLight intensity={0.1} />
          <pointLight color='#f6f3ea' intensity={1} position={[0, 0, 0]} />
          <EffectComposer>
            <Bloom mipmapBlur intensity={0.3} luminanceThreshold={1} luminanceSmoothing={1.2} radius={0.6} />
          </EffectComposer>

          {children}
        </Suspense>
        <Preload all />
      </Canvas>
      <Menu />
    </div>
  );
};

export default SharedCanvas;
