"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Stars from "../Stars";
import { Environment, Html, Preload, Stats, useProgress } from "@react-three/drei";
import useStore from "../../store/store";
import Menu from "../Menu";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import "../../styles.css";
import { RGBADepthPacking } from "three";

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
  const [constellations, setConstellations] = useState(false)
  const toggleStars = () => {
    console.log('toggled stars', !constellations)
    setConstellations(!constellations)
  }
  return (
    <div className={`Main ${fullscreen ? "fullscreen" : "minimized"}`}>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.1, far: 200000 }} onAuxClick={toggleStars}>
        <Suspense fallback={<Loader />}>
          <Stats />
          {/* <Stars /> */}

          {/* <Environment
            background="only"
            blur={0}
            files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
            path={`../assets/stars/stars-cube-map/`}
            preset={null}
            scene={undefined}
          /> */}

          {/* <Environment
            background="only"
            blur={0}
            files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
            path="../assets/stars/constellations-cube-map/"
            preset={null}
            scene={undefined}
            encoding={undefined}
          // ground={{ radius: 50000, scale: 1000 }}
          /> */}

          <ambientLight intensity={0.04} />
          <pointLight color='#f6f3ea' intensity={1} position={[0, 0, 0]} />
          <EffectComposer>
            <Bloom mipmapBlur intensity={0.3} luminanceThreshold={1} luminanceSmoothing={1.2} radius={0.6} />
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
