import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Scene from "./Scene";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import Menu from "./components/Menu";
import { usePlanetStore } from "./store/store";
import { sizeScaleFactor } from "./data/planetsData";
import CameraEffects from "./components/CameraEffects";

const App = () => {
  const { selectedPlanet } = usePlanetStore();

  return (
    <div className='Main'>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.1, far: 100000 }}>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        {/* <Perf /> */}
        <Scene />
        <CameraEffects />
        {/* </Suspense> */}
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.3} luminanceThreshold={1} luminanceSmoothing={1.2} radius={0.6} />
          {selectedPlanet && <DepthOfField focusDistance={0.5} focalLength={20} bokehScale={10} />}
        </EffectComposer>
      </Canvas>
      <Menu />
    </div>
  );
};

export default App;
