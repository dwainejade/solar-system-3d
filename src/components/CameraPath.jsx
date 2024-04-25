import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCameraStore } from '../store/store';

const CameraFollowerWithHelper = ({ targetPosition }) => {
    const { setPosVec } = useCameraStore()
    const { camera, scene } = useThree();
    const cameraHelper = useRef(null);

    useEffect(() => {
        // Initialize the CameraHelper with the current camera
        const helper = new THREE.CameraHelper(camera);
        cameraHelper.current = helper;
        scene.add(helper);

        // Cleanup function to remove the helper from the scene
        return () => {
            scene.remove(helper);
        };
    }, [camera, scene]);

    useFrame(() => {
        if (targetPosition) {
            // Convert targetPosition object to THREE.Vector3 if it isn't already
            const positionVec = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);

            // Calculate desired camera position as an offset from target
            const offset = new THREE.Vector3(5, 5, 5); // Adjust offset as needed
            const desiredPosition = positionVec.clone().add(offset);

            camera.position.lerp(desiredPosition, 0.1);
            camera.lookAt(positionVec);
            setPosVec(desiredPosition);
        }

        // Update the camera helper to reflect changes
        if (cameraHelper.current) {
            cameraHelper.current.update();
        }
    });

    return null;
};

export default CameraFollowerWithHelper;
