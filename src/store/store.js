import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as THREE from 'three';
import initialPlanetsData from '../data/planetsData';
import initialMoonsData from '../data/moonsData';

// add persitance to store
const useStore = create(
    (set, get) => ({
        isLoading: true,
        toggleLoading: (newSate) => set({ isLoading: newSate }),
        isBackgroundLoaded: false,
        toggleBackgroundLoaded: (newSate) => set({ isBackgroundLoaded: newSate }),

        viewOnlyMode: false,
        setViewOnlyMode: (newState) => set({ viewOnlyMode: newState }),

        simSpeed: 1, // 1 is realtime speed
        setSimSpeed: (newSpeed) => set({ simSpeed: newSpeed }),
        prevSpeed: 1,
        setPrevSpeed: (newSpeed) => set({ prevSpeed: newSpeed }),

        fullscreen: false,
        toggleFullscreen: () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch((e) => {
                    console.error("Failed to enter full-screen mode:", e);
                });
                set({ fullscreen: true });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen().catch((e) => {
                        console.error("Failed to exit full-screen mode:", e);
                    });
                    set({ fullscreen: false });
                }
            }
        },

        showDetailsMenu: false,
        toggleDetailsMenu: (newState) => set(state => ({ showDetailsMenu: newState })),

        isEditing: false, // allow user to edit planet data
        setIsEditing: (newState) => set({ isEditing: newState }),

        showConstellations: false,
        toggleConstellations: () => set(state => ({ showConstellations: !state.showConstellations })),

        sunSettings: {
            position: new THREE.Vector3(0, 0, 0),
        },

        setEarthOrbit: newSettings =>
            set(state => ({ earthSettings: { ...state.earthSettings, ...newSettings } })),
        earthPosition: new THREE.Vector3(10, 0, 0), // Initial position
        setEarthPosition: (position) => set({ earthPosition: position }),

        setMoonOrbit: newSettings =>
            set(state => ({ moonSettings: { ...state.moonSettings, ...newSettings } })),

        rotationCounts: {},  // Tracks the number of rotations for each planet
        simulationDate: new Date(2020, 0, 1),  // Starting date

        // Function to update rotation count
        updateRotationCount: (planetName, additionalCount) =>
            set(state => {
                const currentCount = state.rotationCounts[planetName] || 0;
                return {
                    rotationCounts: {
                        ...state.rotationCounts,
                        [planetName]: currentCount + additionalCount
                    }
                };
            }),
        // Increment the simulation date by one day
        incrementDate: () =>
            set((state) => ({
                simulationDate: new Date(state.simulationDate.setDate(state.simulationDate.getDate() + 1)),
            })),

        // cameraTarget: new THREE.Vector3(0, 0, 0),
        camera: new THREE.PerspectiveCamera(),
        orbitControls: null,
        previousCameraPosition: new THREE.Vector3(),
        setOrbitControls: (controls) => set({ orbitControls: controls }),

        // resetCamera: () => {
        //     const { orbitControls } = get();
        //     if (orbitControls) {
        //         orbitControls.target.set(0, 0, 0); // Assuming the sun is at the origin
        //         orbitControls.update();
        //     }
        // },
    }

    ));

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
            moonsData: initialMoonsData,
            updateMoonData: (moonName, updates) => {
                set((state) => {
                    if (state.moonsData[moonName]) {
                        Object.keys(updates).forEach(key => {
                            state.moonsData[moonName][key] = updates[key];
                        });
                    }
                });
            },
            // Action to reset all planetsData to initial state
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
        position: [5000, 1500, -5000],
        target: [0, 0, 0]
    }
}

const useCameraStore = create((set, get) => ({
    activeCamera: defaultCamera,
    isCameraTransitioning: false,
    autoRotate: false,
    orbitControls: null,

    setActiveCamera: (type, name) => set({
        activeCamera: { type, name }
    }),

    setOrbitControls: (controls) => set({
        orbitControls: controls
    }),

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

    switchToPlanetCamera: (name) => {
        set({
            activeCamera: {
                type: 'planet',
                name
            },
            isCameraTransitioning: true
        });
    },

    switchToMoonCamera: (parentName, name) => {
        set({
            activeCamera: {
                type: 'moon',
                name,
                parentName
            },
            isCameraTransitioning: true
        });
    },

    switchToCustomCamera: (id) => {
        // Get custom camera data
        const customCameraData = customCameraAngles[id];
        if (!customCameraData) return;
        const { position, target, title } = customCameraData;
        set({
            activeCamera: {
                type: 'custom',
                name: title,
                position: new THREE.Vector3(...position),
                target: new THREE.Vector3(...target)
            },
            isCameraTransitioning: true
        }
        );
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