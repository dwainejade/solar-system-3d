import React, { useRef, forwardRef, useCallback, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import { Vector3 } from "three";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { moonDistanceScaleFactor, moonSizeScaleFactor } from "../data/moonsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCameraMoon";
import Labels from "./Labels";

const Moon = forwardRef(({ moonData, planetPosition, parentName, parentMeshRef }, ref) => {
  const {
    name,
    orbitalRadius,
    radius,
    color,
    orbitalPeriod,
    orbitalInclination,
    eccentricity
  } = moonData;

  // Refs instead of state
  const localRef = ref || useRef();
  const localAngleRef = useRef(Math.random() * 2 * Math.PI);
  const meshRef = useRef();
  const worldPositionRef = useRef(new Vector3());
  const moonTexture = name === 'Moon' ? useTexture('../assets/earth/moon/moon.jpg') : null;

  // Pre-calculate values that don't change
  const scaledValues = useMemo(() => ({
    radius: radius * moonSizeScaleFactor,
    orbitalRadius: orbitalRadius * moonDistanceScaleFactor,
    meanMotion: (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60),
    inclination: orbitalInclination * (Math.PI / 180)
  }), [radius, orbitalRadius, orbitalPeriod, orbitalInclination]);

  const {
    isSurfaceCameraActive,
    satelliteCamera,
    activeCamera,
    setAutoRotate,
    autoRotate,
    switchToMoonCamera
  } = useCameraStore()

  const { simSpeed, toggleDetailsMenu } = useStore();
  const {
    selectedMoon,
    setSelectedMoon,
    displayLabels,
    orbitPaths,
    updateMoonPosition,
    updateMoonWorldPosition
  } = usePlanetStore();

  const isMoonSelected = selectedMoon?.name === name;
  const isActiveMoon = name === activeCamera?.name;

  // Memoize geometry and material
  const geometry = useMemo(() => new THREE.SphereGeometry(
    scaledValues.radius,
    isMoonSelected ? 32 : 14,
    isMoonSelected ? 16 : 12
  ), [scaledValues.radius, isMoonSelected]);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    metalness: 0.2,
    roughness: .8,
    map: moonTexture || null,
    color: !moonTexture ? color : null,
    onBeforeCompile: (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #include <map_fragment>
        diffuseColor.rgb *= .7;
        diffuseColor.rgb = pow(diffuseColor.rgb, vec3(1.5));
        `
      );
    }
  }), [moonTexture, color]);

  const handleClick = useCallback(e => {
    e.stopPropagation();
    if (!isMoonSelected) {
      toggleDetailsMenu(true);
      setSelectedMoon(moonData);
      switchToMoonCamera(parentName, name);
    }
  }, [isMoonSelected, moonData, parentName, name]);

  const handleDoubleClick = useCallback(e => {
    e.stopPropagation();
    setAutoRotate(!autoRotate);
  }, [autoRotate, setAutoRotate]);

  // Pre-calculate vectors for performance
  const lookAtVector = useMemo(() => new Vector3(), []);
  const positionVector = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    if (!localRef.current) return;

    const adjustedDelta = delta * simSpeed;
    localAngleRef.current -= scaledValues.meanMotion * adjustedDelta;

    // Kepler's equation solver
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
    const y = Math.sin(scaledValues.inclination) * baseZ;
    const z = Math.cos(scaledValues.inclination) * baseZ;

    positionVector.set(x, y, z);
    localRef.current.position.copy(positionVector);

    if (isMoonSelected || isActiveMoon) {
      localRef.current.getWorldPosition(worldPositionRef.current);
      const pos = worldPositionRef.current;
      updateMoonPosition(name, { x: pos.x, y: pos.y, z: pos.z });
      updateMoonWorldPosition(name, { x: pos.x, y: pos.y, z: pos.z });
    }

    if (name === 'Moon' && planetPosition) {
      lookAtVector.set(...planetPosition);
      localRef.current.lookAt(lookAtVector);
    }
  });

  return (
    <>
      {isActiveMoon && localRef.current && (
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
          // onDoubleClick={handleDoubleClick}
          key={name}
          rotation={name === 'Moon' ? [0, Math.PI * 3.5, 0] : [0, 0, 0]}
        >
          <primitive object={geometry} />
          <primitive object={material} />
        </mesh>

        {(isMoonSelected) ? (
          <Html
            position={[0, scaledValues.radius * 1.2, 0]}
            center
            zIndexRange={[100, 0]}
            occlude={(parentMeshRef && simSpeed < 20000) ? [parentMeshRef] : undefined}
            occludeOptions={{
              threshold: 0.1,
              recursive: false
            }}
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
        )
          :
          <Labels
            text={name}
            size={12}
            position={[0, scaledValues.radius * 1.2, 0]}
            color={color}
            handleClick={handleClick}
            font={'../assets/fonts/Termina_Black.ttf'}
          />
        }
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
          lineWidth={isMoonSelected ? 2 : 1}
          position={localRef.current?.position}
          arcLength={.9}
        />
      )}

    </>
  );
});

export default React.memo(Moon);