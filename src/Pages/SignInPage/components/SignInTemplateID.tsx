import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormErrorMessage,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../../../Api/Api";
import { useUserLoggedInBooleanStore } from "../../../Zustand/UserLoggedInBooleanZustand";
type formValues = {
  email: string;
  password: string;
};
export default function SignInTemplateID() {
  const navigate = useNavigate();
  const { setUserLoggedInBoolean } = useUserLoggedInBooleanStore();
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Masuk ke akun anda</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values: formValues) => {
                const errors: {
                  email?: string;
                  password?: string;
                } = {};
                if (!values.email) {
                  errors.email = "Harap Diisi!";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "alamat email tidak valid";
                }
                if (!values.password) {
                  errors.password = "Harap Diisi!";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const { error, data } = await login(values);
                  if (!error) {
                    putAccessToken(data.accessToken);
                    setUserLoggedInBoolean(true);
                    navigate("/notes/unarchived");
                  }
                  setSubmitting(false);
                } catch (error) {
                  alert("An error occurred during login" + error);
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <>
                    <FormControl
                      id="email"
                      isInvalid={!!errors.email && touched.email}
                    >
                      <Flex justifyContent={"space-between"}>
                        <FormLabel>Alamat Email</FormLabel>
                        <FormErrorMessage>
                          {touched.email && errors.email}
                        </FormErrorMessage>
                      </Flex>
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </>
                  <FormControl
                    id="password"
                    isInvalid={!!errors.password && touched.password}
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Kata Sandi</FormLabel>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </Flex>
                    <Input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <Stack spacing={10} mt={5}>
                    <Button
                      bg={"orange.400"}
                      color={"white"}
                      _hover={{
                        bg: "orange.500",
                      }}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Masuk
                    </Button>
                    <Flex>
                      <Text>Tidak Memiliki akun? klik&nbsp;</Text>
                      <Text as={Link} to="/signup" color={"orange.400"}>
                        disini
                      </Text>
                    </Flex>
                  </Stack>
                </form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
