import {
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useLanguageStore } from "../../../../Zustand/UserPreferences";
export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguageStore();
  const handleChange = (value: string) => {
    if (value !== "") {
      searchParams.set("q", value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };
  return (
    <Flex justifyContent={"flex-end"}>
      <Box maxW={{ base: "70%", sm: "400px" }}>
        <InputGroup>
          <InputLeftElement pointerEvents={"none"}>
            <IoIosSearch />
          </InputLeftElement>
          <Input
            focusBorderColor="orange.500"
            type={"text"}
            variant={"filled"}
            placeholder={
              language === "en" ? "Search by title" : "Cari berdasarkan judul"
            }
            border={"1px solid black"}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
        </InputGroup>
      </Box>
    </Flex>
  );
}
