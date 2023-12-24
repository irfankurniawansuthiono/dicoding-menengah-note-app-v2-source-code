import { create } from "zustand";

type LanguageStore = {
  language: "en" | "id";
  setLanguage: (language: "en" | "id") => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language:
    (localStorage.getItem("language") as LanguageStore["language"]) || "en",
  setLanguage: (language) => {
    localStorage.setItem("language", language);
    set({ language });
  },
}));
