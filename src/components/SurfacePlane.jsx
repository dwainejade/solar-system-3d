import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SurfacePlane = ({ position, normal, surfaceColor }) => {
  const planeRef = useRef();

  useEffect(() => {
    if (planeRef.current && normal) {
      // normals
      const targetNormal = new THREE.Vector3(...normal).normalize();
      const planeNormal = new THREE.Vector3(0, 0, 1);

      // add rotation
      const quaternion = new THREE.Quaternion().setFromUnitVectors(planeNormal, targetNormal);
      planeRef.current.quaternion.copy(quaternion);
      //  add offset to avoid z-fighting
      const offsetDistance = 0.001;
      const offsetPosition = new THREE.Vector3(...position).add(targetNormal.multiplyScalar(offsetDistance));
      planeRef.current.position.copy(offsetPosition);
    }
  }, [position, normal]);

  return (
    <mesh ref={planeRef} position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial side={THREE.DoubleSide} color={surfaceColor} />
    </mesh>
  );
};

export default SurfacePlane;
