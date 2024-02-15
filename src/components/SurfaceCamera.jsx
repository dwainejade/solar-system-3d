import React, { useRef, useEffect, useState } from "react";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useCameraStore } from "../store/store";

const SurfaceCamera = ({ position, normal, color }) => {
  const { isSurfaceCameraActive } = useCameraStore()
  const surfaceCameraRef = useRef();
  useHelper(surfaceCameraRef, THREE.CameraHelper);

  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  // Initialize the camera based on the normal and position
  useEffect(() => {
    if (position && normal && surfaceCameraRef.current) {
      // Align the camera to the provided normal
      const targetNormal = new THREE.Vector3(...normal);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), targetNormal.normalize());

      // Offset the camera position
      const offsetPosition = new THREE.Vector3(...position).add(targetNormal.multiplyScalar(0.01));
      const upDirection = offsetPosition.clone().normalize();
      surfaceCameraRef.current.up.copy(upDirection);
      surfaceCameraRef.current.position.copy(offsetPosition);
      surfaceCameraRef.current.quaternion.copy(quaternion);
      surfaceCameraRef.current.lookAt(0, 0, 0)
      console.log(surfaceCameraRef.current)
    }
  }, [position, normal]);

  // Update the camera rotation based on mouse movement
  const updateCameraRotation = (deltaX, deltaY) => {
    if (!surfaceCameraRef.current) return;

    // Convert the deltas into a rotational movement
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');

    euler.setFromQuaternion(surfaceCameraRef.current.quaternion);

    euler.y -= deltaX * 0.002;
    euler.x -= deltaY * 0.002;

    // Clamp the x rotation to prevent flipping
    euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
    surfaceCameraRef.current.quaternion.setFromEuler(euler);
  };

  // Mouse event handlers
  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
      if (isDragging && isSurfaceCameraActive) {
        const deltaX = event.clientX - lastMousePosition.x;
        const deltaY = event.clientY - lastMousePosition.y;

        updateCameraRotation(deltaX, deltaY);

        setLastMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePosition]);

  return (
    <PerspectiveCamera
      ref={surfaceCameraRef}
      fov={30}
      near={0.001}
      far={1000000}
      makeDefault={isSurfaceCameraActive}
      position={position}
    />
  );
};

export default SurfaceCamera;
