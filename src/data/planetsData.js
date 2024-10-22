import * as THREE from 'three';

const sunPosition = new THREE.Vector3(0, 0, 0);

const sunData = {
    name: "Sun",
    mass: 1.989e30,
    radius: 696340,
    orbitalOrigin: sunPosition,
    orbitalRadius: 0,
    orbitalSpeed: 0,
    orbitalPeriod: 0,
    initialOrbitalAngle: 0,
    axialTilt: 7.25,
    rotationPeriod: 700,
    surfaceTemp: 5505,
    color: "#FFFF00",
    gravity: 274,
    eccentricity: 0, // Sun has no orbit
};

const mercuryData = {
    name: "Mercury",
    mass: 3.285e23,
    radius: 2439.7,
    orbitalOrigin: sunPosition,
    orbitalRadius: 57.9e6,
    orbitalSpeed: 47.87,
    orbitalPeriod: 88,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 7,
    axialTilt: 0.034,
    rotationPeriod: 1407.6,
    surfaceTemp: 167,
    color: "gray",
    gravity: 3.7,
    gravitationalAcceleration: 0.0396,
    eccentricity: 0.206, // Most eccentric of the planets
};

const venusData = {
    name: "Venus",
    mass: 4.867e24,
    radius: 6051.8,
    orbitalOrigin: sunPosition,
    orbitalRadius: 108.2e6,
    orbitalSpeed: 35.02,
    orbitalPeriod: 225,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 3.39,
    axialTilt: 177.4,
    rotationPeriod: 5832.5,
    surfaceTemp: 464,
    color: "#ff9e43",
    gravity: 8.87,
    gravitationalAcceleration: 0.0113,
    eccentricity: 0.007, // Nearly circular orbit
};

const earthData = {
    name: "Earth",
    mass: 5.972e24,
    radius: 6371,
    orbitalOrigin: sunPosition,
    orbitalRadius: 149.6e6,
    orbitalSpeed: 29.78,
    orbitalPeriod: 365.25,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 0.00005,
    axialTilt: 23.44,
    rotationPeriod: 23.93,
    surfaceTemp: 14,
    color: "dodgerblue",
    gravity: 9.807,
    gravitationalAcceleration: 0.00593,
    eccentricity: 0.7, // Slightly elliptical
};

const marsData = {
    name: "Mars",
    mass: 6.4171e23,
    radius: 3396.2,
    orbitalOrigin: sunPosition,
    orbitalRadius: 227.9e6,
    orbitalSpeed: 24.077,
    orbitalPeriod: 687,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 1.85,
    axialTilt: 25.19,
    rotationPeriod: 24.6635,
    surfaceTemp: -63,
    color: "salmon",
    gravity: 3.72076,
    gravitationalAcceleration: 0.00256,
    eccentricity: 0.093, // Notably elliptical
    interestPoints: [
        {
            title: "Olympus Mons",
            coordinates: new THREE.Vector3(10, 15, 0)
        }
    ]
};

const jupiterData = {
    name: "Jupiter",
    mass: 1.898e27,
    radius: 69911,
    orbitalOrigin: sunPosition,
    orbitalRadius: 778.5e6,
    orbitalSpeed: 13.07,
    orbitalPeriod: 4333,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 1.31,
    axialTilt: 3.13,
    rotationPeriod: 9.93,
    surfaceTemp: -145,
    color: "#FFD27D",
    gravity: 24.79,
    gravitationalAcceleration: 0.000219,
    eccentricity: 0.048, // Moderately elliptical
    interestPoints: [
        {
            title: "Great Red Spot",
            coordinates: [-1, 1, 1]
        }
    ]
};

const saturnData = {
    name: "Saturn",
    mass: 5.683e26,
    radius: 58232,
    orbitalOrigin: sunPosition,
    orbitalRadius: 1.434e9,
    orbitalSpeed: 9.68,
    orbitalPeriod: 10759,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 2.49,
    axialTilt: 26.73,
    rotationPeriod: 10.8,
    surfaceTemp: -139,
    color: "#FFCC99",
    gravity: 10.44,
    gravitationalAcceleration: 0.0000646,
    eccentricity: 0.054, // Moderately elliptical
    interestPoints: [
        {
            title: "Hexagon Storm",
            coordinates: new THREE.Vector3(-10, 20, 0)
        }
    ]
};

const uranusData = {
    name: "Uranus",
    mass: 8.681e25,
    radius: 25362,
    orbitalOrigin: sunPosition,
    orbitalRadius: 2.871e9,
    orbitalSpeed: 6.81,
    orbitalPeriod: 30660,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 0.77,
    axialTilt: 97.77,
    rotationPeriod: 17.2,
    surfaceTemp: -195,
    color: "#AECBC9",
    gravity: 8.69,
    gravitationalAcceleration: 0.0000161,
    eccentricity: 0.047, // Moderately elliptical
};

const neptuneData = {
    name: "Neptune",
    mass: 1.024e26,
    radius: 24622,
    orbitalOrigin: sunPosition,
    orbitalRadius: 4.495e9,
    orbitalSpeed: 5.43,
    orbitalPeriod: 60182,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 1.77,
    axialTilt: 28.32,
    rotationPeriod: 16,
    surfaceTemp: -201,
    color: "#4973AB",
    gravity: 11.15,
    gravitationalAcceleration: 0.00000657,
    eccentricity: 0.009, // Nearly circular orbit
    interestPoints: [
        {
            title: "Great Dark Spot",
            coordinates: new THREE.Vector3(-5, -5, 0)
        }
    ]
};

const plutoData = {
    name: "Pluto",
    mass: 1.309e22,
    radius: 1188.3,
    orbitalOrigin: sunPosition,
    orbitalRadius: 5.906e9,
    orbitalSpeed: 4.74,
    orbitalPeriod: 90560,
    initialOrbitalAngle: Math.random() * 360,
    orbitalInclination: 17.16,
    axialTilt: 122.53,
    rotationPeriod: 153.3,
    surfaceTemp: -229,
    color: "#F4E8C8",
    gravity: 0.62,
    eccentricity: 0.244, // Highly elliptical (dwarf planet)
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
    Neptune: neptuneData
};

export default planetsData;

export const distanceScaleFactor = 0.00001;
export const sizeScaleFactor = 0.0001;
export const rotationSpeedScaleFactor = 600000;

// constants for formulas
export const G = 6.67430e-11; // Gravitational constant in m^3 kg^-1 s^-2
export const MASS_OF_SUN = 1.989e30; // kg