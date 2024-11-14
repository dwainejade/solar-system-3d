import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as THREE from 'three';
import initialPlanetsData, { distanceScaleFactor } from '../data/planetsData';
import initialMoonsData from '../data/moonsData';
import useExperimentsStore from './experiments';

const useStore = create((set, get) => ({
    isLoading: true,
    isBackgroundLoaded: false,
    viewOnlyMode: false,
    simSpeed: 1, // 1 is real-time speed
    prevSpeed: 1,
    fullscreen: false,
    showDetailsMenu: false,
    isEditing: false, // Allow user to edit planet data
    showConstellations: false,
    sunSettings: {
        position: new THREE.Vector3(0, 0, 0),
    },
    // earthPosition: new THREE.Vector3(10, 0, 0), // Initial position
    rotationCounts: {}, // Tracks the number of rotations for each planet
    simulationDate: new Date(2000, 0, 1), // Starting date
    camera: new THREE.PerspectiveCamera(),
    orbitControls: null,
    previousCameraPosition: new THREE.Vector3(),

    // Functions (actions)
    toggleLoading: (newState) => set({ isLoading: newState }),
    toggleBackgroundLoaded: (newState) => set({ isBackgroundLoaded: newState }),
    setViewOnlyMode: (newState) => set({ viewOnlyMode: newState }),
    setSimSpeed: (newSpeed) => set({ simSpeed: newSpeed }),
    setPrevSpeed: (newSpeed) => set({ prevSpeed: newSpeed }),
    toggleFullscreen: () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error('Failed to enter full-screen mode:', e);
            });
            set({ fullscreen: true });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch((e) => {
                    console.error('Failed to exit full-screen mode:', e);
                });
                set({ fullscreen: false });
            }
        }
    },
    toggleDetailsMenu: (newState) => set({ showDetailsMenu: newState }),
    setIsEditing: (newState) => set({ isEditing: newState }),
    toggleConstellations: () =>
        set((state) => ({ showConstellations: !state.showConstellations })),
    setEarthOrbit: (newSettings) =>
        set((state) => ({
            earthSettings: { ...state.earthSettings, ...newSettings },
        })),
    setEarthPosition: (position) => set({ earthPosition: position }),
    setMoonOrbit: (newSettings) =>
        set((state) => ({
            moonSettings: { ...state.moonSettings, ...newSettings },
        })),
    updateRotationCount: (planetName, additionalCount) =>
        set((state) => {
            const currentCount = state.rotationCounts[planetName] || 0;
            return {
                rotationCounts: {
                    ...state.rotationCounts,
                    [planetName]: currentCount + additionalCount,
                },
            };
        }),
    incrementDate: () =>
        set((state) => ({
            simulationDate: new Date(
                state.simulationDate.setDate(state.simulationDate.getDate() + 1)
            ),
        })),
    setOrbitControls: (controls) => set({ orbitControls: controls }),

    resetAllData: () => {
        const { resetPlanetsData } = usePlanetStore.getState();
        resetPlanetsData();

        set({
            planetsData: initialPlanetsData,
            moonsData: initialMoonsData,
            rotationCounts: {},
            simulationDate: new Date(2000, 0, 1),
        });
    },
}));

export default useStore;


