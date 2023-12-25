import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLanguageStore } from "../../../../Zustand/UserPreferences";
import { archiveNote, deleteNote, unarchiveNote } from "../../../../Api/Api";
import fetchActiveNotesZustand from "../../../../FetchWithZustand/fetchActiveNotes/fetchActiveNotesZustand";
import fetchArchivedNotesZustand from "../../../../FetchWithZustand/fetchArchivedNotes/fetchArchivedNotes";
type ActionNotesButtonProps = {
  id: string;
  archived: boolean;
  link?: string;
};

ActionNotesButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  link: PropTypes.string,
};
export default function ActionNotesButton({
  link,
  id,
  archived,
}: ActionNotesButtonProps) {
  const archiveHandler = async (archived: boolean, id: string) => {
    archived ? await unarchiveNote({ id }) : await archiveNote({ id });
    fetchActiveNotesZustand();
    fetchArchivedNotesZustand();
  };
  const deleteHandler = async (id: string) => {
    await deleteNote({ id });
    fetchActiveNotesZustand();
  };
  const { language } = useLanguageStore();
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="orange"
        size={{ base: "sm", md: "md" }}
      >
        {language === "en" ? "Action" : "Aksi"}
      </MenuButton>
      <MenuList>
        {link ? (
          <MenuItem as={Link} to={link + id}>
            {language === "en" ? "Detail" : "Detail"}
          </MenuItem>
        ) : null}

        <MenuItem onClick={() => deleteHandler(id)}>
          {language === "en" ? "Delete" : "Hapus"}{" "}
        </MenuItem>
        <MenuItem onClick={() => archiveHandler(archived, id)}>
          {archived
            ? language
              ? "Unarchive"
              : "buka arsip"
            : language
            ? "Archive"
            : "Arsip"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
