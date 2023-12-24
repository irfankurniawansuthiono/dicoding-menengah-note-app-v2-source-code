import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useLanguageStore } from "../../Zustand/UserPreferences";
import { Link } from "react-router-dom";
import { useUserLoggedInBooleanStore } from "../../Zustand/UserLoggedInBooleanZustand";
export default function Navbar() {
  const [languageSelected, setLanguageSelected] = useState<"en" | "id">(
    (localStorage.getItem("language") as "en" | "id") || "en"
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const { userLoggedInBoolean, setUserLoggedInBoolean } =
    useUserLoggedInBooleanStore();
  const { setLanguage } = useLanguageStore();
  useEffect(() => {
    setLanguage(languageSelected);
    localStorage.setItem("language", languageSelected);
  }, [languageSelected]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserLoggedInBoolean(false);
  };
  return (
    <>
      <Box bg={useColorModeValue("whitesmoke", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box as={Link} to={"/"}>
            {languageSelected === "en" ? (
              <Heading
                size={{ base: "sm", md: "md", lg: "lg" }}
                color={"orange.500"}
              >
                Notes App
              </Heading>
            ) : (
              <Heading
                size={{ base: "sm", md: "md", lg: "lg" }}
                color={"orange.500"}
              >
                Aplikasi Catatan
              </Heading>
            )}
          </Box>

          <Flex alignItems={"center"} justifyContent={"flex-end"}>
            <Stack direction={"row"}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                variant={"outline"}
                onClick={() =>
                  setLanguageSelected(languageSelected === "en" ? "id" : "en")
                }
              >
                {languageSelected === "en" ? "EN" : "ID"}
              </Button>
              {userLoggedInBoolean ? (
                languageSelected === "en" ? (
                  <Button
                    colorScheme="orange"
                    as={Link}
                    to={"/signin"}
                    onClick={() => handleLogout()}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    colorScheme="orange"
                    to={"/signin"}
                    onClick={() => handleLogout()}
                  >
                    Keluar
                  </Button>
                )
              ) : null}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
