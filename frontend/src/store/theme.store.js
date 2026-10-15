import { create } from "zustand";
import { persist } from "zustand/middleware";

/** @typedef {"light" | "dark" | "system"} Theme */

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "ui-theme" },
  ),
);
