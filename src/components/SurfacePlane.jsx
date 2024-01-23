import React, { useRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SurfacePlane = forwardRef(({ position, normal = [0, 1, 0] }, planetRef) => {
  const planeRef = useRef();

  useFrame(() => {
    if (planetRef?.current && planeRef?.current && position && normal) {
      const normalVector = new THREE.Vector3(...normal).normalize();
      const positionVector = new THREE.Vector3(...position);

      const adjustedPosition = positionVector.add(planetRef.current.position);
      const adjustedNormal = normalVector.applyQuaternion(planetRef.current.quaternion);

      planeRef.current.position.copy(adjustedPosition);
      const target = adjustedNormal.clone().multiplyScalar(10).add(adjustedPosition);
      planeRef.current.lookAt(target);
    }
  });

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[5, 5, 1, 1]} />
      <meshStandardMaterial color='tan' side={THREE.DoubleSide} />
    </mesh>
  );
});

export default SurfacePlane;
