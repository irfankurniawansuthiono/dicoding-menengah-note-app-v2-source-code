import { getArchivedNotes } from "../../Api/Api";
import { useArchivedNotesStore } from "../../Zustand/ArchivedNotesStore";
const ArchivedNotesDB = async () => {
  try {
    const notes = await getArchivedNotes();
    useArchivedNotesStore.setState({ archivedNotes: notes.data });
    return true;
  } catch (error) {
    return false;
  }
};
export default async function fetchArchivedNotesZustand() {
  const result = await ArchivedNotesDB();
  return result;
}
