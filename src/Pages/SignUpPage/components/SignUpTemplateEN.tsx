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
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { register } from "../../../Api/Api";
type formValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function SignUpTemplateEN() {
  const navigate = useNavigate();

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validate={(values: formValues) => {
                const errors: {
                  name?: string;
                  email?: string;
                  password?: string;
                  confirmPassword?: string;
                } = {};
                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                if (
                  !values.confirmPassword ||
                  values.confirmPassword !== values.password
                ) {
                  errors.confirmPassword = "Password does not match";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const valuesPost = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                  };
                  const response = await register(valuesPost);
                  if (!response.error) {
                    navigate("/signin");
                  } else {
                    alert("something went wrong");
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
                      id="name"
                      isInvalid={!!errors.name && touched.name}
                    >
                      <Flex justifyContent={"space-between"}>
                        <FormLabel>Name</FormLabel>
                        <FormErrorMessage>
                          {touched.name && errors.name}
                        </FormErrorMessage>
                      </Flex>
                      <Input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </>
                  <>
                    <FormControl
                      id="email"
                      isInvalid={!!errors.email && touched.email}
                    >
                      <Flex justifyContent={"space-between"}>
                        <FormLabel>Email address</FormLabel>
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
                  <>
                    <FormControl
                      id="password"
                      isInvalid={!!errors.password && touched.password}
                    >
                      <Flex justifyContent={"space-between"}>
                        <FormLabel>Password</FormLabel>
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
                  </>
                  <>
                    <FormControl
                      id="password"
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <Flex justifyContent={"space-between"}>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormErrorMessage>
                          {errors.confirmPassword}
                        </FormErrorMessage>
                      </Flex>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </>
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
                      Sign in
                    </Button>
                    <Flex>
                      <Text>Already have an account? click&nbsp;</Text>
                      <Text as={Link} to="/signin" color={"orange.400"}>
                        here
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
