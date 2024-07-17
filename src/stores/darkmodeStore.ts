import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    const storedMode = localStorage.getItem("isDarkMode");
    return storedMode === "true";
  }
  return false;
};

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: getInitialDarkMode(),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", newMode.toString());
      return { isDarkMode: newMode };
    }),
  setDarkMode: (value: boolean) =>
    set(() => {
      localStorage.setItem("isDarkMode", value.toString());
      return { isDarkMode: value };
    }),
}));
