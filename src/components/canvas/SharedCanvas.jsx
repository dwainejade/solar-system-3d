"use client";

import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, PerformanceMonitor, useProgress, Stats } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import useStore from "../../store/store";
import Menu from "../UI/Menu";
import ExperimentsMenu from "../UI/experiments/ExperimentsMenu";
import "../../styles.css";
import Link from "next/link";

const HomeButton = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: 1000,
      background: '#f19a00',
      padding: '5px 10px',
      borderRadius: '4px',
    }}>
      <Link href="/" style={{ color: '#463a39', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
    </div>
  );
};

// Performance control component
const PerformanceControls = () => {
  const [quality, setQuality] = useState(() => {
    // Try to read from localStorage or default to 'medium'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appQuality') || 'medium';
    }
    return 'medium';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appQuality', quality);
    }
  }, [quality]);

  const handleChange = (e) => {
    setQuality(e.target.value);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      background: 'rgba(0,0,0,0.5)',
      padding: '5px',
      borderRadius: '4px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <label htmlFor="quality" style={{ fontSize: '12px' }}>Quality:</label>
      <select
        id="quality"
        value={quality}
        onChange={handleChange}
        style={{
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          padding: '3px'
        }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

const SharedCanvas = ({ children, mode = 'main' }) => {
  const fullscreen = useStore((state) => state.fullscreen);
  const isLoading = useStore((state) => state.isLoading);
  const toggleLoading = useStore((state) => state.toggleLoading);

  const { errors, loaded } = useProgress();
  const total = 17;

  // Quality state for performance control
  const [quality, setQuality] = useState('medium');

  // Derive DPR and other performance settings from quality
  const performanceSettings = useMemo(() => {
    // Check if running in browser
    if (typeof window === 'undefined') {
      return {
        dpr: [1, 2],
        frameloop: 'always',
        gl: {
          antialias: true,
          logarithmicDepthBuffer: true,
          powerPreference: 'high-performance'
        },
        shadows: true,
        showBloom: true
      };
    }

    // Read from localStorage
    const savedQuality = localStorage.getItem('appQuality') || 'medium';
    setQuality(savedQuality);

    switch (savedQuality) {
      case 'low':
        return {
          dpr: 1,
          frameloop: 'demand',
          gl: {
            antialias: false,
            logarithmicDepthBuffer: false,
            powerPreference: 'low-power'
          },
          shadows: false,
          showBloom: false
        };
      case 'medium':
        return {
          dpr: 1.5,
          frameloop: 'always',
          gl: {
            antialias: true,
            logarithmicDepthBuffer: true,
            powerPreference: 'default'
          },
          shadows: false,
          showBloom: true
        };
      case 'high':
      default:
        return {
          dpr: [1, 2],
          frameloop: 'always',
          gl: {
            antialias: true,
            logarithmicDepthBuffer: true,
            powerPreference: 'high-performance'
          },
          shadows: true,
          showBloom: true
        };
    }
  }, []);

  // Memoize progress calculation to prevent unnecessary recalculations
  const progressPercentage = useMemo(() =>
    (loaded / total) * 100
    , [loaded]);

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
      {/* <HomeButton /> */}
      <PerformanceControls />

      <Canvas
        id='Canvas'
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        dpr={performanceSettings.dpr}
        frameloop={performanceSettings.frameloop}
        gl={{
          ...performanceSettings.gl,
          // Adding pixelRatio handling for better performance
          pixelRatio: typeof window !== 'undefined' ?
            Math.min(window.devicePixelRatio, quality === 'low' ? 1 : quality === 'medium' ? 1.5 : 2) : 1
        }}
        camera={{
          fov: 50,
          position: [20000, 20000, 20000],
          near: 0.001,
          far: 2000000
        }}
        performance={{ min: 0.5 }}
      >
        <Stats />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.02} />
          <pointLight color='#f6f3ea' intensity={2} position={[0, 0, 0]} />
          {children}

          {/* Conditional rendering based on quality settings */}
          {performanceSettings.showBloom && (
            <EffectComposer multisampling={quality === 'high' ? 4 : 0}>
              <Bloom
                intensity={0.5}
                luminanceThreshold={1.0}
                luminanceSmoothing={0.5}
                mipmapBlur={quality !== 'low'}
                radius={quality === 'low' ? 0.4 : 0.8}
              />
            </EffectComposer>
          )}
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