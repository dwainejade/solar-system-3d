import React, { useRef, useEffect, useState, useCallback } from "react";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useCameraStore } from "../store/store";
import { useFrame, useThree } from "@react-three/fiber";

const SurfaceCamera = ({ position, normal, color, radius, planetRef }) => {
  const { isSurfaceCameraActive } = useCameraStore()
  const pointerRef = useRef();
  const surfaceCameraRef = useRef();
  useHelper(surfaceCameraRef, THREE.CameraHelper);

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(isDragging);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const lastMousePositionRef = useRef(lastMousePosition);

  const handleMouseDown = useCallback((event) => {
    setIsDragging(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  // Update the camera rotation based on mouse movement
  const updateCameraRotation = (deltaX, deltaY) => {
    if (!surfaceCameraRef.current) return;
    const rotateSpeed = 0.001; // Adjust based on sensitivity
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
  const handleMouseMove = useCallback((event) => {
    if (isDraggingRef.current && isSurfaceCameraActive) {
      const deltaX = event.clientX - lastMousePositionRef.current.x;
      const deltaY = event.clientY - lastMousePositionRef.current.y;

      updateCameraRotation(deltaX, deltaY);
      setLastMousePosition({ x: event.clientX, y: event.clientY });
    }
  }, [isSurfaceCameraActive, updateCameraRotation]);
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);
  useEffect(() => {
    lastMousePositionRef.current = lastMousePosition;
  }, [lastMousePosition]);
  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    // Initialize the camera based on the normal and position
    if (position && normal && surfaceCameraRef.current) {
      const upDirection = new THREE.Vector3(...normal).normalize();
      const heightAboveSurface = 0.005;
      const cameraPosition = new THREE.Vector3(...position).addScaledVector(upDirection, heightAboveSurface);

      surfaceCameraRef.current.position.copy(cameraPosition);
      surfaceCameraRef.current.up.copy(upDirection);
      surfaceCameraRef.current.lookAt(cameraPosition.clone().add(upDirection.clone().negate()));
    }

  }, [position, normal, isSurfaceCameraActive]);
  useEffect(() => {
    if (pointerRef.current && planetRef.current) {
      // Calculate the direction from the cylinder to the planet's center
      // This direction is actually not needed for lookAt, but I'm leaving the calculation
      // here in case you need the direction vector for other purposes.
      const direction = new THREE.Vector3().subVectors(
        planetRef.current.position, // Assuming planetRef is a reference to the planet's mesh/group
        pointerRef.current.position
      ).normalize();

      // Correctly aim the cylinder towards the planet's center
      // pointerRef should look directly at planetRef's position.
      pointerRef.current.lookAt(planetRef.current.position);
      pointerRef.current.rotateX(Math.PI / 2)
    }
  }, [planetRef, pointerRef, position]); // Ensure dependencies are correctly listed

  return (
    <>
      {isSurfaceCameraActive ? (
        <PerspectiveCamera
          ref={surfaceCameraRef}
          fov={30}
          near={0.001}
          far={100000}
          makeDefault={isSurfaceCameraActive}
          position={position}
        />
      ) : (
        <mesh
          ref={pointerRef}
          position={position}
        >
          <cylinderGeometry args={[.005, .005, radius * 2, 8]} />
          <meshBasicMaterial color={[0, 5, 2]} toneMapped={false} />
        </mesh>
      )}
    </>
  );
};

export default SurfaceCamera;