const usePlanetStore = create(
    persist(
        immer((set, get) => ({
            orbitPaths: true,
            toggleOrbitPaths: () => set(state => ({ orbitPaths: !state.orbitPaths })),

            displayLabels: false, // render planet names in scene
            toggleDisplayLabels: () => set((state) => ({ displayLabels: !state.displayLabels })),

            showResetPlanetModal: false,
            toggleResetPlanetModal: (newState) => set({ showResetPlanetModal: newState }),

            showResetAllModal: false,
            toggleResetAllModal: (newState) => set({ showResetAllModal: newState }),

            planetPositions: { Sun: { x: 0, y: 0, z: 0 } },
            updatePlanetPosition: (name, position) =>
                set((state) => ({
                    planetPositions: { ...state.planetPositions, [name]: position },
                })),

            planetAngles: {},
            updatePlanetAngle: (name, angle) =>
                set((state) => ({
                    planetAngles: { ...state.planetAngles, [name]: angle },
                })),

            selectedPlanet: null,
            setSelectedPlanet: (planetData) =>
                set(() => ({
                    selectedPlanet: planetData,
                })),

            planetsData: initialPlanetsData,
            updatePlanetData: (planetName, updates) => {
                set((state) => {
                    if (state.planetsData[planetName]) {
                        Object.keys(updates).forEach(key => {
                            state.planetsData[planetName][key] = updates[key];
                        });
                    }
                });
            },
            resetPlanetsData: () => {
                // localStorage.removeItem('solar-system-planets');
                set((state) => {
                    state.planetsData = initialPlanetsData;
                });
            },
            resetSinglePlanetData: (planetName) => {
                set((state) => {
                    if (state.planetsData[planetName] && initialPlanetsData[planetName]) {
                        state.planetsData[planetName] = initialPlanetsData[planetName];
                    }
                });
            },

            moonsData: initialMoonsData,
            updateMoonData: (parentName, moonName, updates) => {
                set((state) => {
                    // Create a full copy of the moonsData structure to ensure immutability
                    const newMoonsData = {
                        ...state.moonsData,
                        [parentName]: state.moonsData[parentName].map((moon) =>
                            moon.name === moonName
                                ? { ...moon, ...updates } // Update the specific moon with new data
                                : moon // Keep other moons unchanged
                        ),
                    };

                    // Return the full updated moonsData to avoid overwriting other parts
                    return { moonsData: newMoonsData };
                });
            },
            resetMoonData: (parentName, moonName) => {
                set(state => {
                    const parentMoons = initialMoonsData[parentName];
                    if (parentMoons) {
                        const moonIndex = state.moonsData[parentName].findIndex(
                            moon => moon.name === moonName
                        );
                        const initialMoonIndex = parentMoons.findIndex(
                            moon => moon.name === moonName
                        );

                        if (moonIndex !== -1 && initialMoonIndex !== -1) {
                            state.moonsData[parentName][moonIndex] = {
                                ...parentMoons[initialMoonIndex]
                            };
                        }
                    }
                });
            },
            resetAllMoonData: () => {
                set(state => {
                    state.moonsData = JSON.parse(JSON.stringify(initialMoonsData));
                });
            },


            handleBodyReset: () => set((state) => {
                const activeCamera = useCameraStore.getState().activeCamera;

                if (activeCamera.type === 'planet') {
                    if (state.planetsData[activeCamera.name] && initialPlanetsData[activeCamera.name]) {
                        state.planetsData[activeCamera.name] = initialPlanetsData[activeCamera.name];
                    }
                } else if (activeCamera.type === 'moon') {
                    if (state.moonsData[activeCamera.parentName]) {
                        const initialMoonData = initialMoonsData[activeCamera.parentName]?.find(
                            moon => moon.name === activeCamera.name
                        );
                        if (initialMoonData) {
                            state.moonsData[activeCamera.parentName] = state.moonsData[activeCamera.parentName].map(
                                moon => moon.name === activeCamera.name ? initialMoonData : moon
                            );
                        }
                    }
                }
                state.showResetPlanetModal = true;
                return state;
            }),

            selectedMoon: null,
            setSelectedMoon: (moonData) =>
                set(() => ({
                    selectedMoon: moonData,
                })),
            moonPositions: {},
            updateMoonPosition: (name, position) =>
                set((state) => ({
                    moonPositions: { ...state.moonPositions, [name]: position },
                })),
            moonWorldPositions: {},
            updateMoonWorldPosition: (name, position) =>
                set((state) => ({
                    moonWorldPositions: { ...state.moonWorldPositions, [name]: position },
                })),
            moonAngles: {},
            updateMoonAngle: (name, angle) =>
                set((state) => ({
                    moonAngles: { ...state.moonAngles, [name]: angle },
                })),
        })),
        // storage:
        {
            name: 'solar-system-planets',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ // only save these properties to storage
                planetsData: state.planetsData,
                planetPositions: state.planetPositions,
                planetAngles: state.planetAngles,
                moonPositions: state.moonPositions,
                moonWorldPositions: state.moonWorldPositions,
                moonAngles: state.moonAngles,
                displayLabels: state.displayLabels,
                orbitPaths: state.orbitPaths,
            }),
        },
    ));

