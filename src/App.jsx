import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { Perf } from "r3f-perf";
import Scene from "./Scene";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Menu from "./components/Menu";
// import CameraControls from "./components/CameraControls";

const App = () => {
  return (
    <div className='Main'>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: 45, position: [40, 40, 40], near: 0.1, far: 2000 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Scene />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.3} luminanceThreshold={1} luminanceSmoothing={1.2} radius={0.6} />
        </EffectComposer>
      </Canvas>
      <Menu />
    </div>
  );
};

export default App;
