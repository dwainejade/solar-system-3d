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
    experimentPlanet: 'Earth',
    newtonOneStatus: null,
};


const useExperimentsStore = create(
    persist(
        (set, get) => ({
            ...initialState,
            experimentMode: true,
            setExperimentStatus: (newStatus) => set({ experimentStatus: newStatus }),

            setNewtonOneStatus: (newStatus) => set({ newtonOneStatus: newStatus }),

            toggleExperimentMode: (newState) => set({ experimentMode: newState }),

            setExperimentPlanet: (newPlanet) => set({ experimentPlanet: newPlanet }),

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