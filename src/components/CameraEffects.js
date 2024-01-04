import  { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { usePlanetStore } from "../store/store";

const CameraEffects = () => {
    const { camera } = useThree();
    const { selectedPlanet } = usePlanetStore();

    // Effect to change camera properties based on selectedPlanet
    useEffect(() => {
        if (selectedPlanet) {
            // Example: Set the camera position relative to the planet size
            const distance = selectedPlanet.radius * 2; // or any logic for distance
            // camera.position.set(distance, distance, distance);ß // Update camera position

            // Additional properties can be set here
            camera.fov = calculateFOV(selectedPlanet);
            camera.updateProjectionMatrix();
        }
    }, [selectedPlanet, camera]); // Re-run effect if selectedPlanet or camera changes

    // Placeholder function for calculating FOV or other properties
    const calculateFOV = (planet) => {
        // Implement logic based on the planet's size, distance, or other characteristics
        return 45; // Placeholder value
    };

    return null; // This component does not render anything
};

export default CameraEffects;
