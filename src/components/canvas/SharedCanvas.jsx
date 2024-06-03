"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload, Stats, useProgress } from "@react-three/drei";
import useStore from "../../store/store";
import Menu from "../UI/Menu";
import "../../styles.css";

const SharedCanvas = ({ children }) => {
  const { fullscreen, isLoading, toggleLoading } = useStore();
  const { errors, loaded } = useProgress();
  const total = 17
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
        shadows dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          logarithmicDepthBuffer: true,
        }}
        camera={{ fov: 50, position: [20000, 20000, 20000], near: 1, far: 1000000 }}
      >
        <Stats showPanel={2} />

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
