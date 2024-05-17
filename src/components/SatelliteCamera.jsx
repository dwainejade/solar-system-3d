import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useStore, { useCameraStore } from '../store/store';


const SatelliteCamera = ({ target, size, satelliteCamera, toggleSatelliteCamera, targetName }) => {
    const { toggleCameraTransitioning, setAutoRotate, autoRotate, toggleOrbitCamera, setSatelliteCameraState } = useCameraStore();
    const { prevSpeed, setSimSpeed } = useStore();

    const { gl } = useThree();
    const cameraRef = useRef();

    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const [spherical, setSpherical] = useState(new THREE.Spherical());

    const [targetRadius, setTargetRadius] = useState(size * 5.5);
    const lerpFactor = 0.18; // Adjust this value to control the smoothness of the transition

    const handleUserInteraction = useCallback(() => {
        setAutoRotate(false)
    }, []);

    const handleMouseDown = useCallback((event) => {
        setIsDragging(true);
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setSpherical((prevSpherical) => new THREE.Spherical().copy(prevSpherical));
    }, []);

    const handleMouseMove = useCallback(
        (event) => {
            if (isDragging) {
                handleUserInteraction();
                const dx = event.clientX - mouseDownPosition.x;
                const dy = event.clientY - mouseDownPosition.y;

                const dampingFactor = .4; // Adjust this value to control damping (0 for no damping, 1 for no movement)

                setSpherical((prevSpherical) => {
                    const newSpherical = new THREE.Spherical(
                        prevSpherical.radius,
                        prevSpherical.phi - dy * dampingFactor * 0.01,
                        prevSpherical.theta - dx * dampingFactor * 0.01
                    );
                    newSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, newSpherical.phi));

                    return newSpherical;
                });

                setMouseDownPosition({ x: event.clientX, y: event.clientY });
            }
        },
        [isDragging, mouseDownPosition]
    );


    const handleWheel = useCallback(
        (event) => {
            if (!satelliteCamera) return;

            const currentPosition = new THREE.Vector3().setFromSpherical(spherical);
            const distanceToTarget = currentPosition.distanceTo(target.position);

            // Calculate the zoom factor based on the distance to target
            const zoomFactor = Math.max(0.1, 1 / (distanceToTarget / 500)); // Adjust the scaling factor as needed

            // Calculate the new target radius based on the wheel event and the zoom factor
            const zoomSpeed = -0.2; // Adjust this value to control the zoom speed
            const deltaRadius = event.deltaY * zoomSpeed * zoomFactor;
            const newTargetRadius = Math.max(size * 2.5, Math.min(500, targetRadius - deltaRadius));

            setTargetRadius(newTargetRadius);
            handleUserInteraction();
        },
        [spherical, target.position, size, targetRadius]
    );

    // Handle touch events
    const handleStart = useCallback((event) => {
        setIsDragging(true);
        // Check if it's a touch event and prevent default behavior to avoid scrolling and zooming interfaces
        if (event.touches) {
            event.preventDefault();
            setMouseDownPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
        } else {
            setMouseDownPosition({ x: event.clientX, y: event.clientY });
        }
    }, []);
    const handleMove = useCallback((event) => {
        if (isDragging) {
            handleUserInteraction();
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
            const dx = clientX - mouseDownPosition.x;
            const dy = clientY - mouseDownPosition.y;

            setSpherical((prevSpherical) => {
                const newSpherical = new THREE.Spherical(
                    prevSpherical.radius,
                    prevSpherical.phi - dy * 0.003,
                    prevSpherical.theta - dx * 0.003
                );
                newSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, newSpherical.phi));
                return newSpherical;
            });

            setMouseDownPosition({ x: clientX, y: clientY });
        }
    }, [isDragging, mouseDownPosition]);
    const handleEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const canvasElement = gl.domElement;

        canvasElement.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvasElement.addEventListener('wheel', handleWheel, { passive: true });
        // Touch events
        canvasElement.addEventListener('touchstart', handleStart);
        canvasElement.addEventListener('touchmove', handleMove);
        canvasElement.addEventListener('touchend', handleEnd);

        return () => {
            canvasElement.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvasElement.removeEventListener('wheel', handleWheel);
            // Touch events
            canvasElement.removeEventListener('touchstart', handleStart);
            canvasElement.removeEventListener('touchmove', handleMove);
            canvasElement.removeEventListener('touchend', handleEnd);

        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, gl.domElement]);


    useEffect(() => {
        return () => {
            if (satelliteCamera) {
                toggleSatelliteCamera(false);
                toggleOrbitCamera(true);
            }
        };
    }, [satelliteCamera]);


    // Lerp the spherical radius towards the target radius
    useFrame((state, delta) => {
        if (cameraRef.current && target) {
            const newRadius = THREE.MathUtils.lerp(spherical.radius, targetRadius, lerpFactor);
            setSpherical((prevSpherical) => new THREE.Spherical(newRadius, prevSpherical.phi, prevSpherical.theta));

            // setSatelliteCameraState({
            //     position: cameraRef.current.position.clone(),
            //     rotation: cameraRef.current.rotation.clone(),
            //     targetPosition: target.position.clone(),
            // });

        }
        if (autoRotate && cameraRef.current && target) {
            const rotationSpeed = 0.05 * delta;  // Slow rotation speed
            spherical.theta += rotationSpeed;
        }
    });

    useFrame(({ camera }) => {
        if (cameraRef.current && target) {
            const newPosition = new THREE.Vector3().setFromSpherical(spherical);
            cameraRef.current.position.set(
                newPosition.x + target.position.x,
                newPosition.y + target.position.y,
                newPosition.z + target.position.z
            );
            cameraRef.current.lookAt(target.position); // need world position if moon
            cameraRef.current.updateMatrixWorld();

            const distance = camera.position.distanceTo(target.position); // need world position if moon
            if (distance <= size * 5.4) {
                if (!satelliteCamera) {
                    switchCamera(camera);
                }
            }
        }
    });

    function switchCamera(camera) {
        const relativePosition = new THREE.Vector3().subVectors(
            camera.position,
            target.position
        );
        const sphericalPosition = convertVectorToSpherical(relativePosition)
        cameraRef.current.updateProjectionMatrix();
        setSpherical(sphericalPosition);
        toggleSatelliteCamera(true);
        toggleCameraTransitioning(false);
        setSimSpeed(prevSpeed);
    };

    function convertVectorToSpherical(vector) {
        const spherical = new THREE.Spherical();
        spherical.setFromVector3(vector);
        return spherical;
    }


    return (
        <PerspectiveCamera
            ref={cameraRef}
            name={'satellite-camera-' + targetName}
            key={targetName}
            makeDefault={satelliteCamera}
            fov={50}
            near={0.01}
            far={1000000}
            enablePan={true}
        />
    );
};

export default SatelliteCamera;
