import * as THREE from 'three';

const sunPosition = new THREE.Vector3(0, 0, 0);

const sunData = {
    name: "Sun",
    mass: 1.989e30, // in kilograms
    radius: 696340, // in kilometers
    orbitalOrigin: sunPosition, // Sun as the central point
    orbitalRadius: 0, // Sun doesn't orbit around anything in the solar system
    orbitalSpeed: 0, // No orbital speed
    orbitalPeriod: 0, // No orbital period
    initialOrbitalAngle: 0, // The sun can be ZERO since it does not move
    axialTilt: 7.25, // in degrees to the ecliptic plane
    rotationPeriod: 609.12, // in hours (varies by latitude)
    surfaceTemp: 5505, // in Celsius (average effective temperature)
    color: "#FFFF00", // Bright yellow color
    gravity: 274, // in m/s² (surface gravity)
};

const mercuryData = {
    name: "Mercury",
    mass: 3.285e23, // in kilograms
    radius: 2439.7, // in kilometers
    orbitalOrigin: sunPosition,
    orbitalRadius: 57.9e6, // in kilometers
    orbitalSpeed: 47.87, // in kilometers per second
    orbitalPeriod: 88, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 7, // in degrees
    axialTilt: 0.034, // in degrees (very small)
    rotationPeriod: 1407.6, // in hours
    surfaceTemp: 167, // in Celsius (average day)
    color: "gray",
    gravity: 3.7, // in m/s²
    gravitationalAcceleration: 0.0396, // m/s²
};

const venusData = {
    name: "Venus",
    mass: 4.867e24, // in kilograms
    radius: 6051.8, // in kilometers
    orbitalOrigin: sunPosition,
    orbitalRadius: 108.2e6, // in kilometers
    orbitalSpeed: 35.02, // in kilometers per second
    orbitalPeriod: 225, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 3.39, // in degrees
    axialTilt: 177.4, // in degrees (rotates in opposite direction)
    rotationPeriod: 5832.5, // in hours (retrograde rotation)
    surfaceTemp: 464, // in Celsius
    color: "#ff9e43",
    gravity: 8.87, // in m/s²
    gravitationalAcceleration: 0.0113, // m/s²
};

const earthData = {
    name: "Earth",
    mass: 5.972e24, // in kilograms
    radius: 6371, // in kilometers
    orbitalOrigin: sunPosition,
    orbitalRadius: 149.6e6, // in kilometers
    orbitalSpeed: 29.78, // in kilometers per second
    orbitalPeriod: 365.25, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 0.00005, // in degrees
    axialTilt: 23.44, // in degrees
    rotationPeriod: 23.93, // in hours
    surfaceTemp: 14, // in Celsius
    color: "dodgerblue",
    gravity: 9.807, // in m/s²
    gravitationalAcceleration: 0.00593, // m/s²
};

const marsData = {
    name: "Mars",
    mass: 6.4171e23, // in kilograms
    radius: 3396.2, // in kilometers
    orbitalOrigin: sunPosition,
    orbitalRadius: 227.9e6, // in kilometers
    orbitalSpeed: 24.077, // in kilometers per second
    orbitalPeriod: 687, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 1.85, // in degrees
    axialTilt: 25.19, // in degrees
    rotationPeriod: 24.6635, // in hours
    surfaceTemp: -63, // in Celsius
    color: "salmon",
    gravity: 3.72076, // in m/s²
    gravitationalAcceleration: 0.00256, // m/s²
    interestPoints: [
        {
            title: "Olympus Mons",
            coordinates: new THREE.Vector3(10, 15, 0) // Example coordinates
        }
    ]
};

