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
      // Calculate "up" direction as the normal from the planet's surface
      const upDirection = new THREE.Vector3(...normal).normalize();

      // Calculate a realistic height above the surface for the camera position
      const heightAboveSurface = .001; // Simulating average human eye level in meters
      const scaledNormal = upDirection.clone().multiplyScalar(heightAboveSurface);
      const cameraPosition = new THREE.Vector3(...position).add(scaledNormal);

      surfaceCameraRef.current.position.copy(cameraPosition);
      surfaceCameraRef.current.up.copy(upDirection);

      // Look at a point slightly further along the "forward" direction from the camera position
      const lookAtTarget = cameraPosition.clone().add(upDirection.clone().negate()); // Adjust based on desired forward direction
      surfaceCameraRef.current.lookAt(lookAtTarget);

      console.log("Camera Initialized", surfaceCameraRef.current);
    }
  }, [position, normal]);


  // Update the camera rotation based on mouse movement
  const updateCameraRotation = (deltaX, deltaY) => {
    if (!surfaceCameraRef.current) return;

    const rotateSpeed = 0.005; // Adjust based on sensitivity

    // Horizontal rotation (yaw)
    const horizontalRotation = new THREE.Quaternion().setFromAxisAngle(
      surfaceCameraRef.current.up, // Use the camera's "up" for horizontal rotation axis
      deltaX * -rotateSpeed // Inverted to match typical camera control conventions
    );

    // Vertical rotation (pitch) - need to determine the camera's right vector
    const verticalRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(-1, 0, 0), // Rotating around X axis
      deltaY * rotateSpeed
    );

    // Apply rotations
    surfaceCameraRef.current.quaternion.premultiply(horizontalRotation);
    surfaceCameraRef.current.quaternion.multiply(verticalRotation);
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
      near={0.0001}
      far={1000000}
      makeDefault={isSurfaceCameraActive}
      position={position}
    />
  );
};

export default SurfaceCamera;
