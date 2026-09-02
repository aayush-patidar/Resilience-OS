import { create } from 'zustand';

interface SimulationState {
  activeDisruption: any | null;
  setActiveDisruption: (disruption: any) => void;
  clearDisruption: () => void;
  recoverDisruption: () => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  activeDisruption: null,
  setActiveDisruption: (disruption) => set({ activeDisruption: disruption }),
  clearDisruption: () => set({ activeDisruption: null }),
  recoverDisruption: () => set((state) => ({
    activeDisruption: state.activeDisruption 
      ? { ...state.activeDisruption, status: 'RECOVERED' } 
      : null
  })),
}));
