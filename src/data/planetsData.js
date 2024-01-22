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
    textures: {
        map: '/assets/sun/2k_sun.jpg', // Base texture
        highResMap: '/assets/sun/2k_sun.jpg' // Higher resolution texture
    },
};

// Similar data objects for other planets...
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
    textures: {
        map: '/assets/earth/2k_earth_daymap.jpg', // Base texture
        highResMap: '/assets/earth/2k_earth_daymap.jpg' // Higher resolution texture
    },
};

const moonData = {
    name: "Moon",
    mass: 7.342e22, // in kilograms
    radius: 1737.4, // in kilometers
    orbitalOrigin: new THREE.Vector3(10, 0, 0), // Assuming Earth's position is stored in earthData
    orbitalRadius: 3.84e5, // in kilometers (average distance to Earth)
    orbitalSpeed: 1.022, // in kilometers per second
    orbitalPeriod: 27.3, // in Earth days (sidereal period)
    initialOrbitalAngle: Math.random() * 360, // DONT SET TO ZERO
    orbitalInclination: 5.14, // in degrees (to the ecliptic)
    axialTilt: 1.54, // in degrees
    rotationPeriod: 655.7, // in hours (same as its orbital period, hence the same side always faces Earth)
    surfaceTemp: -53, // in Celsius (average)
    color: "silver",
    gravity: 1.62, // in m/s²
    textures: {
        map: '/assets/moon/2k_moon.jpg', // Base texture
        highResMap: '/assets/moon/2k_moon.jpg' // Higher resolution texture
    },
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
    gravity: 3.7 // in m/s²
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
    gravity: 8.87 // in m/s²
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
export const sizeScaleFactor = 0.002;
export const rotationSpeedScaleFactor = 600000;

export const moonDistanceScaleFactor = 0.0002;
export const moonSizeScaleFactor = .001;

export const moonsData = {
    Mercury: [], // Mercury has no moons
    Venus: [], // Venus has no moons
    Earth: [
        {
            name: "Moon",
            orbitalRadius: 384400, // Average distance from Earth in kilometers
            radius: 1737.1, // Average radius of the Moon in kilometers
            color: "grey",
            orbitalPeriod: 27.3, // Orbital period in Earth days
            orbitalInclination: 5.145, // in degrees
        },
    ],
    Mars: [
        {
            name: "Deimos",
            orbitalRadius: 23460, // Distance in kilometers
            radius: 6.2, // Average radius in kilometers
            color: "lightgrey",
            orbitalPeriod: 1.263, // Orbital period in Earth days
            orbitalInclination: 1.79,
        },
        {
            name: "Phobos",
            orbitalRadius: 9376, // Distance in kilometers
            radius: 11.2677, // Average radius in kilometers
            color: "darkgrey",
            orbitalPeriod: 0.319, // Orbital period in Earth days
            orbitalInclination: 1.093,
        },
    ],
    Jupiter: [
        // Including only the four largest moons (Galilean moons)
        {
            name: "Callisto",
            orbitalRadius: 1882700, // Distance in kilometers
            radius: 2410.3, // Radius in kilometers
            color: "darkgrey",
            orbitalPeriod: 16.689, // Orbital period in Earth days
            orbitalInclination: 0.28,
        },
        {
            name: "Europa",
            orbitalRadius: 671100, // Distance in kilometers
            radius: 1560.8, // Radius in kilometers
            color: "white",
            orbitalPeriod: 3.551, // Orbital period in Earth days
            orbitalInclination: 0.47,

        },
        {
            name: "Ganymede",
            orbitalRadius: 1070400, // Distance in kilometers
            radius: 2634.1, // Radius in kilometers
            color: "grey",
            orbitalPeriod: 7.154, // Orbital period in Earth days
            orbitalInclination: 0.2,
        },
        {
            name: "Io",
            orbitalRadius: 421700, // Distance in kilometers
            radius: 1821.6, // Radius in kilometers
            color: "yellow",
            orbitalPeriod: 1.769, // Orbital period in Earth days
            orbitalInclination: 0.05,
        },
    ],
    Saturn: [
        {
            name: "Dione",
            orbitalRadius: 377396, // Distance from Saturn in kilometers
            radius: 561.7, // Average radius in kilometers
            orbitalPeriod: 2.737, // Orbital period in Earth days
            orbitalInclination: 0.02, // Inclination in degrees
        },
        {
            name: "Enceladus",
            orbitalRadius: 237948, // Distance from Saturn in kilometers
            radius: 252.1, // Average radius in kilometers
            orbitalPeriod: 1.37, // Orbital period in Earth days
            orbitalInclination: 0.02, // Inclination in degrees
        },
        {
            name: "Iapetus",
            orbitalRadius: 3560820, // Distance from Saturn in kilometers
            radius: 734.5, // Average radius in kilometers
            orbitalPeriod: 79.322, // Orbital period in Earth days
            orbitalInclination: 7.52, // Inclination in degrees
        },
        {
            name: "Mimas",
            orbitalRadius: 185539, // Distance from Saturn in kilometers
            radius: 198.2, // Average radius in kilometers
            orbitalPeriod: 0.942, // Orbital period in Earth days
            orbitalInclination: 1.53, // Inclination in degrees
        },
        {
            name: "Rhea",
            orbitalRadius: 527108, // Distance from Saturn in kilometers
            radius: 763.8, // Average radius in kilometers
            orbitalPeriod: 4.518, // Orbital period in Earth days
            orbitalInclination: 0.35, // Inclination in degrees
        },
        {
            name: "Tethys",
            orbitalRadius: 294619, // Distance from Saturn in kilometers
            radius: 531.1, // Average radius in kilometers
            orbitalPeriod: 1.888, // Orbital period in Earth days
            orbitalInclination: 1.12, // Inclination in degrees
        },
        {
            name: "Titan",
            orbitalRadius: 1221870, // Distance from Saturn in kilometers
            radius: 2574.73, // Average radius in kilometers
            orbitalPeriod: 15.945, // Orbital period in Earth days
            orbitalInclination: 0.33, // Inclination in degrees
        },

    ],
    Uranus: [
        // Including the largest moon
        {
            name: "Ariel",
            orbitalRadius: 191020, // Distance from Uranus in kilometers
            radius: 578.9, // Average radius in kilometers
            orbitalPeriod: 2.520, // Orbital period in Earth days
            orbitalInclination: 0.26, // Inclination in degrees
        },
        {
            name: "Miranda",
            orbitalRadius: 129900, // Distance from Uranus in kilometers
            radius: 235.8, // Average radius in kilometers
            orbitalPeriod: 1.413, // Orbital period in Earth days
            orbitalInclination: 4.34, // Inclination in degrees
        },
        {
            name: "Oberon",
            orbitalRadius: 583520, // Distance from Uranus in kilometers
            radius: 761.4, // Average radius in kilometers
            orbitalPeriod: 13.463, // Orbital period in Earth days
            orbitalInclination: 0.10, // Inclination in degrees
        },
        {
            name: "Titania",
            orbitalRadius: 436300, // Distance in kilometers
            radius: 788.9, // Radius in kilometers
            color: "lightblue",
            orbitalPeriod: 8.706, // Orbital period in Earth days
            orbitalInclination: 0.14,
        },
        {
            name: "Umbriel",
            orbitalRadius: 266000, // Distance from Uranus in kilometers
            radius: 584.7, // Average radius in kilometers
            orbitalPeriod: 4.144, // Orbital period in Earth days
            orbitalInclination: 0.36, // Inclination in degrees
        },
    ],
    Neptune: [
        {
            name: "Nereid",
            orbitalRadius: 5513800, // Distance from Neptune in kilometers
            radius: 170, // Average radius in kilometers
            orbitalPeriod: 360.1362, // Orbital period in Earth days
            orbitalInclination: 7.23, // Inclination in degrees
        },
        {
            name: "Triton",
            orbitalRadius: 354800, // Distance in kilometers
            radius: 1353.4, // Radius in kilometers
            color: "lightblue",
            orbitalPeriod: -5.877, // Orbital period in Earth days (retrograde orbit)
        },
    ],
    // Pluto: [
    //     {
    //         name: "Charon",
    //         orbitalRadius: 19591, // Distance in kilometers
    //         radius: 606, // Radius in kilometers
    //         color: "grey",
    //         orbitalPeriod: 6.387, // Orbital period in Earth days
    //     },
    // ],
};  