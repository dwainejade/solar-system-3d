import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Satellite = ({ target, size, satelliteCamera, toggleSatelliteCamera }) => {
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

    const handleWheel = useCallback((event) => {
        setSpherical(prevSpherical => {
            const newRadius = prevSpherical.radius + event.deltaY * 0.03;
            return new THREE.Spherical(Math.max(size * 2.5, Math.min(500, newRadius)), prevSpherical.phi, prevSpherical.theta);
        });
    }, [size]);

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
            if (distance < size * 8 && !satelliteCamera) {
                const relativePosition = new THREE.Vector3().subVectors(camera.position, target.position);
                const radius = relativePosition.length();
                const phi = Math.acos(relativePosition.y / radius);
                const theta = Math.atan2(relativePosition.z, relativePosition.x);

                setSpherical(new THREE.Spherical(radius, phi, theta));

                toggleSatelliteCamera(true);
            }
        }
    });

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault={satelliteCamera}
            fov={50}
            near={size}
            far={100000}
        />
    );
};



export default Satellite;
