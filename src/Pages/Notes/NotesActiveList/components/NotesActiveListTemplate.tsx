import { useSearchParams } from "react-router-dom";
import { useActiveNoteStore } from "../../../../Zustand/ActiveNoteStoreZustand";
import { useEffect, useState } from "react";
import NoteCardTemplate from "../../components/NotesCard/NotesCard";
import SpinnerComponent from "../../../../Components/Spinner/Spinner";
import { Text, Center, SimpleGrid } from "@chakra-ui/react";
import { useLanguageStore } from "../../../../Zustand/UserPreferences";
import fetchActiveNotesZustand from "../../../../FetchWithZustand/fetchActiveNotes/fetchActiveNotesZustand";
type noteProps = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
};
export default function NotesActiveListTemplate() {
  const [loading, setLoading] = useState(true);
  const { language } = useLanguageStore();
  const { activeNotes } = useActiveNoteStore();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const result = async () => {
      return await fetchActiveNotesZustand();
    };
    result().then(() => setLoading(false));
  }, []);
  // setTimeout(() => {
  //   setLoading(false);
  // }, 2000);
  const query = searchParams.get("q");

  const filteredNotes = activeNotes.filter((note: noteProps) =>
    note.title.toLowerCase().includes(query?.toLowerCase() || "")
  );

  return loading ? (
    <SpinnerComponent />
  ) : query ? (
    filteredNotes.length > 0 ? (
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={{ base: 1, md: 4, lg: 6 }}
      >
        {filteredNotes.map((note: noteProps) => (
          <NoteCardTemplate
            key={note.id}
            {...note}
            link={"/notes/details?id="}
          />
        ))}
      </SimpleGrid>
    ) : (
      <Center>
        <Text>
          {language === "en"
            ? "Notes not found"
            : "Tidak ada catatan yang ditemukan"}
        </Text>
      </Center>
    )
  ) : activeNotes.length > 0 ? (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      gap={{ base: 1, md: 4, lg: 6 }}
    >
      {activeNotes.map((note: noteProps) => (
        <NoteCardTemplate key={note.id} {...note} link={"/notes/details?id="} />
      ))}
    </SimpleGrid>
  ) : (
    <Center>
      <Text>
        {language === "en" ? "No notes found" : "Tidak ada catatan ditemukan"}
      </Text>
    </Center>
  );
}
