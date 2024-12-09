import { create } from "zustand";

// Define interface
interface SidebarToggle {
  toggleCollapse: boolean;
  invokeToggleCollapse: () => void;
}

// Create Zustand store
export const useSideBarToggle = create<SidebarToggle>((set, get) => ({
  toggleCollapse: false,
  invokeToggleCollapse: () => set({ toggleCollapse: !get().toggleCollapse }),
}));

// // Export toggleCollapse and invokeToggleCollapse
// export const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle;
