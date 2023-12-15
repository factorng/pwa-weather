import { create } from 'zustand';

export const useStore = create((set) => ({
  cityId: 498817,
  searchHints: [],
  setCityName: (cityName) => set(() => ({ cityName })),
  setCityId: (cityId) => set(() => ({ cityId })),
  setSearchHints: (searchHints) => set(() => ({ searchHints: [...searchHints]  })),
}));