// type CameraTarget = {
//     type: 'planet' | 'moon' | 'asteroid' | 'custom' | 'orbit',
//     name: string,
//     position: Vector3,
//     lookAt: Vector3,
//     radius: number,
//     rotationPeriod?: number,
//     axialTilt?: number,
//     custom?: any // for any special handling
// }

const defaultCamera = {
    type: 'orbit',
    name: 'default',
    parentName: null,
    position: new THREE.Vector3(7000, 6000, -6000),
    lookAt: new THREE.Vector3(0, 0, 0),
}

const customCameraAngles = {
    'Asteroid Belt': {
        title: 'Asteroid Belt',
        position: [-700, 2200, 6600],
        target: [0, 0, 0]
    },
    'Kepler-2': {
        title: 'Kepler-2',
        calculatePosition: (planet) => {
            if (!planet) return [-700, 2200, 6600];

            const orbitalRadius = planet.orbitalRadius * distanceScaleFactor;
            const eccentricity = planet.eccentricity;
            // Calculate offset based on eccentricity
            const centerOffset = orbitalRadius * eccentricity;

            return [
                centerOffset,       // Offset x to account for eccentricity
                orbitalRadius * 2,  // Height above orbital plane
                0                   // Center on z-axis
            ];
        },
        calculateTarget: (planet) => {
            if (!planet) return [0, 0, 0];

            const orbitalRadius = planet.orbitalRadius * distanceScaleFactor;
            const centerOffset = orbitalRadius * planet.eccentricity;

            return [centerOffset, 0, 0]; // Target the center of the elliptical orbit
        }
    }
}

