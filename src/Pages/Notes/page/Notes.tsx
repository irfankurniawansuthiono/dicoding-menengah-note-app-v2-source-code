import SearchBar from "../components/SearchBar/SearchBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import AddNotesButtonModal from "../components/AddNotes/AddNotesButtonModal";
export default function Notes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/notes") {
      navigate("/notes/active");
    }
  });

  return (
    <Container
      maxW={"5xl"}
      py={10}
      px={{ base: 5, md: 10 }}
      mt={{ base: 5, md: 10 }}
    >
      <Flex gap={5} flexDir={"column"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <AddNotesButtonModal />
          <SearchBar />
        </Flex>
        <Outlet />
      </Flex>
    </Container>
  );
}
