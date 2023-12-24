import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NoteCardTemplate from "../../components/NotesCard/NotesCard";
import SpinnerComponent from "../../../../Components/Spinner/Spinner";
import { Text, Center, SimpleGrid } from "@chakra-ui/react";
import { useLanguageStore } from "../../../../Zustand/UserPreferences";
import fetchArchivedNotesZustand from "../../../../FetchWithZustand/fetchArchivedNotes/fetchArchivedNotes";
import { useArchivedNotesStore } from "../../../../Zustand/ArchivedNotesStore";
type noteProps = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
};
export default function NotesArchivedListTemplate() {
  const [loading, setLoading] = useState(true);
  const { language } = useLanguageStore();
  const { archivedNotes } = useArchivedNotesStore();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const result = async () => {
      return await fetchArchivedNotesZustand();
    };
    result().then(() => setLoading(false));
  }, []);
  // setTimeout(() => {
  //   setLoading(false);
  // }, 2000);
  const query = searchParams.get("q");

  const filteredNotes = archivedNotes.filter((note: noteProps) =>
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
  ) : archivedNotes.length > 0 ? (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      gap={{ base: 1, md: 4, lg: 6 }}
    >
      {archivedNotes.map((note: noteProps) => (
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
