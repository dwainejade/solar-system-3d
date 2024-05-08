import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useStore, { useCameraStore } from '../store/store';


const SatelliteCamera = ({ target, size, satelliteCamera, toggleSatelliteCamera, targetName }) => {
    // console.log({ target, size, satelliteCamera, toggleSatelliteCamera, targetName })
    const { toggleCameraTransitioning } = useCameraStore();
    const { prevSpeed, setSimSpeed } = useStore();

    const { camera, gl } = useThree();
    const cameraRef = useRef();

    const [isDragging, setIsDragging] = useState(false);
    const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });
    const [spherical, setSpherical] = useState(new THREE.Spherical());
    const [isTransitioning, setIsTransitioning] = useState(false);

    const [targetRadius, setTargetRadius] = useState(size * 5);
    const lerpFactor = 0.18; // Adjust this value to control the smoothness of the transition

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
            convertVectorToSpherical("camRef", cameraRef.current.position);
            convertVectorToSpherical("target", target.position);
        },
        [spherical, target.position, size, targetRadius]
    );


    useEffect(() => {
        const canvasElement = gl.domElement;

        canvasElement.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvasElement.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            canvasElement.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
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


    // Lerp the spherical radius towards the target radius
    useFrame(() => {
        if (cameraRef.current && target) {
            const newRadius = THREE.MathUtils.lerp(spherical.radius, targetRadius, lerpFactor);
            setSpherical((prevSpherical) => new THREE.Spherical(newRadius, prevSpherical.phi, prevSpherical.theta));
        }
    });
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

                const sphericalPosition = convertVectorToSpherical(relativePosition)

                setSpherical(sphericalPosition);
                toggleSatelliteCamera(true);
                toggleCameraTransitioning(false);
                setSimSpeed(prevSpeed);
                setIsTransitioning(false);
            };

            if (distance <= size * 6) {
                if (!satelliteCamera) {
                    switchCamera();
                }
            }
        }

    });

    function convertVectorToSpherical(vector) {
        const spherical = new THREE.Spherical();
        spherical.setFromVector3(vector);
        return spherical;
    }

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
