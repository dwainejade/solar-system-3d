import { useRef, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useStore, { useCameraStore } from '../store/store';

const SatelliteCamera = ({ target, size, targetName, bodyType = 'planet' }) => {
    const {
        toggleCameraTransitioning,
        setAutoRotate,
        autoRotate,
        toggleSatelliteCamera,
        satelliteCamera,
        activeCamera,
        setSatelliteCameraState,
    } = useCameraStore();
    const { prevSpeed, setSimSpeed } = useStore();
    const { gl, camera: orbitCamera } = useThree();
    const cameraRef = useRef();

    // Use refs instead of state for frequently updating values
    const isDraggingRef = useRef(false);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const sphericalRef = useRef(new THREE.Spherical(size * 5, Math.PI / 2, 0));

    const minZoom = size * 3;
    const maxZoom = 1000;
    const zoomSpeed = 0.1;

    const handleUserInteraction = useCallback(() => {
        setAutoRotate(false);
    }, [setAutoRotate]);

    const handleMouseDown = useCallback((event) => {
        isDraggingRef.current = true;
        mousePositionRef.current = { x: event.clientX, y: event.clientY };
    }, []);

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
    }, []);

    const handleMouseMove = useCallback((event) => {
        if (!isDraggingRef.current) return;

        handleUserInteraction();
        const dx = event.clientX - mousePositionRef.current.x;
        const dy = event.clientY - mousePositionRef.current.y;

        const dampingFactor = 0.45;

        // Update spherical coordinates directly in the ref
        const newPhi = sphericalRef.current.phi - dy * dampingFactor * 0.01;
        const newTheta = sphericalRef.current.theta - dx * dampingFactor * 0.01;

        sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, newPhi));
        sphericalRef.current.theta = newTheta;

        mousePositionRef.current = { x: event.clientX, y: event.clientY };
    }, [handleUserInteraction]);

    const handleWheel = useCallback((event) => {
        event.preventDefault();

        if (!satelliteCamera) return;

        const deltaRadius = event.deltaY * zoomSpeed;

        const newRadius = THREE.MathUtils.clamp(
            sphericalRef.current.radius + deltaRadius,
            minZoom,
            maxZoom
        );

        sphericalRef.current.radius = newRadius;
        handleUserInteraction();
    }, [satelliteCamera, size, bodyType, handleUserInteraction]);

    // Touch events with improved zoom handling
    const handleStart = useCallback((event) => {
        isDraggingRef.current = true;
        if (event.touches) {
            event.preventDefault();
            mousePositionRef.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
            };
        } else {
            mousePositionRef.current = { x: event.clientX, y: event.clientY };
        }
    }, []);

    const handleMove = useCallback((event) => {
        if (!isDraggingRef.current) return;

        handleUserInteraction();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        const dx = clientX - mousePositionRef.current.x;
        const dy = clientY - mousePositionRef.current.y;

        const newPhi = sphericalRef.current.phi - dy * 0.003;
        const newTheta = sphericalRef.current.theta - dx * 0.003;

        sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, newPhi));
        sphericalRef.current.theta = newTheta;

        mousePositionRef.current = { x: clientX, y: clientY };
    }, [handleUserInteraction]);

    useFrame((state, delta) => {
        if (!cameraRef.current || !target) return;

        const targetWorldPos = new THREE.Vector3();
        target.getWorldPosition(targetWorldPos);
        const targetLocalPos = target.position.clone();

        // Auto-rotate using ref
        if (autoRotate) {
            const rotationSpeed = 0.05 * delta;
            sphericalRef.current.theta += rotationSpeed;
        }

        // Calculate camera position using ref
        const localOffset = new THREE.Vector3().setFromSpherical(sphericalRef.current);
        const newPositionLocal = localOffset.add(targetLocalPos);

        cameraRef.current.position.copy(newPositionLocal);
        cameraRef.current.lookAt(targetLocalPos);
        cameraRef.current.updateMatrixWorld();

        // Continuously save camera state
        if (satelliteCamera) {
            const worldPosition = new THREE.Vector3();
            cameraRef.current.getWorldPosition(worldPosition);

            const worldQuaternion = new THREE.Quaternion();
            cameraRef.current.getWorldQuaternion(worldQuaternion);
            const worldRotation = new THREE.Euler().setFromQuaternion(worldQuaternion);

            setSatelliteCameraState(worldPosition, worldRotation, targetWorldPos);
        }

        // Check for camera switch with improved threshold
        if (activeCamera.name === targetName && !satelliteCamera) {
            const distance = orbitCamera.position.distanceTo(targetWorldPos);
            const sizeThreshold = Math.max(size * 5, 0.1);
            if (distance <= sizeThreshold) {
                switchToSatelliteCamera(orbitCamera, targetWorldPos);
            }
        }
    });

    const switchToSatelliteCamera = useCallback((orbitCamera, targetWorldPos) => {
        const orbitCameraPosition = orbitCamera.position.clone();
        const planetMatrix = target.parent.matrixWorld.clone();
        const planetMatrixInverse = planetMatrix.invert();
        const orbitCameraLocal = orbitCameraPosition.applyMatrix4(planetMatrixInverse);

        const targetLocalPos = target.position.clone();
        const relativePosition = orbitCameraLocal.sub(targetLocalPos);

        // Update spherical ref directly
        sphericalRef.current.setFromVector3(relativePosition);

        sphericalRef.current.radius = THREE.MathUtils.clamp(
            sphericalRef.current.radius,
            minZoom,
            maxZoom
        );

        cameraRef.current.position.copy(orbitCameraLocal);
        cameraRef.current.lookAt(targetLocalPos);

        toggleSatelliteCamera(true);
        toggleCameraTransitioning(false);
        setSimSpeed(prevSpeed);
    }, [target, bodyType, size, toggleSatelliteCamera, toggleCameraTransitioning, setSimSpeed, prevSpeed]);

    useEffect(() => {
        const canvasElement = gl.domElement;

        canvasElement.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvasElement.addEventListener('wheel', handleWheel);
        canvasElement.addEventListener('touchstart', handleStart);
        canvasElement.addEventListener('touchmove', handleMove);
        canvasElement.addEventListener('touchend', handleMouseUp);
        canvasElement.addEventListener('contextmenu', (e) => e.preventDefault());

        return () => {
            canvasElement.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvasElement.removeEventListener('wheel', handleWheel);
            canvasElement.removeEventListener('touchstart', handleStart);
            canvasElement.removeEventListener('touchmove', handleMove);
            canvasElement.removeEventListener('touchend', handleMouseUp);
            canvasElement.removeEventListener('contextmenu', (e) => e.preventDefault());

            if (satelliteCamera) {
                toggleSatelliteCamera(false);
            }
        };
    }, [
        handleMouseDown, handleMouseMove, handleMouseUp,
        handleWheel, handleStart, handleMove,
        gl.domElement, satelliteCamera, toggleSatelliteCamera
    ]);

    return (
        <PerspectiveCamera
            ref={cameraRef}
            name={'planet-satellite-camera-' + targetName}
            key={targetName}
            makeDefault={satelliteCamera}
            fov={50}
            near={0.0001}
            far={1200000}
        />
    );
};

export default SatelliteCamera;