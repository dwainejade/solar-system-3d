export const moonDistanceScaleFactor = 0.0001;
export const moonSizeScaleFactor = .00035;

const moonsData = {
    Mercury: [],
    Venus: [],
    Earth: [
        {
            name: "Moon",
            id: 'earth-moon',
            parentName: 'Earth',
            mass: 7.342e22,
            orbitalRadius: 384400,
            radius: 1737.1,
            orbitalPeriod: 27.3,
            orbitalInclination: 5.145,
            eccentricity: 0.0549, // Moon's orbit is moderately eccentric
            color: "silver",
        },
    ],
    Mars: [
        {
            name: "Deimos",
            id: 'earth-deimos',
            parentName: 'Mars',
            mass: 1.48e15,
            orbitalRadius: 23460,
            radius: 6.2,
            orbitalPeriod: 1.263,
            orbitalInclination: 1.79,
            eccentricity: 0.00033, // Nearly circular orbit
            color: "lightgrey",
        },
        {
            name: "Phobos",
            id: 'earth-phobos',
            parentName: 'Mars',
            mass: 1.066e16,
            orbitalRadius: 9376,
            radius: 11.2677,
            orbitalPeriod: 0.319,
            orbitalInclination: 1.093,
            eccentricity: 0.0151, // Slightly eccentric
            color: "darkgrey",
        },
    ],
    Jupiter: [
        {
            name: "Callisto",
            id: 'jupiter-callisto',
            parentName: 'Jupiter',
            mass: 1.0758e23,
            orbitalRadius: 1882700,
            radius: 2410.3,
            orbitalPeriod: 16.689,
            orbitalInclination: 0.28,
            eccentricity: 0.0074, // Nearly circular
            color: "darkgrey",
        },
        {
            name: "Europa",
            id: 'jupiter-europa',
            parentName: 'Jupiter',
            mass: 4.7998e22,
            orbitalRadius: 671100,
            radius: 1560.8,
            orbitalPeriod: 3.551,
            orbitalInclination: 0.47,
            eccentricity: 0.009, // Nearly circular
            color: "white",
        },
        {
            name: "Ganymede",
            id: 'jupiter-ganymede',
            parentName: 'Jupiter',
            mass: 1.4819e23,
            orbitalRadius: 1070400,
            radius: 2634.1,
            orbitalPeriod: 7.154,
            orbitalInclination: 0.2,
            eccentricity: 0.0013, // Very circular
            color: "grey",
        },
        {
            name: "Io",
            id: 'jupiter-io',
            parentName: 'Jupiter',
            mass: 8.9319e22,
            orbitalRadius: 421700,
            radius: 1821.6,
            orbitalPeriod: 1.769,
            orbitalInclination: 0.05,
            eccentricity: 0.0041, // Nearly circular
            color: "yellow",
        },
    ],
    Saturn: [
        {
            name: "Dione",
            id: 'saturn-dione',
            parentName: 'Saturn',
            mass: 1.095452e21,
            orbitalRadius: 377396,
            radius: 561.7,
            orbitalPeriod: 2.737,
            orbitalInclination: 0.02,
            eccentricity: 0.0022, // Very circular
            color: "#D9D9D9"
        },
        {
            name: "Enceladus",
            id: 'saturn-enceladus',
            parentName: 'Saturn',
            mass: 1.08022e20,
            orbitalRadius: 237948,
            radius: 252.1,
            orbitalPeriod: 1.37,
            orbitalInclination: 0.02,
            eccentricity: 0.0047, // Nearly circular
            color: "#FFFFFF",
        },
        {
            name: "Iapetus",
            id: 'saturn-iapetus',
            parentName: 'Saturn',
            mass: 1.805635e21,
            orbitalRadius: 3560820,
            radius: 734.5,
            orbitalPeriod: 79.322,
            orbitalInclination: 7.52,
            eccentricity: 0.0286, // Moderately eccentric
            color: "#FFFFFF",
        },
        {
            name: "Mimas",
            id: 'saturn-mimas',
            parentName: 'Saturn',
            mass: 3.7493e19,
            orbitalRadius: 185539,
            radius: 198.2,
            orbitalPeriod: 0.942,
            orbitalInclination: 1.53,
            eccentricity: 0.0196, // Slightly eccentric
            color: "#E0E0E0",
        },
        {
            name: "Rhea",
            id: 'saturn-rhea',
            parentName: 'Saturn',
            mass: 2.306518e21,
            orbitalRadius: 527108,
            radius: 763.8,
            orbitalPeriod: 4.518,
            orbitalInclination: 0.35,
            eccentricity: 0.0012, // Very circular
            color: "#D3D3D3",
        },
        {
            name: "Tethys",
            id: 'saturn-tethys',
            parentName: 'Saturn',
            mass: 6.17449e20,
            orbitalRadius: 294619,
            radius: 531.1,
            orbitalPeriod: 1.888,
            orbitalInclination: 1.12,
            eccentricity: 0.0001, // Almost perfectly circular
            color: "#F5F5F5",
        },
        {
            name: "Titan",
            id: 'saturn-titan',
            parentName: 'Saturn',
            mass: 1.3452e23,
            orbitalRadius: 1221870,
            radius: 2574.73,
            orbitalPeriod: 15.945,
            orbitalInclination: 0.33,
            eccentricity: 0.0288, // Moderately eccentric
            color: "#FFCC99",
        },
    ],
    Uranus: [
        {
            name: "Ariel",
            id: 'uranus-ariel',
            parentName: 'Uranus',
            mass: 1.353e21,
            orbitalRadius: 191020,
            radius: 578.9,
            orbitalPeriod: 2.520,
            orbitalInclination: 0.26,
            eccentricity: 0.0012, // Very circular
            color: "grey",
        },
        {
            name: "Miranda",
            id: 'uranus-miranda',
            parentName: 'Uranus',
            mass: 6.59e19,
            orbitalRadius: 129900,
            radius: 235.8,
            orbitalPeriod: 1.413,
            orbitalInclination: 4.34,
            eccentricity: 0.0013, // Very circular
            color: "grey",
        },
        {
            name: "Oberon",
            id: 'uranus-oberon',
            parentName: 'Uranus',
            mass: 3.014e21,
            orbitalRadius: 583520,
            radius: 761.4,
            orbitalPeriod: 13.463,
            orbitalInclination: 0.10,
            eccentricity: 0.0014, // Very circular
            color: "grey",
        },
        {
            name: "Titania",
            id: 'uranus-titania',
            parentName: 'Uranus',
            mass: 3.527e21,
            orbitalRadius: 436300,
            radius: 788.9,
            orbitalPeriod: 8.706,
            orbitalInclination: 0.14,
            eccentricity: 0.0011, // Very circular
            color: "grey",
        },
        {
            name: "Umbriel",
            id: 'uranus-umbriel',
            parentName: 'Uranus',
            mass: 1.172e21,
            orbitalRadius: 266000,
            radius: 584.7,
            orbitalPeriod: 4.144,
            orbitalInclination: 0.36,
            eccentricity: 0.0039, // Nearly circular
            color: "grey",
        },
    ],
    Neptune: [
        {
            name: "Nereid",
            id: 'neptune-nereid',
            parentName: 'Neptune',
            mass: 3.1e20,
            orbitalRadius: 5513800,
            radius: 1737,
            orbitalPeriod: 360.1362,
            orbitalInclination: 7.23,
            eccentricity: 0.7507, // Highly eccentric!
            color: "grey",
        },
        {
            name: "Triton",
            id: 'neptune-triton',
            parentName: 'Neptune',
            mass: 2.14e22,
            orbitalRadius: 354800,
            radius: 353.4,
            orbitalPeriod: -5.877,
            orbitalInclination: 156.885, // Updated for retrograde orbit
            eccentricity: 0.000016, // Almost perfectly circular
            color: "lightblue",
        },
    ],
};
export default moonsData;

// Find a moon by its name and parent planet name
export const findMoonByName = (moonName, parentPlanetName) => {
    // Check if the parent planet exists and has moons
    const planetMoons = moonsData[parentPlanetName];
    if (!planetMoons) return null;

    // Find the specific moon
    return planetMoons.find(moon => moon.name === moonName);
};

// Alternative method using Object.entries if you only have the moon name
export const findMoonAndParent = (moonName) => {
    for (const [planetName, moons] of Object.entries(moonsData)) {
        const moon = moons.find(moon => moon.name === moonName);
        if (moon) {
            return {
                moon,
                parentPlanet: planetName
            };
        }
    }
    return null;
};