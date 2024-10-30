import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DebrisField = ({ count, planetRadius, debrisFieldRange, planetPosition }) => {
  const meshRef = useRef();

  // Calculate positions within a ring around the planet
  const positions = useMemo(() => {
    const positions = [];
    const minRange = planetRadius + 1; // Start just outside the planet's radius
    const maxRange = planetRadius + debrisFieldRange;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = minRange + Math.random() * (maxRange - minRange);
      const x = distance * Math.cos(angle);
      const y = distance * Math.sin(angle);
      const z = (Math.random() - 0.5) * 2; // Small variation in Z-axis for depth

      positions.push([x, y, z]);
    }
    return positions;
  }, [count, planetRadius, debrisFieldRange]);

  useFrame(() => {
    positions.forEach((position, i) => {
      const matrix = new THREE.Matrix4().setPosition(
        position[0] + planetPosition[0],
        position[1] + planetPosition[1],
        position[2] + planetPosition[2]
      );
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color='white' />
    </instancedMesh>
  );
};

export default DebrisField;
