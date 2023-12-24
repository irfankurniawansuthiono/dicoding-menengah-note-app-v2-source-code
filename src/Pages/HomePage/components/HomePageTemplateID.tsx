import { Container, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function HomePageTemplateID() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Aplikasi Catatan{" "}
          <Text as={"span"} color={"orange.400"}>
            mempermudah
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"} as={"q"}>
          Tingkatkan pengalaman Anda dalam mencatat dengan mudah bersama
          NotesApp! Simpan, temukan, dan kelola catatan Anda dengan sederhana
          dan efisien. NotesApp, membantu Anda mencatat ide, rencana, dan
          inspirasi tanpa kerumitan.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            as={Link}
            to="/signin"
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Masuk
          </Button>
          <Button as={Link} to={"/signup"} rounded={"full"} px={6}>
            Daftar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
