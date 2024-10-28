import { useRef, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useStore, { useCameraStore } from '../store/store';

const MoonSatelliteCamera = ({ target, size, targetName, parentTransform = null }) => {
    const {
        toggleCameraTransitioning,
        setAutoRotate,
        autoRotate,
        activeCamera,
        toggleSatelliteCamera,
        satelliteCamera,
    } = useCameraStore();
    const { prevSpeed, setSimSpeed } = useStore();
    const { gl, camera: orbitCamera } = useThree();
    const cameraRef = useRef();
    const targetRef = useRef(new THREE.Vector3());

    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const [spherical, setSpherical] = useState(
        new THREE.Spherical(size * 6, Math.PI / 2, 0)
    );

    const lerpFactor = 0.18; // Adjust to control smoothness

    const handleUserInteraction = useCallback(() => {
        setAutoRotate(false);
    }, [setAutoRotate]);

    const handleMouseDown = useCallback((event) => {
        setIsDragging(true);
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback(
        (event) => {
            if (isDragging) {
                handleUserInteraction();
                const dx = event.clientX - mouseDownPosition.x;
                const dy = event.clientY - mouseDownPosition.y;

                const dampingFactor = 0.4;

                setSpherical((prevSpherical) => {
                    const newSpherical = new THREE.Spherical(
                        prevSpherical.radius,
                        prevSpherical.phi - dy * dampingFactor * 0.01,
                        prevSpherical.theta - dx * dampingFactor * 0.01
                    );
                    newSpherical.phi = Math.max(
                        0.1,
                        Math.min(Math.PI - 0.1, newSpherical.phi)
                    );

                    return newSpherical;
                });

                setMouseDownPosition({ x: event.clientX, y: event.clientY });
            }
        },
        [isDragging, mouseDownPosition, handleUserInteraction]
    );

    const handleWheel = useCallback(
        (event) => {
            if (!satelliteCamera) return;

            const zoomSpeed = 0.01;
            const deltaRadius = event.deltaY * zoomSpeed;
            setSpherical((prevSpherical) => {
                const newRadius = THREE.MathUtils.clamp(
                    prevSpherical.radius + deltaRadius,
                    .04,
                    500
                );
                return new THREE.Spherical(
                    newRadius,
                    prevSpherical.phi,
                    prevSpherical.theta
                );
            });
            handleUserInteraction();
        },
        [satelliteCamera, size, handleUserInteraction]
    );

    // Touch events
    const handleStart = useCallback((event) => {
        setIsDragging(true);
        if (event.touches) {
            event.preventDefault();
            setMouseDownPosition({
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
            });
        } else {
            setMouseDownPosition({ x: event.clientX, y: event.clientY });
        }
    }, []);

    const handleMove = useCallback(
        (event) => {
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
                    newSpherical.phi = Math.max(
                        0.1,
                        Math.min(Math.PI - 0.1, newSpherical.phi)
                    );
                    return newSpherical;
                });

                setMouseDownPosition({ x: clientX, y: clientY });
            }
        },
        [isDragging, mouseDownPosition, handleUserInteraction]
    );

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

        canvasElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        return () => {
            canvasElement.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvasElement.removeEventListener('wheel', handleWheel);

            // Touch events
            canvasElement.removeEventListener('touchstart', handleStart);
            canvasElement.removeEventListener('touchmove', handleMove);
            canvasElement.removeEventListener('touchend', handleEnd);

            canvasElement.removeEventListener('contextmenu', (event) => {
                event.preventDefault();
            });
        };
    }, [
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel,
        handleStart,
        handleMove,
        handleEnd,
        gl.domElement,
    ]);

    useEffect(() => {
        return () => {
            if (satelliteCamera) {
                toggleSatelliteCamera(false);
            }
        };
    }, [satelliteCamera, toggleSatelliteCamera]);

    useFrame((state, delta) => {
        if (!cameraRef.current || !target) return;

        // Get the target's world position for distance check
        const targetWorldPos = new THREE.Vector3();
        target.getWorldPosition(targetWorldPos);

        // Check if camera should switch
        if (activeCamera.name === targetName && !satelliteCamera) {
            const distance = orbitCamera.position.distanceTo(targetWorldPos);
            const sizeThreshold = Math.max(size * 4.5, 0.04);

            if (distance <= sizeThreshold) {
                switchCamera(orbitCamera);
            }
            return;
        }

        if (!satelliteCamera) return;

        // Handle auto-rotation
        if (autoRotate) {
            const rotationSpeed = 0.05 * delta;
            setSpherical(prev => new THREE.Spherical(
                prev.radius,
                prev.phi,
                prev.theta + rotationSpeed
            ));
        }

        const localPosition = new THREE.Vector3().setFromSpherical(spherical);

        // Get moon's position in planet's local space
        const moonPosition = target.position;

        // Position camera relative to moon in planet's local space
        cameraRef.current.position.copy(localPosition).add(moonPosition);
        const worldPosition = new THREE.Vector3();
        target.getWorldPosition(worldPosition);
        targetRef.current.copy(moonPosition);
        cameraRef.current.lookAt(worldPosition);

        // Ensure camera's up vector stays aligned with planet's local space
        // cameraRef.current.up.set(0, 1, 0);
        cameraRef.current.updateMatrixWorld();
    });

    const switchCamera = (orbitCamera) => {
        // Get world positions
        const targetWorldPos = new THREE.Vector3();
        target.getWorldPosition(targetWorldPos);
        const orbitCameraWorldPos = orbitCamera.position.clone();

        // Convert to parent space
        const parent = target.parent;
        if (parent) {
            parent.updateWorldMatrix(true, false);
            const parentMatrixInverse = parent.matrixWorld.clone().invert();
            orbitCameraWorldPos.applyMatrix4(parentMatrixInverse);
        }

        // Calculate relative position to moon in parent space
        const moonLocalPos = target.position.clone();
        const relativePosition = orbitCameraWorldPos.sub(moonLocalPos);

        // Convert to spherical coordinates
        const newSpherical = new THREE.Spherical().setFromVector3(relativePosition);
        setSpherical(newSpherical);

        toggleSatelliteCamera(true);
        toggleCameraTransitioning(false);
        setSimSpeed(prevSpeed);
    };

    return (
        <PerspectiveCamera
            ref={cameraRef}
            name={'satellite-camera-' + targetName}
            key={targetName}
            makeDefault={satelliteCamera && activeCamera.name === targetName}
            fov={50}
            near={0.01}
            far={1000000}
        />
    );
};

export default MoonSatelliteCamera;