export const moonDistanceScaleFactor = 0.0001;
export const moonSizeScaleFactor = .0004;

export const moonsData = {
    Mercury: [], // Mercury has no moons
    Venus: [], // Venus has no moons
    Earth: [
        {
            name: "Moon",
            mass: 7.342e22,
            orbitalRadius: 384400, // Average distance from Earth in kilometers
            radius: 1737.1, // Average radius of the Moon in kilometers
            orbitalPeriod: 27.3, // Orbital period in Earth days
            orbitalInclination: 5.145, // in degrees
            color: "silver",
        },
    ],
    Mars: [
        {
            name: "Deimos",
            mass: 1.48e15,
            orbitalRadius: 23460, // Distance in kilometers
            radius: 6.2, // Average radius in kilometers
            orbitalPeriod: 1.263, // Orbital period in Earth days
            orbitalInclination: 1.79,
            color: "lightgrey",
        },
        {
            name: "Phobos",
            mass: 1.066e16,
            orbitalRadius: 9376, // Distance in kilometers
            radius: 11.2677, // Average radius in kilometers
            orbitalPeriod: 0.319, // Orbital period in Earth days
            orbitalInclination: 1.093,
            color: "darkgrey",
        },
    ],
    Jupiter: [
        // Including only the four largest moons (Galilean moons)
        {
            name: "Callisto",
            mass: 1.0758e23,
            orbitalRadius: 1882700, // Distance in kilometers
            radius: 2410.3, // Radius in kilometers
            orbitalPeriod: 16.689, // Orbital period in Earth days
            orbitalInclination: 0.28,
            color: "darkgrey",
        },
        {
            name: "Europa",
            mass: 4.7998e22,
            orbitalRadius: 671100, // Distance in kilometers
            radius: 1560.8, // Radius in kilometers
            orbitalPeriod: 3.551, // Orbital period in Earth days
            orbitalInclination: 0.47,
            color: "white",

        },
        {
            name: "Ganymede",
            mass: 1.4819e23,
            orbitalRadius: 1070400, // Distance in kilometers
            radius: 2634.1, // Radius in kilometers
            orbitalPeriod: 7.154, // Orbital period in Earth days
            orbitalInclination: 0.2,
            color: "grey",
        },
        {
            name: "Io",
            mass: 8.9319e22,
            orbitalRadius: 421700, // Distance in kilometers
            radius: 1821.6, // Radius in kilometers
            orbitalPeriod: 1.769, // Orbital period in Earth days
            orbitalInclination: 0.05,
            color: "yellow",
        },
    ],
    Saturn: [
        {
            name: "Dione",
            mass: 1.095452e21,
            orbitalRadius: 377396, // Distance from Saturn in kilometers
            radius: 561.7, // Average radius in kilometers
            orbitalPeriod: 2.737, // Orbital period in Earth days
            orbitalInclination: 0.02, // Inclination in degrees
            color: "#D9D9D9"
        },
        {
            name: "Enceladus",
            mass: 1.08022e20,
            orbitalRadius: 237948, // Distance from Saturn in kilometers
            radius: 252.1, // Average radius in kilometers
            orbitalPeriod: 1.37, // Orbital period in Earth days
            orbitalInclination: 0.02, // Inclination in degrees
            color: "#FFFFFF",

        },
        {
            name: "Iapetus",
            mass: 1.805635e21,
            orbitalRadius: 3560820, // Distance from Saturn in kilometers
            radius: 734.5, // Average radius in kilometers
            orbitalPeriod: 79.322, // Orbital period in Earth days
            orbitalInclination: 7.52, // Inclination in degrees
            color: "#FFFFFF",
        },
        {
            name: "Mimas",
            mass: 3.7493e19,
            orbitalRadius: 185539, // Distance from Saturn in kilometers
            radius: 198.2, // Average radius in kilometers
            orbitalPeriod: 0.942, // Orbital period in Earth days
            orbitalInclination: 1.53, // Inclination in degrees
            color: "#E0E0E0",
        },
        {
            name: "Rhea",
            mass: 2.306518e21,
            orbitalRadius: 527108, // Distance from Saturn in kilometers
            radius: 763.8, // Average radius in kilometers
            orbitalPeriod: 4.518, // Orbital period in Earth days
            orbitalInclination: 0.35, // Inclination in degrees
            color: "#D3D3D3",
        },
        {
            name: "Tethys",
            mass: 6.17449e20,
            orbitalRadius: 294619, // Distance from Saturn in kilometers
            radius: 531.1, // Average radius in kilometers
            orbitalPeriod: 1.888, // Orbital period in Earth days
            orbitalInclination: 1.12, // Inclination in degrees
            color: "#F5F5F5",
        },
        {
            name: "Titan",
            mass: 1.3452e23,
            orbitalRadius: 1221870, // Distance from Saturn in kilometers
            radius: 2574.73, // Average radius in kilometers
            orbitalPeriod: 15.945, // Orbital period in Earth days
            orbitalInclination: 0.33, // Inclination in degrees
            color: "#FFCC99",
        },
    ],
    Uranus: [
        {
            name: "Ariel",
            mass: 1.353e21,
            orbitalRadius: 191020, // Distance from Uranus in kilometers
            radius: 578.9, // Average radius in kilometers
            orbitalPeriod: 2.520, // Orbital period in Earth days
            orbitalInclination: 0.26, // Inclination in degrees
            color: "grey",
        },
        {
            name: "Miranda",
            mass: 6.59e19,
            orbitalRadius: 129900, // Distance from Uranus in kilometers
            radius: 235.8, // Average radius in kilometers
            orbitalPeriod: 1.413, // Orbital period in Earth days
            orbitalInclination: 4.34, // Inclination in degrees
            color: "grey",
        },
        {
            name: "Oberon",
            mass: 3.014e21,
            orbitalRadius: 583520, // Distance from Uranus in kilometers
            radius: 761.4, // Average radius in kilometers
            orbitalPeriod: 13.463, // Orbital period in Earth days
            orbitalInclination: 0.10, // Inclination in degrees
            color: "grey",
        },
        {
            name: "Titania",
            mass: 3.527e21,
            orbitalRadius: 436300, // Distance in kilometers
            radius: 788.9, // Radius in kilometers
            color: "lightblue",
            orbitalPeriod: 8.706, // Orbital period in Earth days
            orbitalInclination: 0.14,
            color: "grey",
        },
        {
            name: "Umbriel",
            mass: 1.172e21,
            orbitalRadius: 266000, // Distance from Uranus in kilometers
            radius: 584.7, // Average radius in kilometers
            orbitalPeriod: 4.144, // Orbital period in Earth days
            orbitalInclination: 0.36, // Inclination in degrees
            color: "grey",
        },
    ],
    Neptune: [
        {
            name: "Nereid",
            mass: 3.1e20,
            orbitalRadius: 5513800, // Distance from Neptune in kilometers
            radius: 1737, // Average radius in kilometers
            orbitalPeriod: 360.1362, // Orbital period in Earth days
            orbitalInclination: 7.23, // Inclination in degrees
            color: "grey",
        },
        {
            name: "Triton",
            mass: 2.14e22,
            orbitalRadius: 354800, // Distance in kilometers
            radius: 353.4, // Radius in kilometers
            orbitalPeriod: -5.877, // Orbital period in Earth days (retrograde orbit)
            orbitalInclination: 0, // in degrees
            color: "lightblue",
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