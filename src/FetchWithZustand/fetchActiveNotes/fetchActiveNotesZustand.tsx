import { getActiveNotes } from "../../Api/Api";
import { useActiveNoteStore } from "../../Zustand/ActiveNoteStoreZustand";
const ActiveNotesDB = async () => {
  try {
    const notes = await getActiveNotes();
    useActiveNoteStore.setState({ activeNotes: notes.data });
    return true;
  } catch (error) {
    return false;
  }
};
export default async function fetchActiveNotesZustand() {
  const result = await ActiveNotesDB();
  return result;
}
