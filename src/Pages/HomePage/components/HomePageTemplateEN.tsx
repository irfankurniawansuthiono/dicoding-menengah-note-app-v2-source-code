import { Container, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function HomePageTemplateEN() {
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
          Notes App{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"} as={"q"}>
          Enhance your note-taking experience effortlessly with NotesApp! Save,
          discover, and manage your notes simply and efficiently. NotesApp helps
          you record ideas, plans, and inspirations without complexity.
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
            Sign In
          </Button>
          <Button as={Link} to={"/signup"} rounded={"full"} px={6}>
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
