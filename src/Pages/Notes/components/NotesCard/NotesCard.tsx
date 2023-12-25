import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUserLoggedDataStore } from "../../../../Zustand/UserLoggedDataStoreZustand";
import ActionNotesButton from "../ActionNotesButton/ActionNotesButton";
import PropTypes from "prop-types";

type NoteCardTemplateProps = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  link: string;
  archived: boolean;
};
NoteCardTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};
export default function NoteCardTemplate({
  id,
  title,
  body,
  createdAt,
  link,
  archived,
}: NoteCardTemplateProps) {
  const { userLoggedData } = useUserLoggedDataStore();

  const createdAtDate = new Date(createdAt);

  const formattedCreatedAt = `${createdAtDate.getFullYear()}-${(
    createdAtDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${createdAtDate
    .getDate()
    .toString()
    .padStart(2, "0")} ${createdAtDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${createdAtDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <Center py={6}>
      <Box
        maxW={{ base: "full", md: "sm" }}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Heading color={"orange.500"} fontSize={"2xl"} fontFamily={"body"}>
            {title}
          </Heading>
          <Text color={"gray.500"}>{body}</Text>
        </Stack>
        <Stack
          mt={6}
          direction={"row"}
          spacing={4}
          align={"center"}
          justify={"space-between"}
        >
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{userLoggedData?.name}</Text>
            <Text color={"gray.500"}>{formattedCreatedAt}</Text>
          </Stack>
          <ActionNotesButton link={link} id={id} archived={archived} />
        </Stack>
      </Box>
    </Center>
  );
}
