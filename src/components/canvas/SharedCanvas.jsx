"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload, Stats, useProgress } from "@react-three/drei";
import useStore from "../../store/store";
import Menu from "../UI/Menu";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import "../../styles.css";

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
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
        camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.01, far: 1000000 }}
      >
        <Suspense fallback={<Loader />}>
          <Stats showPanel={2} />
          <ambientLight intensity={0.04} />
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} />
          <EffectComposer>
            <Bloom mipmapBlur intensity={.6} luminanceThreshold={1} luminanceSmoothing={1.2} radius={.6} />
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
