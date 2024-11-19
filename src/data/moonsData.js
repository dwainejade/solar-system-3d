export const moonDistanceScaleFactor = 0.0001;
export const moonSizeScaleFactor = 0.0002;

const moonsData = {
    Mercury: [],
    Venus: [],
    Earth: [
        {
            name: "Moon",
            id: "earth-moon",
            parentName: "Earth",
            mass: 7.342e22,
            orbitalRadius: 384400,
            radius: 1737.1,
            orbitalPeriod: 27.3,
            orbitalInclination: 5.145,
            eccentricity: 0.0549,
            color: "silver",
            orbitalSpeed: 1.022, // km/s
            axialTilt: 6.68, // degrees
            rotationPeriod: 27.3, // days
            surfaceTemp: { min: -173, max: 127 }, // °C
            gravity: 1.62, // m/s^2
            gravitationalAcceleration: 1.62, // m/s^2
        },
    ],
    Mars: [
        {
            name: "Deimos",
            id: "mars-deimos",
            parentName: "Mars",
            mass: 1.48e15,
            orbitalRadius: 23460,
            radius: 6.2,
            orbitalPeriod: 1.263,
            orbitalInclination: 1.79,
            eccentricity: 0.00033,
            color: "lightgrey",
            orbitalSpeed: 1.35,
            axialTilt: 0,
            rotationPeriod: 1.263,
            surfaceTemp: { min: -150, max: 0 }, // °C
            gravity: 0.003, // m/s^2
            gravitationalAcceleration: 0.003, // m/s^2
        },
        {
            name: "Phobos",
            id: "mars-phobos",
            parentName: "Mars",
            mass: 1.066e16,
            orbitalRadius: 9376,
            radius: 11.2677,
            orbitalPeriod: 0.319,
            orbitalInclination: 1.093,
            eccentricity: 0.0151,
            color: "darkgrey",
            orbitalSpeed: 2.138,
            axialTilt: 0,
            rotationPeriod: 0.319,
            surfaceTemp: { min: -123, max: -43 }, // °C
            gravity: 0.0057, // m/s^2
            gravitationalAcceleration: 0.0057, // m/s^2
        },
    ],
    Jupiter: [
        {
            name: "Callisto",
            id: "jupiter-callisto",
            parentName: "Jupiter",
            mass: 1.0758e23,
            orbitalRadius: 1882700,
            radius: 2410.3,
            orbitalPeriod: 16.689,
            orbitalInclination: 0.28,
            eccentricity: 0.0074,
            color: "darkgrey",
            orbitalSpeed: 8.204,
            axialTilt: 0.0,
            rotationPeriod: 16.689,
            surfaceTemp: -139, // °C
            gravity: 1.235, // m/s^2
            gravitationalAcceleration: 1.235, // m/s^2
        },
        {
            name: "Europa",
            id: "jupiter-europa",
            parentName: "Jupiter",
            mass: 4.7998e22,
            orbitalRadius: 671100,
            radius: 1560.8,
            orbitalPeriod: 3.551,
            orbitalInclination: 0.47,
            eccentricity: 0.009,
            color: "white",
            orbitalSpeed: 13.74,
            axialTilt: 0.1,
            rotationPeriod: 3.551,
            surfaceTemp: -160, // °C
            gravity: 1.315, // m/s^2
            gravitationalAcceleration: 1.315, // m/s^2
        },
        {
            name: "Ganymede",
            id: "jupiter-ganymede",
            parentName: "Jupiter",
            mass: 1.4819e23,
            orbitalRadius: 1070400,
            radius: 2634.1,
            orbitalPeriod: 7.154,
            orbitalInclination: 0.2,
            eccentricity: 0.0013,
            color: "grey",
            orbitalSpeed: 10.88,
            axialTilt: 0.0,
            rotationPeriod: 7.154,
            surfaceTemp: -163, // °C
            gravity: 1.428, // m/s^2
            gravitationalAcceleration: 1.428, // m/s^2
        },
        {
            name: "Io",
            id: "jupiter-io",
            parentName: "Jupiter",
            mass: 8.9319e22,
            orbitalRadius: 421700,
            radius: 1821.6,
            orbitalPeriod: 1.769,
            orbitalInclination: 0.05,
            eccentricity: 0.0041,
            color: "yellow",
            orbitalSpeed: 17.334,
            axialTilt: 0.0,
            rotationPeriod: 1.769,
            surfaceTemp: { min: -143, max: 1600 }, // °C
            gravity: 1.796, // m/s^2
            gravitationalAcceleration: 1.796, // m/s^2
        },
        // Additional
        {
            name: "Amalthea",
            id: "jupiter-amalthea",
            parentName: "Jupiter",
            mass: 2.08e18,  // kg
            orbitalRadius: 181366,  // km
            radius: 83.5,  // km
            orbitalPeriod: 0.498,  // days
            orbitalInclination: 0.374,  // degrees
            eccentricity: 0.003,
            color: "#8B0000",  // dark red
            orbitalSpeed: 26.57,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.498,  // days (synchronous)
            surfaceTemp: -160,  // °C
            gravity: 0.02,  // m/s²
            gravitationalAcceleration: 0.02  // m/s²
        },
        {
            name: "Thebe",
            id: "jupiter-thebe",
            parentName: "Jupiter",
            mass: 7.77e17,  // kg
            orbitalRadius: 221889,  // km
            radius: 49.3,  // km
            orbitalPeriod: 0.675,  // days
            orbitalInclination: 1.076,  // degrees
            eccentricity: 0.0175,
            color: "#8B4513",  // reddish-brown
            orbitalSpeed: 23.92,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.675,  // days (synchronous)
            surfaceTemp: -160,  // °C
            gravity: 0.01,  // m/s²
            gravitationalAcceleration: 0.01  // m/s²
        },
        {
            name: "Metis",
            id: "jupiter-metis",
            parentName: "Jupiter",
            mass: 3.6e16,  // kg
            orbitalRadius: 128852,  // km
            radius: 21.5,  // km
            orbitalPeriod: 0.295,  // days
            orbitalInclination: 0.06,  // degrees
            eccentricity: 0.0012,
            color: "#8B4513",  // reddish-brown
            orbitalSpeed: 31.5,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.295,  // days (synchronous)
            surfaceTemp: -160,  // °C
            gravity: 0.005,  // m/s²
            gravitationalAcceleration: 0.005  // m/s²
        },
        {
            name: "Himalia",
            id: "jupiter-himalia",
            parentName: "Jupiter",
            mass: 6.7e18,  // kg
            orbitalRadius: 11461000,  // km
            radius: 85,  // km
            orbitalPeriod: 250.56,  // days
            orbitalInclination: 27.498,  // degrees
            eccentricity: 0.162,
            color: "#808080",  // grey
            orbitalSpeed: 3.3,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 7.782,  // hours
            surfaceTemp: -150,  // °C
            gravity: 0.062,  // m/s²
            gravitationalAcceleration: 0.062  // m/s²
        },
        {
            name: "Elara",
            id: "jupiter-elara",
            parentName: "Jupiter",
            mass: 8.7e17,  // kg
            orbitalRadius: 11741000,  // km
            radius: 43,  // km
            orbitalPeriod: 259.64,  // days
            orbitalInclination: 26.63,  // degrees
            eccentricity: 0.217,
            color: "#808080",  // grey
            orbitalSpeed: 3.3,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.5,  // days (approximate)
            surfaceTemp: -150,  // °C
            gravity: 0.031,  // m/s²
            gravitationalAcceleration: 0.031  // m/s²
        },
        {
            name: "Pasiphae",
            id: "jupiter-pasiphae",
            parentName: "Jupiter",
            mass: 1.91e17,  // kg
            orbitalRadius: 23624000,  // km
            radius: 30,  // km
            orbitalPeriod: 743.63,  // days (retrograde)
            orbitalInclination: 151.431,  // degrees (retrograde)
            eccentricity: 0.409,
            color: "#696969",  // dark grey
            orbitalSpeed: 2.2,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.3,  // days (approximate)
            surfaceTemp: -150,  // °C
            gravity: 0.003,  // m/s²
            gravitationalAcceleration: 0.003  // m/s²
        }
    ],
    Saturn: [
        {
            name: "Dione",
            id: "saturn-dione",
            parentName: "Saturn",
            mass: 1.095452e21,
            orbitalRadius: 377396,
            radius: 561.7,
            orbitalPeriod: 2.737,
            orbitalInclination: 0.02,
            eccentricity: 0.0022,
            color: "#D9D9D9",
            orbitalSpeed: 10.03,
            axialTilt: 0.0,
            rotationPeriod: 2.737,
            surfaceTemp: -186, // °C
            gravity: 0.232, // m/s^2
            gravitationalAcceleration: 0.232, // m/s^2
        },
        {
            name: "Enceladus",
            id: "saturn-enceladus",
            parentName: "Saturn",
            mass: 1.08022e20,
            orbitalRadius: 237948,
            radius: 252.1,
            orbitalPeriod: 1.37,
            orbitalInclination: 0.02,
            eccentricity: 0.0047,
            color: "#FFFFFF",
            orbitalSpeed: 12.64,
            axialTilt: 0.0,
            rotationPeriod: 1.37,
            surfaceTemp: -201, // °C
            gravity: 0.113, // m/s^2
            gravitationalAcceleration: 0.113, // m/s^2
        },
        {
            name: "Iapetus",
            id: "saturn-iapetus",
            parentName: "Saturn",
            mass: 1.805635e21,
            orbitalRadius: 3560820,
            radius: 734.5,
            orbitalPeriod: 79.322,
            orbitalInclination: 7.52,
            eccentricity: 0.0286,
            color: "#FFFFFF",
            orbitalSpeed: 3.26,
            axialTilt: 0.0,
            rotationPeriod: 79.322,
            surfaceTemp: { min: -143, max: -173 }, // °C
            gravity: 0.223, // m/s^2
            gravitationalAcceleration: 0.223, // m/s^2
        },
        {
            name: "Mimas",
            id: "saturn-mimas",
            parentName: "Saturn",
            mass: 3.7493e19,
            orbitalRadius: 185539,
            radius: 198.2,
            orbitalPeriod: 0.942,
            orbitalInclination: 1.53,
            eccentricity: 0.0196,
            color: "#E0E0E0",
            orbitalSpeed: 14.28,
            axialTilt: 0.0,
            rotationPeriod: 0.942,
            surfaceTemp: -200, // °C
            gravity: 0.064, // m/s^2
            gravitationalAcceleration: 0.064, // m/s^2
        },
        {
            name: "Rhea",
            id: "saturn-rhea",
            parentName: "Saturn",
            mass: 2.306518e21,
            orbitalRadius: 527108,
            radius: 763.8,
            orbitalPeriod: 4.518,
            orbitalInclination: 0.35,
            eccentricity: 0.0012,
            color: "#D3D3D3",
            orbitalSpeed: 8.48,
            axialTilt: 0.0,
            rotationPeriod: 4.518,
            surfaceTemp: -174, // °C
            gravity: 0.264, // m/s^2
            gravitationalAcceleration: 0.264, // m/s^2
        },
        {
            name: "Tethys",
            id: "saturn-tethys",
            parentName: "Saturn",
            mass: 6.17449e20,
            orbitalRadius: 294619,
            radius: 531.1,
            orbitalPeriod: 1.888,
            orbitalInclination: 1.12,
            eccentricity: 0.0001,
            color: "#F5F5F5",
            orbitalSpeed: 11.35,
            axialTilt: 0.0,
            rotationPeriod: 1.888,
            surfaceTemp: -187, // °C
            gravity: 0.145, // m/s^2
            gravitationalAcceleration: 0.145, // m/s^2
        },
        {
            name: "Titan",
            id: "saturn-titan",
            parentName: "Saturn",
            mass: 1.3452e23,
            orbitalRadius: 1221870,
            radius: 2574.73,
            orbitalPeriod: 15.945,
            orbitalInclination: 0.33,
            eccentricity: 0.0288,
            color: "#FFCC99",
            orbitalSpeed: 5.57,
            axialTilt: 0.3,
            rotationPeriod: 15.945,
            surfaceTemp: -179, // °C
            gravity: 1.352, // m/s^2
            gravitationalAcceleration: 1.352, // m/s^2
        },
        // Additional
        {
            name: "Hyperion",
            id: "saturn-hyperion",
            parentName: "Saturn",
            mass: 5.6e18,  // kg
            orbitalRadius: 1481100,  // km
            radius: 135,  // km (average, irregular shape)
            orbitalPeriod: 21.276,  // days
            orbitalInclination: 0.43,  // degrees
            eccentricity: 0.123,  // most eccentric of Saturn's regular moons
            color: "#8B4513",  // reddish-brown
            orbitalSpeed: 5.07,  // km/s
            axialTilt: 61,  // degrees (chaotic rotation)
            rotationPeriod: 13.8,  // days (non-synchronous, chaotic)
            surfaceTemp: -180,  // °C
            gravity: 0.017,  // m/s²
            gravitationalAcceleration: 0.017  // m/s²
        },
        {
            name: "Phoebe",
            id: "saturn-phoebe",
            parentName: "Saturn",
            mass: 8.292e18,  // kg
            orbitalRadius: 12952000,  // km
            radius: 106.5,  // km
            orbitalPeriod: 550.31,  // days (retrograde)
            orbitalInclination: 175.3,  // degrees (retrograde)
            eccentricity: 0.163,
            color: "#4A4A4A",  // dark grey
            orbitalSpeed: 1.71,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 9.274,  // hours
            surfaceTemp: -193,  // °C
            gravity: 0.049,  // m/s²
            gravitationalAcceleration: 0.049  // m/s²
        },
        {
            name: "Janus",
            id: "saturn-janus",
            parentName: "Saturn",
            mass: 1.898e18,  // kg
            orbitalRadius: 151472,  // km
            radius: 89.5,  // km
            orbitalPeriod: 0.695,  // days
            orbitalInclination: 0.163,  // degrees
            eccentricity: 0.0068,
            color: "#C0C0C0",  // grey
            orbitalSpeed: 15.75,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.695,  // days (synchronous)
            surfaceTemp: -178,  // °C
            gravity: 0.011,  // m/s²
            gravitationalAcceleration: 0.011  // m/s²
        },
        {
            name: "Epimetheus",
            id: "saturn-epimetheus",
            parentName: "Saturn",
            mass: 5.266e17,  // kg
            orbitalRadius: 151422,  // km
            radius: 58.1,  // km
            orbitalPeriod: 0.694,  // days
            orbitalInclination: 0.351,  // degrees
            eccentricity: 0.0098,
            color: "#C0C0C0",  // grey
            orbitalSpeed: 15.75,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.694,  // days (synchronous)
            surfaceTemp: -178,  // °C
            gravity: 0.007,  // m/s²
            gravitationalAcceleration: 0.007  // m/s²
        },
        {
            name: "Pan",
            id: "saturn-pan",
            parentName: "Saturn",
            mass: 4.95e15,  // kg
            orbitalRadius: 133584,  // km
            radius: 14.1,  // km
            orbitalPeriod: 0.575,  // days
            orbitalInclination: 0,  // degrees
            eccentricity: 0,
            color: "#E5E5E5",  // light grey
            orbitalSpeed: 16.9,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.575,  // days (synchronous)
            surfaceTemp: -178,  // °C
            gravity: 0.0014,  // m/s²
            gravitationalAcceleration: 0.0014  // m/s²
        },
        {
            name: "Atlas",
            id: "saturn-atlas",
            parentName: "Saturn",
            mass: 6.6e15,  // kg
            orbitalRadius: 137670,  // km
            radius: 15.1,  // km
            orbitalPeriod: 0.602,  // days
            orbitalInclination: 0.003,  // degrees
            eccentricity: 0.0012,
            color: "#E5E5E5",  // light grey
            orbitalSpeed: 16.6,  // km/s
            axialTilt: 0,  // degrees
            rotationPeriod: 0.602,  // days (synchronous)
            surfaceTemp: -178,  // °C
            gravity: 0.0015,  // m/s²
            gravitationalAcceleration: 0.0015  // m/s²
        }
    ],
    Uranus: [
        {
            name: "Ariel",
            id: "uranus-ariel",
            parentName: "Uranus",
            mass: 1.353e21,
            orbitalRadius: 191020,
            radius: 578.9,
            orbitalPeriod: 2.52,
            orbitalInclination: 0.26,
            eccentricity: 0.0012,
            color: "grey",
            orbitalSpeed: 5.51,
            axialTilt: 0.0,
            rotationPeriod: 2.52,
            surfaceTemp: -213, // °C
            gravity: 0.269, // m/s^2
            gravitationalAcceleration: 0.269, // m/s^2
        },
        {
            name: "Miranda",
            id: "uranus-miranda",
            parentName: "Uranus",
            mass: 6.59e19,
            orbitalRadius: 129900,
            radius: 235.8,
            orbitalPeriod: 1.413,
            orbitalInclination: 4.34,
            eccentricity: 0.0013,
            color: "grey",
            orbitalSpeed: 6.66,
            axialTilt: 0.0,
            rotationPeriod: 1.413,
            surfaceTemp: -187, // °C
            gravity: 0.079, // m/s^2
            gravitationalAcceleration: 0.079, // m/s^2
        },
        {
            name: "Oberon",
            id: "uranus-oberon",
            parentName: "Uranus",
            mass: 3.014e21,
            orbitalRadius: 583520,
            radius: 761.4,
            orbitalPeriod: 13.463,
            orbitalInclination: 0.1,
            eccentricity: 0.0014,
            color: "grey",
            orbitalSpeed: 3.15,
            axialTilt: 0.0,
            rotationPeriod: 13.463,
            surfaceTemp: -193, // °C
            gravity: 0.346, // m/s^2
            gravitationalAcceleration: 0.346, // m/s^2
        },
        {
            name: "Titania",
            id: "uranus-titania",
            parentName: "Uranus",
            mass: 3.527e21,
            orbitalRadius: 436300,
            radius: 788.9,
            orbitalPeriod: 8.706,
            orbitalInclination: 0.14,
            eccentricity: 0.0011,
            color: "grey",
            orbitalSpeed: 3.64,
            axialTilt: 0.0,
            rotationPeriod: 8.706,
            surfaceTemp: -203, // °C
            gravity: 0.379, // m/s^2
            gravitationalAcceleration: 0.379, // m/s^2
        },
        {
            name: "Umbriel",
            id: "uranus-umbriel",
            parentName: "Uranus",
            mass: 1.172e21,
            orbitalRadius: 266000,
            radius: 584.7,
            orbitalPeriod: 4.144,
            orbitalInclination: 0.36,
            eccentricity: 0.0039,
            color: "grey",
            orbitalSpeed: 4.67,
            axialTilt: 0.0,
            rotationPeriod: 4.144,
            surfaceTemp: -208, // °C
            gravity: 0.23, // m/s^2
            gravitationalAcceleration: 0.23, // m/s^2
        },
    ],
    Neptune: [
        {
            name: "Nereid",
            id: "neptune-nereid",
            parentName: "Neptune",
            mass: 3.1e20,
            orbitalRadius: 5513800,
            radius: 170,
            orbitalPeriod: 360.1362,
            orbitalInclination: 7.23,
            eccentricity: 0.7507,
            color: "grey",
            orbitalSpeed: 1.12,
            axialTilt: null,
            rotationPeriod: null,
            surfaceTemp: -235, // °C
            gravity: null,
            gravitationalAcceleration: null,
        },
        // {
        //     name: "Triton",
        //     id: "neptune-triton",
        //     parentName: "Neptune",
        //     mass: 2.14e22,
        //     orbitalRadius: 354800,
        //     radius: 1353.4,
        //     orbitalPeriod: -5.877,
        //     orbitalInclination: 156.885,
        //     eccentricity: 0.000016,
        //     color: "lightblue",
        //     orbitalSpeed: 4.39,
        //     axialTilt: 0.0,
        //     rotationPeriod: -5.877,
        //     surfaceTemp: -235, // °C
        //     gravity: 0.779, // m/s^2
        //     gravitationalAcceleration: 0.779, // m/s^2
        // },
        // Additional
        {
            name: "Proteus",
            id: "neptune-proteus",
            parentName: "Neptune",
            mass: 4.4e19,  // kg
            orbitalRadius: 117647,  // km
            radius: 210,  // km
            orbitalPeriod: 1.122,  // days
            orbitalInclination: 0.524,  // degrees
            eccentricity: 0.00053,
            color: "grey",
            orbitalSpeed: 7.62,  // km/s
            axialTilt: 0.0,  // degrees
            rotationPeriod: 1.122,  // days (synchronous)
            surfaceTemp: -235,  // °C
            gravity: 0.07,  // m/s²
            gravitationalAcceleration: 0.07,  // m/s²
        },
        {
            name: "Larissa",
            id: "neptune-larissa",
            parentName: "Neptune",
            mass: 4.2e18,  // kg
            orbitalRadius: 73548,  // km
            radius: 97,  // km
            orbitalPeriod: 0.555,  // days
            orbitalInclination: 0.205,  // degrees
            eccentricity: 0.00139,
            color: "grey",
            orbitalSpeed: 9.65,  // km/s
            axialTilt: 0.0,  // degrees
            rotationPeriod: 0.555,  // days (synchronous)
            surfaceTemp: -235,  // °C
            gravity: 0.03,  // m/s²
            gravitationalAcceleration: 0.03,  // m/s²
        },
        {
            name: "Galatea",
            id: "neptune-galatea",
            parentName: "Neptune",
            mass: 2.12e18,  // kg
            orbitalRadius: 61953,  // km
            radius: 88,  // km
            orbitalPeriod: 0.429,  // days
            orbitalInclination: 0.054,  // degrees
            eccentricity: 0.00022,
            color: "grey",
            orbitalSpeed: 10.51,  // km/s
            axialTilt: 0.0,  // degrees
            rotationPeriod: 0.429,  // days (synchronous)
            surfaceTemp: -235,  // °C
            gravity: 0.02,  // m/s²
            gravitationalAcceleration: 0.02,  // m/s²
        },
        {
            name: "Despina",
            id: "neptune-despina",
            parentName: "Neptune",
            mass: 2.2e18,  // kg
            orbitalRadius: 52526,  // km
            radius: 75,  // km
            orbitalPeriod: 0.335,  // days
            orbitalInclination: 0.068,  // degrees
            eccentricity: 0.00023,
            color: "grey",
            orbitalSpeed: 11.41,  // km/s
            axialTilt: 0.0,  // degrees
            rotationPeriod: 0.335,  // days (synchronous)
            surfaceTemp: -235,  // °C
            gravity: 0.02,  // m/s²
            gravitationalAcceleration: 0.02,  // m/s²
        },
        {
            name: "Thalassa",
            id: "neptune-thalassa",
            parentName: "Neptune",
            mass: 3.5e17,  // kg
            orbitalRadius: 50074,  // km
            radius: 41,  // km
            orbitalPeriod: 0.311,  // days
            orbitalInclination: 0.135,  // degrees
            eccentricity: 0.00018,
            color: "grey",
            orbitalSpeed: 11.69,  // km/s
            axialTilt: 0.0,  // degrees
            rotationPeriod: 0.311,  // days (synchronous)
            surfaceTemp: -235,  // °C
            gravity: 0.01,  // m/s²
            gravitationalAcceleration: 0.01,  // m/s²
        },
        {
            name: "Naiad",
            id: "neptune-naiad",
            parentName: "Neptune",
            mass: 1.9e17,  // kg
            orbitalRadius: 48227,  // km
            radius: 33,  // km
            orbitalPeriod: 0.294,  // days
            orbitalInclination: 4.75,  // degrees
            eccentricity: 0.00037,
            color: "grey",
            orbitalSpeed: 11.93,  // km/s
            axialTilt: 0.0,  // degrees
            rotationPeriod: 0.294,  // days (synchronous)
            surfaceTemp: -235,  // °C
            gravity: 0.01,  // m/s²
            gravitationalAcceleration: 0.01,  // m/s²
        }
    ],
};

export default moonsData;

// Find a moon by its name and parent planet name
export const findMoonByName = (moonName, parentPlanetName) => {
    // Check if the parent planet exists and has moons
    const planetMoons = moonsData[parentPlanetName];
    if (!planetMoons) return null;

    // Find the specific moon
    return planetMoons.find((moon) => moon.name === moonName);
};

// Alternative method using Object.entries if you only have the moon name
export const findMoonAndParent = (moonName) => {
    for (const [planetName, moons] of Object.entries(moonsData)) {
        const moon = moons.find((moon) => moon.name === moonName);
        if (moon) {
            return {
                moon,
                parentPlanet: planetName,
            };
        }
    }
    return null;
};