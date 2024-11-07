import { create } from "zustand";

interface HeaderState {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  headerTitle: "",
  setHeaderTitle: (title: string) => {
    set({ headerTitle: title });
    document.title = title ? title + " - AI-CuaDong" : "AI-CuaDong";
  },
}));