const useCameraStore = create((set, get) => ({
    activeCamera: defaultCamera,
    isCameraTransitioning: false,
    autoRotate: false,
    orbitControls: null,
    sceneCameras: [], // New state for actual camera instances/info
    satelliteCameraState: null, // Stores camera state for satellite camera

    setSatelliteCameraState: (position, rotation, targetPosition) => set({
        satelliteCameraState: {
            position,
            rotation,
            targetPosition
        }
    }),

    setSceneCameras: (cameras) => set({ sceneCameras: cameras }),

    getCameraByName: (name) => {
        const { sceneCameras } = get();
        return sceneCameras.find(cam => cam.name === name);
    },

    getActiveCamera: () => {
        const { sceneCameras } = get();
        return sceneCameras.find(cam => cam.isDefault);
    },

    updateCameraState: (name, state) => {
        const { sceneCameras } = get();
        const updatedCameras = sceneCameras.map(cam =>
            cam.name === name
                ? { ...cam, ...state }
                : cam
        );
        set({ sceneCameras: updatedCameras });
    },
    // Modified activeCamera handling to include camera references
    setActiveCamera: (type, name, cameraRef = null) => set(state => {
        const newActiveCamera = {
            type,
            name,
            ref: cameraRef, // Store the actual camera reference
            position: state.activeCamera.position,
            lookAt: state.activeCamera.lookAt,
        };

        // Update sceneCameras if needed
        if (cameraRef) {
            const updatedCameras = state.sceneCameras.map(cam => ({
                ...cam,
                isDefault: cam.ref === cameraRef
            }));
            return {
                activeCamera: newActiveCamera,
                sceneCameras: updatedCameras
            };
        }

        return { activeCamera: newActiveCamera };
    }),

    // Modified switch functions to handle camera refs
    switchToPlanetCamera: (name, cameraRef) => {
        set({
            activeCamera: {
                type: 'planet',
                name,
                ref: cameraRef,
            },
            isCameraTransitioning: true
        });
    },

    switchToMoonCamera: (parentName, name, cameraRef) => {
        set({
            activeCamera: {
                type: 'moon',
                name,
                parentName,
                ref: cameraRef,
            },
            isCameraTransitioning: true
        });
    },

    // setOrbitControls: (controls) => set({
    //     orbitControls: controls
    // }),

    toggleCameraTransitioning: (newState) => set({
        isCameraTransitioning: newState
    }),

    setAutoRotate: (newState) => set({
        autoRotate: newState
    }),

    resetCamera: () => {
        const { orbitControls } = get();

        // Reset camera state
        set({
            activeCamera: defaultCamera,
            isCameraTransitioning: true,
            autoRotate: false,
            satelliteCamera: false,
            orbitCamera: true,
            selectedMoonCameraActive: false,
            isZoomingToSun: false,
            isSurfaceCameraActive: false,
            surfacePoint: null,
            cameraSurfacePoint: null,
            surfaceNormal: [0, 1, 0],
            cameraSurfaceNormal: [0, 1, 0],
            cameraTarget: defaultCamera.lookAt,
            satelliteCameraState: {
                position: null,
                rotation: null,
                targetPosition: null
            }
        });

        // Reset orbit controls if they exist
        if (orbitControls) {
            orbitControls.target.set(0, 0, 0);
            orbitControls.object.position.set(
                defaultCamera.position.x,
                defaultCamera.position.y,
                defaultCamera.position.z
            );
            orbitControls.update();
        }

        // Reset selections in planet store
        const { setSelectedPlanet, setSelectedMoon } = usePlanetStore.getState();
        setSelectedPlanet(null);
        setSelectedMoon(null);
    },

    switchToSunCamera: () => {
        set({
            activeCamera: {
                type: 'orbit',
                name: 'Sun'
            }
        });
    },

    // switchToPlanetCamera: (name) => {
    //     set({
    //         activeCamera: {
    //             type: 'planet',
    //             name
    //         },
    //         isCameraTransitioning: true
    //     });
    // },

    // switchToMoonCamera: (parentName, name) => {
    //     set({
    //         activeCamera: {
    //             type: 'moon',
    //             name,
    //             parentName
    //         },
    //         isCameraTransitioning: true
    //     });
    // },

    switchToCustomCamera: (id, planet = null) => {
        const customCameraData = customCameraAngles[id];
        if (!customCameraData) return;

        const position = customCameraData.calculatePosition
            ? customCameraData.calculatePosition(planet)
            : customCameraData.position;

        const target = customCameraData.calculateTarget
            ? customCameraData.calculateTarget(planet)
            : customCameraData.target;

        set({
            activeCamera: {
                type: 'custom',
                name: customCameraData.title,
                position: new THREE.Vector3(...position),
                target: new THREE.Vector3(...target),
                custom: { planet }
            },
            isCameraTransitioning: true
        });
    },

    // Legacy camera states - maintained for backward compatibility
    satelliteCamera: false,
    toggleSatelliteCamera: (newState) => set(() => ({ satelliteCamera: newState })),
    orbitCamera: true,
    toggleOrbitCamera: (newState) => set(() => ({ orbitCamera: newState })),
    selectedMoonCameraActive: false,
    setSelectedMoonCameraActive: (newState) => set(() => ({ selectedMoonCameraActive: newState })),
    isZoomingToSun: false,
    toggleZoomingToSun: (newState) => set(() => ({ isZoomingToSun: newState })),
    surfacePoint: null,
    setSurfacePoint: (surfacePoint) => set({ surfacePoint }),
    surfaceNormal: [0, 1, 0],
    setSurfaceNormal: (surfaceNormal) => set({ surfaceNormal }),
    cameraSurfacePoint: null,
    setCameraSurfacePoint: (cameraSurfacePoint) => set({ cameraSurfacePoint }),
    cameraSurfaceNormal: [0, 1, 0],
    setCameraSurfaceNormal: (cameraSurfaceNormal) => set({ cameraSurfaceNormal }),
    isSurfaceCameraActive: false,
    toggleSurfaceCamera: () => set((state) => ({ isSurfaceCameraActive: !state.isSurfaceCameraActive })),
    cameraTarget: new THREE.Vector3(),
    setCameraTarget: (target) => set({ cameraTarget: target }),
    satelliteCameraState: {
        position: null,
        rotation: null,
        targetPosition: null
    },
    setSatelliteCameraState: (position, rotation, targetPosition) => set({
        satelliteCameraState: { position, rotation, targetPosition }
    }),
}));

export { usePlanetStore, useCameraStore }