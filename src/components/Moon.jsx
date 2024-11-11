import React, { useRef, forwardRef, useCallback, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import { Vector3 } from "three";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCameraMoon";

const Moon = forwardRef(({ moonData, planetPosition, parentName }, ref) => {
  const {
    name,
    orbitalRadius,
    radius,
    color,
    orbitalPeriod,
    orbitalInclination,
    eccentricity
  } = moonData;

  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/2k_moon.jpg') : null;

  const localRef = ref || useRef();
  const localAngleRef = useRef(Math.random() * 2 * Math.PI);
  const meshRef = useRef();

  const scaledValues = useMemo(() => ({
    radius: radius * moonSizeScaleFactor,
    orbitalRadius: orbitalRadius * moonDistanceScaleFactor,
    meanMotion: (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60)
  }), [radius, orbitalRadius, orbitalPeriod]);

  const simSpeed = useStore(state => state.simSpeed);
  const toggleDetailsMenu = useStore(state => state.toggleDetailsMenu);
  const selectedMoon = usePlanetStore(state => state.selectedMoon);
  const setSelectedMoon = usePlanetStore(state => state.setSelectedMoon);
  const displayLabels = usePlanetStore(state => state.displayLabels);
  const orbitPaths = usePlanetStore(state => state.orbitPaths);
  const updateMoonPosition = usePlanetStore(state => state.updateMoonPosition);
  const updateMoonWorldPosition = usePlanetStore(state => state.updateMoonWorldPosition);
  const activeCamera = useCameraStore(state => state.activeCamera);
  const switchToMoonCamera = useCameraStore(state => state.switchToMoonCamera);

  const isMoonSelected = selectedMoon?.name === name;

  const geometry = useMemo(() => new THREE.SphereGeometry(
    scaledValues.radius,
    isMoonSelected ? 32 : 14,
    isMoonSelected ? 16 : 12
  ), [scaledValues.radius, isMoonSelected]);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    metalness: 0.5,
    roughness: 0.8,
    map: moonTexture || null,
    color: !moonTexture ? color : null
  }), [moonTexture, color]);

  const handleClick = useCallback(e => {
    e.stopPropagation();
    if (!isMoonSelected) {
      toggleDetailsMenu(true);
      setSelectedMoon(moonData);
      switchToMoonCamera(parentName, name);
    }
  }, [isMoonSelected, moonData, parentName, name]);

  useFrame((state, delta) => {
    if (!localRef.current) return;

    const adjustedDelta = delta * simSpeed;
    localAngleRef.current -= scaledValues.meanMotion * adjustedDelta;

    let E = localAngleRef.current;
    for (let i = 0; i < 10; i++) {
      const deltaE = (E - eccentricity * Math.sin(E) - localAngleRef.current) /
        (1 - eccentricity * Math.cos(E));
      E -= deltaE;
      if (Math.abs(deltaE) < 1e-6) break;
    }

    const trueAnomaly = 2 * Math.atan(
      Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(E / 2)
    );

    const r = (scaledValues.orbitalRadius * (1 - eccentricity * eccentricity)) /
      (1 + eccentricity * Math.cos(trueAnomaly));

    const x = r * Math.cos(-trueAnomaly);
    const baseZ = r * Math.sin(-trueAnomaly);
    const inclination = orbitalInclination * (Math.PI / 180);
    const y = Math.sin(inclination) * baseZ;
    const z = Math.cos(inclination) * baseZ;

    localRef.current.position.set(x, y, z);

    if (isMoonSelected || name === activeCamera?.name) {
      const worldPos = localRef.current.getWorldPosition(new Vector3());
      updateMoonPosition(name, { x: worldPos.x, y: worldPos.y, z: worldPos.z });
      updateMoonWorldPosition(name, { x: worldPos.x, y: worldPos.y, z: worldPos.z });
    }

    if (name === 'Moon' && planetPosition) {
      localRef.current.lookAt(new Vector3(...planetPosition));
    }
  });

  return (
    <>
      {activeCamera?.name === name && localRef.current && (
        <SatelliteCamera
          target={localRef.current}
          targetName={name}
          size={scaledValues.radius}
        />
      )}

      <group ref={localRef}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
        >
          <primitive object={geometry} />
          <primitive object={material} />
        </mesh>

        {(displayLabels || isMoonSelected) && (
          <Html
            position={[0, scaledValues.radius * 1.2, 0]}
            center
            zIndexRange={[100, 0]}
            occlude={simSpeed < 20000}
            style={isMoonSelected ? { pointerEvents: 'none' } : {}}
          >
            <span
              className="planet-label"
              onClick={handleClick}
              style={{
                color: color,
                fontSize: isMoonSelected ? '14px' : '12px',
                cursor: 'pointer',
              }}
            >{name}</span>
          </Html>
        )}
      </group>

      {orbitPaths && (
        <OrbitPath
          origin={[0, 0, 0]}
          radius={scaledValues.orbitalRadius}
          eccentricity={eccentricity}
          orbitalInclination={orbitalInclination}
          color={color}
          name={`${name}-orbit-path`}
          hiRes={isMoonSelected}
          lineType="solid"
          lineWidth={isMoonSelected ? 1 : 0.4}
          position={localRef.current?.position}
        />
      )}
    </>
  );
});

export default React.memo(Moon);