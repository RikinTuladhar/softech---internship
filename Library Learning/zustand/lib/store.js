'use client'
const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  remove: () => set({ bears: 0 }),
  updateBears: () => set({ bears: newBears }),
}));
