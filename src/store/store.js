import { create } from 'zustand';
import * as THREE from 'three';

const useStore = create((set, get) => ({
    simSpeed: 1, // 1 is realtime speed
    setSimSpeed: (newSpeed) => set({ simSpeed: newSpeed }),

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

    orbitPaths: true,
    toggleOrbitPaths: () => set(state => ({ orbitPaths: !state.orbitPaths })),

    // constellations: false,
    // toggleConstellations: () => set(state => ({ constellations: !state.constellations })),

    // FPMode: false, 
    // toggleFPMode: () => set(state => ({ FPMode: !state.FPMode })),

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
    simulationDate: new Date('2024-01-01'),  // Starting date
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
    previousCameraTarget: new THREE.Vector3(),
    setOrbitControls: (controls) => set({ orbitControls: controls }),

    setCameraTarget: (position) => {
        const { orbitControls } = get();
        if (orbitControls) {
            orbitControls.target.copy(position);
            orbitControls.update();
        }
    },

    resetCamera: () => {
        const { orbitControls } = get();
        if (orbitControls) {
            orbitControls.target.set(0, 0, 0); // Assuming the sun is at the origin
            orbitControls.update();
        }
    },
}));

export default useStore;


const usePlanetStore = create((set) => ({
    displayLabels: true, // render planet names in scene
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

}));

export { usePlanetStore }