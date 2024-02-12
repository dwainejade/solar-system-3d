import React, { useRef, useEffect, useState } from "react";
import { PerspectiveCamera, useHelper, Html } from "@react-three/drei";
import { useCameraStore } from "@/store/store";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const SurfacePlane = ({ position, normal, surfaceColor }) => {
  const { surfacePoint, isSurfaceCameraActive, cameraTarget, setCameraTarget, surfaceNormal, cameraSurfacePoint, cameraSurfaceNormal } = useCameraStore();
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const planeRef = useRef();
  const surfaceCameraRef = useRef();
  useHelper(surfaceCameraRef, THREE.CameraHelper)
  const controlledCameraRef = surfaceCameraRef;


  const labelPositions = useRef({
    North: { x: 0, y: 1, z: 0 },
    South: { x: 0, y: -1, z: 0 },
    East: { x: 1, y: 0, z: 0 },
    West: { x: -1, y: 0, z: 0 }
  });

  useEffect(() => {
    if (planeRef.current && normal) {
      // normals
      const targetNormal = new THREE.Vector3(...normal).normalize();
      const planeNormal = new THREE.Vector3(0, 0, 1);

      // add rotation
      const quaternion = new THREE.Quaternion().setFromUnitVectors(planeNormal, targetNormal);
      planeRef.current.quaternion.copy(quaternion);
      //  add offset to avoid z-fighting
      const offsetDistance = 0;
      const offsetPosition = new THREE.Vector3(...position).add(targetNormal.multiplyScalar(offsetDistance));
      planeRef.current.position.copy(offsetPosition);
      surfaceCameraRef.current.rotation.set(-Math.PI / 2, 0, 0);
      console.log(targetNormal)
    }
  }, [position, normal, isSurfaceCameraActive]);


  // Mouse event handlers
  const onMouseDown = (event) => {
    event.stopPropagation()
    if (!isSurfaceCameraActive) return
    setIsDragging(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const onMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - lastMousePosition.x;
      const deltaY = event.clientY - lastMousePosition.y;

      // Update the last mouse position
      setLastMousePosition({ x: event.clientX, y: event.clientY });

      // Convert deltas to radians and adjust camera rotation
      const rotationSpeed = 0.005; // Adjust rotation speed as needed
      controlledCameraRef.current.rotation.y -= deltaX * rotationSpeed;
      controlledCameraRef.current.rotation.x -= deltaY * rotationSpeed;

      // Clamp the x rotation to prevent flipping
      controlledCameraRef.current.rotation.x = Math.max(
        Math.min(controlledCameraRef.current.rotation.x, Math.PI / 2),
        -Math.PI / 2
      );
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, lastMousePosition, isSurfaceCameraActive]);


  return (
    <>
      {/* First Person Camera */}
      <PerspectiveCamera
        ref={surfaceCameraRef}
        name="surface-cam"
        fov={24}
        near={0.01}
        far={10000}
        position={position}
        makeDefault={isSurfaceCameraActive}
      />
      <group>
        <mesh ref={planeRef} position={position}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={surfaceColor} side={THREE.DoubleSide} />
        </mesh>
      </group>

    </>
  );
};

export default SurfacePlane
