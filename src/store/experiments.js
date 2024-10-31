import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import planetsData from "../data/planetsData";

const initialState = {
    experimentStatus: null,
    experiment: null,
    experimentType: null,
    experimentData: null,
    experimentsModal: false,
    initialPlanetsData: planetsData,
};

// const experimentCameraAngles = {
//     'kepler-1': {
//         title: "Kepler's First Law",
//         position: [0, 0, 0],
//         target: [0, 0, 0]
//     }
// }

const useExperimentsStore = create(
    persist(
        (set, get) => ({
            ...initialState,
            experimentMode: false,
            setExperimentStatus: (newStatus) => set({ experimentStatus: newStatus }),

            toggleExperimentMode: (newState) => set({ experimentMode: newState }),

            setExperimentMode: (newState) => set({ experimentMode: newState }),
            setExperimentData: (newData) => set({ experimentData: newData }),
            toggleExperimentsModal: (newState) => set({ experimentsModal: newState }),
            setExperimentType: (newType) => set({ experimentType: newType }),
            resetExperiments: () => set({ ...initialState }),
        }),
        {
            name: 'solar-system-experiments',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useExperimentsStore;