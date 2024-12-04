"use client";

import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, PerformanceMonitor, useProgress, Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import useStore from "../../store/store";
import Menu from "../UI/Menu";
import ExperimentsMenu from "../UI/experiments/ExperimentsMenu";
import "../../styles.css";

const SharedCanvas = ({ children, mode = 'main' }) => {
  const { fullscreen, isLoading, toggleLoading } = useStore();
  const { errors, loaded } = useProgress();
  const total = 17;
  const [dpr, setDpr] = useState([1, 2]);

  // Memoize progress calculation to prevent unnecessary recalculations
  const progressPercentage = useMemo(() =>
    (loaded / total) * 100
    , [loaded]);

  // Handle DPR changes with useCallback
  const handleIncline = useCallback(() => setDpr([1, 2]), []);
  const handleDecline = useCallback(() => setDpr([1, 1]), []);

  // Separate effects for error handling and loading state
  useEffect(() => {
    if (errors.length) {
      console.warn(errors);
    }
  }, [errors]);

  useEffect(() => {
    const isLoadingComplete = progressPercentage >= 100;
    toggleLoading(!isLoadingComplete);
  }, [progressPercentage, toggleLoading]);

  // Memoize Loader component
  const Loader = useMemo(() => () => (
    <Html as='div' fullscreen className='loading-screen'>
      <div className='loading-con'>
        <p>Loading...</p>
        <div className='loading-bar-container'>
          <div
            className='loading-bar'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </Html>
  ), [progressPercentage]);

  return (
    <div className={`Main ${fullscreen ? "fullscreen" : "minimized"}`}>
      <Canvas
        id='Canvas'
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        dpr={dpr}
        gl={{
          logarithmicDepthBuffer: true,
          antialias: true,
        }}
        camera={{
          fov: 50,
          position: [20000, 20000, 20000],
          near: 0.001,
          far: 2000000
        }}
      >
        <PerformanceMonitor
          onIncline={handleIncline}
          onDecline={handleDecline}
          flipflops={true}
        />

        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.02} />
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} />
          {children}

          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={1.0}
              luminanceSmoothing={0.5}
              mipmapBlur
              radius={0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Memoize menu rendering condition */}
      {useMemo(() => (
        <>
          {!isLoading && mode === 'main' && <Menu />}
          {!isLoading && mode === 'experiments' && <ExperimentsMenu />}
        </>
      ), [isLoading, mode])}
    </div>
  );
};


export default SharedCanvas;