import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
    isExperimenting: false,
    experiment: null,
    experimentData: null,
};

export const useExperimentsStore = create(
    persist(
        (set, get) => ({
            ...initialState,
            setExperiment: (newState) => set({ experiment: newState }),
            setExperimentData: (newData) => set({ experimentData: newData }),
            resetExperiment: () => set({ ...initialState }),
        }),
        {
            name: 'solar-system-experiments',
            storage: createJSONStorage(() => localStorage),
        }
    )
);