const jupiterData = {
    name: "Jupiter",
    mass: 1.898e27, // in kilograms
    radius: 69911, // in kilometers
    orbitalOrigin: sunPosition, // Assuming Sun's position is at the origin
    orbitalRadius: 778.5e6, // in kilometers
    orbitalSpeed: 13.07, // in kilometers per second
    orbitalPeriod: 4333, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 1.31, // in degrees
    axialTilt: 3.13, // in degrees
    rotationPeriod: 9.93, // in hours
    surfaceTemp: -145, // in Celsius (average)
    color: "#FFD27D",
    gravity: 24.79, // in m/s²
    gravitationalAcceleration: 0.000219, // m/s²
    interestPoints: [
        {
            title: "Great Red Spot",
            coordinates: [-5, 5, 0] // Example coordinates
        }
    ]
};

const saturnData = {
    name: "Saturn",
    mass: 5.683e26, // in kilograms
    radius: 58232, // in kilometers
    orbitalOrigin: sunPosition,
    orbitalRadius: 1.434e9, // in kilometers
    orbitalSpeed: 9.68, // in kilometers per second
    orbitalPeriod: 10759, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 2.49, // in degrees
    axialTilt: 26.73, // in degrees
    rotationPeriod: 10.8, // in hours
    surfaceTemp: -139, // in Celsius (average)
    color: "#FFCC99",
    gravity: 10.44, // in m/s²
    gravitationalAcceleration: 0.0000646, // m/s²
    interestPoints: [
        {
            title: "Hexagon Storm",
            coordinates: new THREE.Vector3(-10, 20, 0) // Example coordinates
        }
    ]
};

const uranusData = {
    name: "Uranus",
    mass: 8.681e25, // in kilograms
    radius: 25362, // in kilometers
    orbitalOrigin: sunPosition, // Assuming Sun's position is at the origin
    orbitalRadius: 2.871e9, // in kilometers
    orbitalSpeed: 6.81, // in kilometers per second
    orbitalPeriod: 30660, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 0.77, // in degrees
    axialTilt: 97.77, // in degrees (unique side-rolling rotation)
    rotationPeriod: 17.2, // in hours
    surfaceTemp: -195, // in Celsius (average)
    color: "#AECBC9",
    gravity: 8.69, // in m/s²
    gravitationalAcceleration: 0.0000161, // m/s²
};

const neptuneData = {
    name: "Neptune",
    mass: 1.024e26, // in kilograms
    radius: 24622, // in kilometers
    orbitalOrigin: sunPosition,
    orbitalRadius: 4.495e9, // in kilometers
    orbitalSpeed: 5.43, // in kilometers per second
    orbitalPeriod: 60182, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 1.77, // in degrees
    axialTilt: 28.32, // in degrees
    rotationPeriod: 16, // in hours
    surfaceTemp: -201, // in Celsius (average)
    color: "#4973AB",
    gravity: 11.15, // in m/s²
    gravitationalAcceleration: 0.00000657, // m/s²
    interestPoints: [
        {
            title: "Great Dark Spot",
            coordinates: new THREE.Vector3(-5, -5, 0) // Example coordinates
        }
    ]
};

const plutoData = {
    name: "Pluto",
    mass: 1.309e22, // in kilograms
    radius: 1188.3, // in kilometers
    orbitalOrigin: sunPosition, // Assuming Sun's position is at the origin
    orbitalRadius: 5.906e9, // in kilometers
    orbitalSpeed: 4.74, // in kilometers per second
    orbitalPeriod: 90560, // in Earth days
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 17.16, // in degrees
    axialTilt: 122.53, // in degrees
    rotationPeriod: 153.3, // in hours
    surfaceTemp: -229, // in Celsius (average)
    color: "#F4E8C8",
    gravity: 0.62, // in m/s²
};


const planetsData = {
    Sun: sunData,
    Mercury: mercuryData,
    Venus: venusData,
    Earth: earthData,
    Mars: marsData,
    Jupiter: jupiterData,
    Saturn: saturnData,
    Uranus: uranusData,
    Neptune: neptuneData,
};
export default planetsData;


export const distanceScaleFactor = 0.00001;
export const sizeScaleFactor = 0.0001;
export const rotationSpeedScaleFactor = 600000;

// constants for formulas
export const G = 6.67430e-11; // Gravitational constant in m^3 kg^-1 s^-2
export const MASS_OF_SUN = 1.989e30; // kg
