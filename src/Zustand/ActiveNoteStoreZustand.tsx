import { create } from "zustand";
type activeNotesProps = {
  activeNotes: [];
  setActiveNote: (notes: []) => void;
};
export const useActiveNoteStore = create<activeNotesProps>((set) => ({
  activeNotes: [],
  setActiveNote: (notes: []) => set({ activeNotes: notes }),
}));
