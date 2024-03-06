"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload, Stats, useProgress } from "@react-three/drei";
import useStore, { useCameraStore } from "../../store/store";
import Menu from "../UI/Menu";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import ContextMenu from "../ContextMenu";
import "../../styles.css";

const SharedCanvas = ({ children }) => {
  const { fullscreen } = useStore();
  const { setTriggerReset } = useCameraStore()

  const { errors, loaded } = useProgress();
  const totalAssets = 12;
  const progressPercentage = (loaded / totalAssets) * 100;
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleAuxClick = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const hideContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const resetCamera = () => {
    setTriggerReset(true)
    hideContextMenu();
  };

  // Listen for clicks to hide the context menu if visible
  useEffect(() => {
    document.addEventListener('click', hideContextMenu);
    return () => {
      document.removeEventListener('click', hideContextMenu);
    };
  }, []);

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

  return (
    <div className={`Main ${fullscreen ? "fullscreen" : "minimized"}`}>
      <Canvas id='Canvas' dpr={[1, 2]} camera={{ fov: 50, position: [5000, 5000, 5000], near: 0.01, far: 1000000 }}
        onAuxClick={handleAuxClick}
      >
        <Suspense fallback={<Loader />}>
          {/* <Stats /> */}
          {/* <ambientLight intensity={0.04} /> */}
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} />
          <EffectComposer>
            <Bloom mipmapBlur intensity={.6} luminanceThreshold={1} luminanceSmoothing={1.2} radius={.6} />
            <Noise premultiply blendFunction={BlendFunction.ADD} opacity={.85} />
          </EffectComposer>

          {children}
        </Suspense>
        <Preload all />
      </Canvas>
      {/* {contextMenu.visible && <ContextMenu x={contextMenu.x} y={contextMenu.y} onResetView={resetCamera} />} */}
      <Menu />
    </div>
  );
};

export default SharedCanvas;
