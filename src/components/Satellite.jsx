import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Satellite = ({ target, size, satelliteCamera }) => {
    const { gl } = useThree();
    const cameraRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const [spherical, setSpherical] = useState(new THREE.Spherical(size * 4, Math.PI / 2, Math.PI / 2));

    const handleMouseDown = useCallback((event) => {
        setIsDragging(true);
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
    }, []);

    const handleMouseMove = useCallback((event) => {
        if (isDragging) {
            const dx = event.clientX - mouseDownPosition.x;
            const dy = event.clientY - mouseDownPosition.y;

            setSpherical(prevSpherical => {
                const newSpherical = new THREE.Spherical(prevSpherical.radius, prevSpherical.phi - dy * 0.0025, prevSpherical.theta - dx * 0.0025);
                newSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, newSpherical.phi));

                return newSpherical;
            });

            setMouseDownPosition({ x: event.clientX, y: event.clientY });
        }
    }, [isDragging, mouseDownPosition]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const domElement = gl.domElement;

        domElement.addEventListener('mousedown', handleMouseDown);
        domElement.addEventListener('mousemove', handleMouseMove);
        domElement.addEventListener('mouseup', handleMouseUp);

        return () => {
            domElement.removeEventListener('mousedown', handleMouseDown);
            domElement.removeEventListener('mousemove', handleMouseMove);
            domElement.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp, gl.domElement]);

    useFrame(() => {
        if (cameraRef.current && target) {
            const newPosition = new THREE.Vector3().setFromSpherical(spherical);
            cameraRef.current.position.set(newPosition.x + target.position.x, newPosition.y + target.position.y, newPosition.z + target.position.z);
            cameraRef.current.lookAt(target.position);
            cameraRef.current.updateMatrixWorld();
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
