import { create } from 'zustand'

interface ExploreStore {
  isExploreOpen: boolean
  openExplore: () => void
  closeExplore: () => void
  toggleExplore: () => void
}

export const useExploreStore = create<ExploreStore>((set, get) => ({
  isExploreOpen: false,
  openExplore: () => { set({ isExploreOpen: true }) },
  closeExplore: () => set({ isExploreOpen: false }),
  toggleExplore: () => set((state) => ({ isExploreOpen: !state.isExploreOpen })),
}));