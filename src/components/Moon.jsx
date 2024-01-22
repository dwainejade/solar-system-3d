import React, { useRef, forwardRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import useStore from "../store/store";
import { moonSizeScaleFactor, moonDistanceScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";

const Moon = forwardRef(({ bodyData, parentPosition }, ref) => {
  const { simSpeed, orbitPaths } = useStore();

  const localRef = ref || useRef();
  const localAngleRef = useRef(0);

  const { name, orbitalRadius, radius, color, orbitalPeriod } = bodyData;

  // Apply moon-specific scaling factors
  const scaledRadius = radius * moonSizeScaleFactor;
  const scaledOrbitalRadius = orbitalRadius * moonDistanceScaleFactor;

  // Use useMemo to calculate and store the orbital speed
  const orbitalSpeed = useMemo(() => {
    const out = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60);
    console.log({ name, out });
    return out;
  }, [orbitalPeriod]);

  useFrame(() => {
    localAngleRef.current += orbitalSpeed * simSpeed;

    const moonX = scaledOrbitalRadius;
    const moonY = 0;
    const moonZ = scaledOrbitalRadius;

    if (localRef.current) {
      localRef.current.position.set(moonX, moonY, moonZ);
    }
  });

  const handleClick = e => {
    e.stopPropagation();
    console.log(`${name} clicked`);
  };

  return (
    <group>
      <mesh ref={localRef} onClick={handleClick}>
        <sphereGeometry args={[scaledRadius, 32, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* <Html as='div' center zIndexRange={[100, 0]} onClick={() => console.log(`${name} clicked point`)}>
        <div className='planet-point' style={{ backgroundColor: "red" }} />
      </Html> */}
      {localRef.current && orbitPaths && (
        <OrbitPath
          origin={parentPosition}
          radius={scaledOrbitalRadius}
          // orbitalInclination={orbitalInclination}
          color={color}
          name={name}
        />
      )}
    </group>
  );
});

export default Moon;
