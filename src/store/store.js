import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'
import * as THREE from 'three';
import initialPlanetsData from '../data/planetsData';

const useStore = create((set, get) => ({
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

    orbitPaths: true,
    toggleOrbitPaths: () => set(state => ({ orbitPaths: !state.orbitPaths })),

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
    simulationDate: new Date('2024-01-18'),  // Starting date
    // Update rotation count for a planet
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
    // previousCameraTarget: new THREE.Vector3(),
    setOrbitControls: (controls) => set({ orbitControls: controls }),

    // setCameraTarget: (position) => {
    //     const { orbitControls } = get();
    //     if (orbitControls) {
    //         orbitControls.target.copy(position);
    //         orbitControls.update();
    //     }
    // },

    resetCamera: () => {
        const { orbitControls } = get();
        if (orbitControls) {
            orbitControls.target.set(0, 0, 0); // Assuming the sun is at the origin
            orbitControls.update();
        }
    },
}));

export default useStore;


const usePlanetStore = create(immer((set, get) => ({
    showResetPlanetModal: false,
    toggleResetPlanetModal: (newState) => set(state => ({ showResetPlanetModal: newState })),

    showResetAllModal: false,
    toggleResetAllModal: (newState) => set(state => ({ showResetAllModal: newState })),

    // Existing store properties and methods
    displayLabels: false, // render planet names in scene
    toggleDisplayLabels: () => set((state) => ({ displayLabels: !state.displayLabels })),

    planetPositions: {},
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

    selectedMoon: null,
    setSelectedMoon: (moonData) =>
        set(() => ({
            selectedMoon: moonData,
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
    // Action to reset all planetsData to initial state
    resetPlanetsData: () => {
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
})));


const useCameraStore = create((set) => ({
    satelliteCamera: false,
    toggleSatelliteCamera: (newState) => set(() => ({ satelliteCamera: newState })),
    isCameraTransitioning: false,
    toggleCameraTransitioning: (newState) => set(() => ({ isCameraTransitioning: newState })),

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

    triggerReset: null, // Placeholder for a function to reset the camera
    setTriggerReset: (newState) => set({ triggerReset: newState }),
}));



export { usePlanetStore, useCameraStore }