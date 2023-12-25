import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Scene from "./Scene";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import Menu from "./components/Menu";
import { usePlanetStore } from "./store/store";

const App = () => {
  const { selectedPlanet } = usePlanetStore();

  return (
    <div className='Main'>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: selectedPlanet ? 25 : 50, position: [5000, 5000, 5000], near: 0.1, far: 100000 }}>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Scene />
        {/* </Suspense> */}
        {/* <Perf /> */}
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.3} luminanceThreshold={1} luminanceSmoothing={1.2} radius={0.6} />
          <DepthOfField focusDistance={selectedPlanet ? 4 : 0} focalLength={8} bokehScale={3} />
        </EffectComposer>
      </Canvas>
      <Menu />
    </div>
  );
};

export default App;
