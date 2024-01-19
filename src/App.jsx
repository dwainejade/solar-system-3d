import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Stats } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Menu from "./components/Menu";
import useStore from "./store/store";
import CameraEffects from "./components/CameraEffects";

const App = () => {
  const { fullscreen } = useStore();

  return (
    <div className={`Main ${fullscreen ? "fullscreen" : "minimized"}`}>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.1, far: 200000 }}>
        <Suspense fallback={null}>
          <Stats />
          <Scene />
        </Suspense>
        <CameraEffects />
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.3} luminanceThreshold={1} luminanceSmoothing={1.2} radius={0.6} />
        </EffectComposer>
      </Canvas>
      <Menu />
    </div>
  );
};

export default App;
