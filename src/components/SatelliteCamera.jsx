import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useStore, { useCameraStore } from '../store/store';


const SatelliteCamera = ({ target, size, satelliteCamera, toggleSatelliteCamera }) => {
    const { toggleCameraTransitioning } = useCameraStore();
    const { prevSpeed, setSimSpeed } = useStore();

    const { camera, gl } = useThree();
    const cameraRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const [spherical, setSpherical] = useState(new THREE.Spherical());


    const handleMouseDown = useCallback((event) => {
        setIsDragging(true);
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
    }, []);

    const handleMouseMove = useCallback((event) => {
        if (isDragging) {
            const dx = event.clientX - mouseDownPosition.x;
            const dy = event.clientY - mouseDownPosition.y;

            setSpherical(prevSpherical => {
                const newSpherical = new THREE.Spherical(prevSpherical.radius, prevSpherical.phi - dy * 0.003, prevSpherical.theta - dx * 0.003);
                newSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, newSpherical.phi));
                return newSpherical;
            });

            setMouseDownPosition({ x: event.clientX, y: event.clientY });
        }
    }, [isDragging, mouseDownPosition]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);


    const [targetRadius, setTargetRadius] = useState(spherical.radius);
    const handleWheel = useCallback((event) => {
        const currentPosition = new THREE.Vector3().setFromSpherical(spherical);
        const currentDistance = currentPosition.distanceTo(new THREE.Vector3(0, 0, 0));

        // Dynamic zoom sensitivity adjustment
        const baseZoomSensitivity = -0.05;
        const sensitivityAdjustment = Math.pow(currentDistance / 500, size * 0.001); // Root scaling for smoother adjustment at closer distances
        const zoomSensitivity = baseZoomSensitivity * sensitivityAdjustment;
        const deltaY = event.deltaY * zoomSensitivity;
        const normalizedDeltaY = Math.sign(deltaY) * Math.min(Math.abs(deltaY), 10);

        // Set the new target radius
        const newTargetRadius = spherical.radius - normalizedDeltaY;
        setTargetRadius(Math.max(size * 3, Math.min(500, newTargetRadius)));
    }, [spherical]);


    useFrame(() => {
        if (cameraRef.current && target) {
            // Lerp the spherical radius towards the target radius
            const lerpFactor = .5;  // Adjust this factor to change the interpolation speed
            setSpherical(prevSpherical => new THREE.Spherical(
                THREE.MathUtils.lerp(prevSpherical.radius, targetRadius, lerpFactor),
                prevSpherical.phi,
                prevSpherical.theta
            ));

            // Update the camera position based on the new spherical coordinates
            const newPosition = new THREE.Vector3().setFromSpherical(spherical);
            cameraRef.current.position.set(newPosition.x + target.position.x, newPosition.y + target.position.y, newPosition.z + target.position.z);
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
            cameraRef.current.position.set(newPosition.x + target.position.x, newPosition.y + target.position.y, newPosition.z + target.position.z);
            cameraRef.current.lookAt(target.position);
            cameraRef.current.updateMatrixWorld();

            const distance = camera.position.distanceTo(target.position);
            const switchCamera = () => {
                const relativePosition = new THREE.Vector3().subVectors(camera.position, target.position);
                const radius = relativePosition.length();
                const phi = Math.acos(relativePosition.y / radius);
                const theta = Math.atan2(relativePosition.z, relativePosition.x);
                setSpherical(new THREE.Spherical(radius, phi, theta));
                toggleSatelliteCamera(true);
                toggleCameraTransitioning(false);
                setSimSpeed(prevSpeed)
            }

            if (distance <= size * 5) {
                if (!satelliteCamera) {
                    switchCamera();
                }
            }
        }
    });



    return (
        <PerspectiveCamera
            ref={cameraRef}
            name='satellite-camera'
            makeDefault={satelliteCamera}
            fov={50}
            near={size}
            far={1000000}
            enablePan={true}
        />
    );
};



export default SatelliteCamera;
