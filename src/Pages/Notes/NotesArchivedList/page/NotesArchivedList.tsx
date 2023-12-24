import NotesArchivedListTemplate from "../components/NotesArchivedListTemplate";
import { Link } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { Button } from "@chakra-ui/react";

import { useLanguageStore } from "../../../../Zustand/UserPreferences";
export default function NotesArchivedList() {
  const { language } = useLanguageStore();
  return (
    <>
      <Button
        as={Link}
        to={"/notes/active"}
        leftIcon={<CgNotes />}
        colorScheme="orange"
      >
        {language === "en" ? "Active Notes" : "Catatan Aktif"}
      </Button>
      <NotesArchivedListTemplate />
    </>
  );
}
