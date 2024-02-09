import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const SurfacePlane = ({ position, normal, surfaceColor, planetRef }) => {
  const { scene } = useThree();
  const planeRef = useRef();

  useEffect(() => {
    scene.add(planeRef.current);
    return () => scene.remove(planeRef.current);
  }, [scene]);

  useFrame(() => {
    if (planeRef.current && position && normal) {
      const normalVector = new THREE.Vector3(...normal).normalize();
      const positionVector = new THREE.Vector3(...position);
      // Calculate target point for the plane to face towards, based on the normal
      const target = normalVector.clone().multiplyScalar(1).add(positionVector);
      planeRef.current.position.copy(positionVector);
      planeRef.current.lookAt(target);
    }
  });

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[2, 2]} />
      <meshMatcapMaterial side={THREE.DoubleSide} color={surfaceColor} />
    </mesh>
  );
};

export default SurfacePlane;
