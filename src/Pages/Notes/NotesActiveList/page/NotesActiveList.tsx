import NotesActiveListTemplate from "../components/NotesActiveListTemplate";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { GoArchive } from "react-icons/go";
import { useLanguageStore } from "../../../../Zustand/UserPreferences";
export default function NotesActiveList() {
  const { language } = useLanguageStore();
  return (
    <>
      <Button
        as={Link}
        to={"/notes/archived"}
        leftIcon={<GoArchive />}
        colorScheme="orange"
      >
        {language === "en" ? "Archived Notes" : "Catatan Arsip"}
      </Button>
      <NotesActiveListTemplate />
    </>
  );
}
