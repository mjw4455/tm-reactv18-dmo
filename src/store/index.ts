import { create } from "zustand";

export const useStore = create<{
  isDark: boolean;
  collapsed: boolean;
  currentMenu: string;
  updateCollapsed: () => void;
  updateIsDark: (isDark: boolean) => void;
  updateCurrentMenu: (menu: string) => void;
}>()((set) => ({
  isDark: false,
  currentMenu: "/dashboard",
  collapsed: false,
  updateIsDark: (isDark) => set(() => ({ isDark })),
  updateCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  updateCurrentMenu: (menu: string) => set(() => ({ currentMenu: menu })),
}));
