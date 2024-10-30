import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
    experimentMode: false,
    experiment: null,
    experimentData: null,
};

const useExperimentsStore = create(
    persist(
        (set, get) => ({
            ...initialState,
            setExperimentMode: (newState) => set({ experimentMode: newState }),
            setExperimentData: (newData) => set({ experimentData: newData }),
            resetExperiment: () => set({ ...initialState }),
        }),
        {
            name: 'solar-system-experiments',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useExperimentsStore;