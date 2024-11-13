"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, PerformanceMonitor, useProgress, Stats, Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import useStore from "../../store/store";
import Menu from "../UI/Menu";
import ExperimentsMenu from "../UI/experiments/ExperimentsMenu";
import "../../styles.css";

const SharedCanvas = ({ children, mode = 'main' }) => {
  const { fullscreen, isLoading, toggleLoading } = useStore();
  const { errors, loaded } = useProgress();
  const total = 17;
  const progressPercentage = (loaded / total) * 100;
  const [dpr, setDpr] = useState([1, 2]);

  useEffect(() => {
    if (errors.length) {
      console.warn(errors);
    }
    if (progressPercentage >= 100) {
      toggleLoading(false);
    } else {
      toggleLoading(true);
    }
  }, [errors, progressPercentage, toggleLoading]);

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
        shadows
        dpr={dpr}
        gl={{
          antialias: true,
          logarithmicDepthBuffer: true,
        }}
        camera={{
          fov: 50,
          position: [20000, 20000, 20000],
          near: 0.1,
          far: 2000000
        }}
      >
        <Stats />
        <PerformanceMonitor
          onIncline={() => setDpr([1, 2])}
          onDecline={() => setDpr([1, 1])}
        />

        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.02} />
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} />
          {children}

          <EffectComposer>
            <Bloom
              intensity={0.5}           // Reduced from 1.2
              luminanceThreshold={1.0}  // Increased from 0.9
              luminanceSmoothing={0.5}  // Reduced from 0.9
              mipmapBlur
              radius={0.65}             // Reduced from 0.65
            />
          </EffectComposer>
        </Suspense>
        <Preload all />
      </Canvas>
      {!isLoading && mode === 'main' && <Menu />}
      {!isLoading && mode === 'experiments' && <ExperimentsMenu />}
    </div>
  );
};

export default SharedCanvas;