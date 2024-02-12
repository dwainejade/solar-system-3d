import React, { useRef, useEffect, useState } from "react";
import { PerspectiveCamera, useHelper, OrbitControls } from "@react-three/drei";
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
    if (planeRef.current && normal && surfaceCameraRef.current) {
      // Calculate the plane's orientation based on the provided normal
      const targetNormal = new THREE.Vector3(...normal);
      const planeNormal = new THREE.Vector3(0, 0, 1);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(planeNormal, targetNormal);
      planeRef.current.quaternion.copy(quaternion);

      const cameraOffset = 0.001; // Distance above the surface o avoid clipping
      const offsetPosition = new THREE.Vector3(...position).add(targetNormal.multiplyScalar(cameraOffset));
      surfaceCameraRef.current.position.copy(offsetPosition);

      // Align the camera to face the same direction as the plane's +Y axis
      surfaceCameraRef.current.quaternion.copy(planeRef.current.quaternion);

      // to align the camera's -Z with the plane's +Y
      const additionalRotation = new THREE.Euler(Math.PI / 2, 0, 0, 'XYZ');
      const totalQuaternion = new THREE.Quaternion().setFromEuler(additionalRotation);
      surfaceCameraRef.current.quaternion.multiply(totalQuaternion);
    }
  }, [position, normal, isSurfaceCameraActive]);


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
      console.log(event.clientX, event.clientY)
      // Update the last mouse position
      setLastMousePosition({ x: event.clientX, y: event.clientY });

      const rotationSpeed = 0.002; // Adjust rotation speed as needed
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
        fov={34}
        near={0.001}
        far={100000}
        position={position}
        makeDefault={isSurfaceCameraActive}
      />
      <group>
        <mesh ref={planeRef} position={position}>
          <planeGeometry args={isSurfaceCameraActive ? [0, 0] : [.01, .01]} />
          <meshBasicMaterial color={surfaceColor} side={THREE.DoubleSide} />
        </mesh>
      </group>

    </>
  );
};

export default SurfacePlane
