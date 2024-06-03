"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, PerformanceMonitor, Preload, Stats, useProgress } from "@react-three/drei";
import useStore from "../../store/store";
import Menu from "../UI/Menu";
import "../../styles.css";

const SharedCanvas = ({ children }) => {
  const { fullscreen, isLoading, toggleLoading } = useStore();
  const { errors, loaded } = useProgress();
  const total = 17
  const progressPercentage = (loaded / total) * 100;
  const [dpr, setDpr] = useState(1);

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
        shadows dpr={dpr}
        gl={{
          antialias: true,
          alpha: false,
          logarithmicDepthBuffer: true,
        }}
        camera={{ fov: 50, position: [20000, 20000, 20000], near: 0.1, far: 1000000 }}
        frameloop="demand"
      >
        <Stats showPanel={2} />
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />

        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.02} />
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} />
          {children}
        </Suspense>
        {/* <Preload all /> */}
      </Canvas>
      {!isLoading && <Menu />}
    </div>
  );
};

export default SharedCanvas;
