import { create } from "zustand";
type archivedNotesProps = {
  archivedNotes: [];
  setArchivedNotes: (notes: []) => void;
};
export const useArchivedNotesStore = create<archivedNotesProps>((set) => ({
  archivedNotes: [],
  setArchivedNotes: (notes: []) => set({ archivedNotes: notes }),
}));
