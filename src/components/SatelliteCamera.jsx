import { useRef, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useStore, { useCameraStore } from '../store/store';

const SatelliteCamera = ({ target, size, targetName, parentTransform = null }) => {
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
                    size * 2.5,
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

        // Get the target's world position
        const targetWorldPos = new THREE.Vector3();
        target.getWorldPosition(targetWorldPos);

        // Calculate target position in parent's space
        const targetLocalPos = target.position.clone();

        // Auto-rotate if enabled
        if (autoRotate) {
            const rotationSpeed = 0.05 * delta;
            setSpherical((prevSpherical) => {
                return new THREE.Spherical(
                    prevSpherical.radius,
                    prevSpherical.phi,
                    prevSpherical.theta + rotationSpeed
                );
            });
        }

        // Calculate new camera position relative to moon in parent space
        const localOffset = new THREE.Vector3().setFromSpherical(spherical);
        const newPositionLocal = localOffset.add(targetLocalPos);

        // Set camera position
        cameraRef.current.position.copy(newPositionLocal);
        cameraRef.current.lookAt(targetLocalPos);
        cameraRef.current.updateMatrixWorld();

        // Check if camera should switch
        if (activeCamera.name === targetName && !satelliteCamera) {
            const distance = orbitCamera.position.distanceTo(targetWorldPos);
            const sizeThreshold = Math.max(size * 4.3, 0.01);
            if (distance <= sizeThreshold) {
                switchCamera(orbitCamera, targetWorldPos);
            }
        }
    });

    const switchCamera = (orbitCamera, targetWorldPos) => {
        // Get the orbit camera's world position
        const orbitCameraPosition = orbitCamera.position.clone();

        // Convert to local space relative to the planet
        const planetMatrix = target.parent.matrixWorld.clone();
        const planetMatrixInverse = planetMatrix.invert();
        const orbitCameraLocal = orbitCameraPosition.applyMatrix4(planetMatrixInverse);

        // Calculate relative position to moon in parent's space
        const moonLocalPos = target.position.clone();
        const relativePosition = orbitCameraLocal.sub(moonLocalPos);

        // Convert to spherical coordinates
        const sphericalPosition = new THREE.Spherical().setFromVector3(relativePosition);
        setSpherical(sphericalPosition);

        // Set initial camera position
        cameraRef.current.position.copy(orbitCameraLocal);
        cameraRef.current.lookAt(moonLocalPos);

        // Activate the satellite camera
        toggleSatelliteCamera(true);
        toggleCameraTransitioning(false);
        setSimSpeed(prevSpeed);
    };
    // console.log(cameraRef.current)
    return (
        <PerspectiveCamera
            ref={cameraRef}
            name={'satellite-camera-' + targetName}
            key={targetName}
            makeDefault={satelliteCamera}
            fov={50}
            near={0.01}
            far={1000000}
        />
    );
};

export default SatelliteCamera;