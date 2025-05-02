import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("lanGG-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("lanGG-theme", theme);
    set({ theme });
  },
}));
