import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useStore, { useCameraStore } from '../store/store';


const SatelliteCamera = ({ target, size, satelliteCamera, toggleSatelliteCamera, targetName }) => {
    const { toggleCameraTransitioning } = useCameraStore();
    const { prevSpeed, setSimSpeed } = useStore();

    const { camera, gl, scene } = useThree();
    const cameraRef = useRef();
    const transitionCameraRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const [spherical, setSpherical] = useState(new THREE.Spherical());
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionDuration = 1000;

    const [targetRadius, setTargetRadius] = useState(size * 5);
    const lerpFactor = 0.2; // Adjust this value to control the smoothness of the transition

    const handleMouseDown = useCallback((event) => {
        setIsDragging(true);
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
    }, []);

    const handleMouseMove = useCallback(
        (event) => {
            if (isDragging) {
                const dx = event.clientX - mouseDownPosition.x;
                const dy = event.clientY - mouseDownPosition.y;

                setSpherical((prevSpherical) => {
                    const newSpherical = new THREE.Spherical(
                        prevSpherical.radius,
                        prevSpherical.phi - dy * 0.003,
                        prevSpherical.theta - dx * 0.003
                    );
                    newSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, newSpherical.phi));
                    return newSpherical;
                });

                setMouseDownPosition({ x: event.clientX, y: event.clientY });
            }
        },
        [isDragging, mouseDownPosition]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleWheel = useCallback(
        (event) => {
            const currentPosition = new THREE.Vector3().setFromSpherical(spherical);
            const distanceToTarget = currentPosition.distanceTo(target.position);

            // Calculate the zoom factor based on the distance to target
            const zoomFactor = Math.max(0.1, 1 / (distanceToTarget / 500)); // Adjust the scaling factor as needed

            // Calculate the new target radius based on the wheel event and the zoom factor
            const zoomSpeed = -0.2; // Adjust this value to control the zoom speed
            const deltaRadius = event.deltaY * zoomSpeed * zoomFactor;
            const newTargetRadius = Math.max(size * 3, Math.min(500, targetRadius - deltaRadius));

            setTargetRadius(newTargetRadius);
        },
        [spherical, target.position, size, targetRadius]
    );
    console.log(targetName, size, targetRadius);

    useFrame(() => {
        if (cameraRef.current && target) {
            // Lerp the spherical radius towards the target radius
            const newRadius = THREE.MathUtils.lerp(spherical.radius, targetRadius, lerpFactor);
            setSpherical((prevSpherical) => new THREE.Spherical(newRadius, prevSpherical.phi, prevSpherical.theta));

            const newPosition = new THREE.Vector3().setFromSpherical(spherical);
            cameraRef.current.position.set(
                newPosition.x + target.position.x,
                newPosition.y + target.position.y,
                newPosition.z + target.position.z
            );
            cameraRef.current.lookAt(target.position);
        }
    });


    useEffect(() => {
        const canvasElement = gl.domElement;
        const bodyElement = document.body;

        canvasElement.addEventListener('mousedown', handleMouseDown);
        bodyElement.addEventListener('mousemove', handleMouseMove);
        bodyElement.addEventListener('mouseup', handleMouseUp);
        canvasElement.addEventListener('wheel', handleWheel);

        return () => {
            canvasElement.removeEventListener('mousedown', handleMouseDown);
            bodyElement.removeEventListener('mousemove', handleMouseMove);
            bodyElement.removeEventListener('mouseup', handleMouseUp);
            canvasElement.removeEventListener('wheel', handleWheel);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, gl.domElement]);

    useLayoutEffect(() => {
        if (isTransitioning) {
            // Create a new camera for the transition
            const newTransitionCamera = new THREE.PerspectiveCamera();
            newTransitionCamera.position.copy(camera.position);
            newTransitionCamera.quaternion.copy(camera.quaternion);
            newTransitionCamera.fov = camera.fov;
            newTransitionCamera.near = camera.near;
            newTransitionCamera.far = camera.far;
            newTransitionCamera.updateProjectionMatrix();

            // Add the transition camera to the scene
            scene.add(newTransitionCamera);

            // Store the transition camera reference
            transitionCameraRef.current = newTransitionCamera;
        }
    }, [isTransitioning, camera, scene]);

    useEffect(() => {
        return () => {
            if (satelliteCamera) {
                toggleSatelliteCamera(false);
            }
        };
    }, [satelliteCamera, toggleSatelliteCamera]);

    useFrame(() => {
        if (cameraRef.current && target) {
            const newPosition = new THREE.Vector3().setFromSpherical(spherical);
            cameraRef.current.position.set(
                newPosition.x + target.position.x,
                newPosition.y + target.position.y,
                newPosition.z + target.position.z
            );
            cameraRef.current.lookAt(target.position);
            cameraRef.current.updateMatrixWorld();

            const distance = camera.position.distanceTo(target.position);
            const switchCamera = () => {
                const relativePosition = new THREE.Vector3().subVectors(
                    camera.position,
                    target.position
                );
                const radius = size * 6;
                const sunDirection = new THREE.Vector3(0, 0, 0).sub(target.position).applyMatrix4(target.parent.matrixWorld).normalize();
                const cameraDirection = relativePosition.clone().applyMatrix4(target.parent.matrixWorld).normalize();

                // Calculate the desired camera orientation
                const desiredOrientation = cameraDirection.clone().sub(sunDirection).normalize();
                const phi = Math.acos(desiredOrientation.y);
                const theta = Math.atan2(desiredOrientation.z, desiredOrientation.x);

                setSpherical(new THREE.Spherical(radius, phi, theta));
                toggleSatelliteCamera(true);
                toggleCameraTransitioning(false);
                setSimSpeed(prevSpeed);
                setIsTransitioning(true); // Start the camera transition
            };

            if (distance <= size * 6) {
                if (!satelliteCamera) {
                    switchCamera();
                }
            }
        }
        // Handle camera transition
        if (isTransitioning && transitionCameraRef.current) {
            const elapsedTime = Date.now() - startTransitionTime;
            const progress = Math.min(elapsedTime / transitionDuration, 1);

            // Interpolate camera properties
            const targetPosition = cameraRef.current.position;
            const targetQuaternion = cameraRef.current.quaternion;
            const targetFov = cameraRef.current.fov;

            transitionCameraRef.current.position.lerpVectors(camera.position, targetPosition, progress);
            transitionCameraRef.current.quaternion.slerpQuaternions(camera.quaternion, targetQuaternion, progress);
            transitionCameraRef.current.fov = THREE.MathUtils.lerp(camera.fov, targetFov, progress);
            transitionCameraRef.current.updateProjectionMatrix();

            if (progress === 1) {
                // Transition complete, remove the transition camera and reset state
                scene.remove(transitionCameraRef.current);
                transitionCameraRef.current = null;
                setIsTransitioning(false);
            }
        }
    });

    let startTransitionTime = null;
    useEffect(() => {
        if (isTransitioning) {
            startTransitionTime = Date.now();
        }
    }, [isTransitioning]);

    return (
        <PerspectiveCamera
            ref={cameraRef}
            name='satellite-camera'
            makeDefault={satelliteCamera && !isTransitioning}
            fov={50}
            near={0.01}
            far={1000000}
            enablePan={true}
        />
    );
};



export default SatelliteCamera;
