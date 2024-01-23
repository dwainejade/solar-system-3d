import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Stats, useProgress, Html } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Menu from "./components/Menu";
import useStore from "./store/store";
import CameraEffects from "./components/CameraEffects";

const App = () => {
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
        <p>Loading: {progressPercentage.toFixed(0)}%</p>
      </Html>
    );
  };

  return (
    <div className={`Main ${fullscreen ? "fullscreen" : "minimized"}`}>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.1, far: 200000 }}>
        <Suspense fallback={<Loader />}>
          <Stats />
          <Scene />
          <CameraEffects />
          <EffectComposer>
            <Bloom mipmapBlur intensity={0.3} luminanceThreshold={1} luminanceSmoothing={1.2} radius={0.6} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <Menu />
    </div>
  );
};

export default App;
