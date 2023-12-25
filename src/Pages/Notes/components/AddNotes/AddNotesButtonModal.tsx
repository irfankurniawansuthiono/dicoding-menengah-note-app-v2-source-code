import {
  Button,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { SlNote } from "react-icons/sl";
import { useRef } from "react";
import { IoAddOutline } from "react-icons/io5";
import { Formik } from "formik";
import { useLanguageStore } from "../../../../Zustand/UserPreferences";
import { addNote } from "../../../../Api/Api";
import fetchActiveNotesZustand from "../../../../FetchWithZustand/fetchActiveNotes/fetchActiveNotesZustand";
type formValues = {
  title: string;
  body: string;
};
export default function AddNotesButtonModal() {
  const { language } = useLanguageStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef(null);
  return (
    <>
      <Flex alignItems={"center"} gap={2} my={5}>
        <Heading
          as={"h3"}
          size={{ base: "sm", md: "md", lg: "lg" }}
          display={{ base: "none", md: "block" }}
        >
          {language === "en" ? "Add Note" : "Tambah Catatan"}
        </Heading>
        <Button
          colorScheme="orange"
          variant="outline"
          leftIcon={<SlNote />}
          onClick={onOpen}
          size={{ base: "sm", md: "md" }}
        >
          {language === "en" ? "Add" : "Tambah"}
        </Button>
      </Flex>
      <Modal
        initialFocusRef={nameRef}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {language === "en" ? "Add Note" : "Tambahkan Catatan"}
          </ModalHeader>
          <Formik
            initialValues={{
              title: "",
              body: "",
            }}
            validate={(values: formValues) => {
              const errors: {
                title?: string;
                body?: string;
              } = {};

              if (!values.title) {
                errors.title = "Required";
              }
              if (!values.body) {
                errors.body = "Required";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              try {
                const response = await addNote(values);
                if (response.error) {
                  alert(response.error);
                } else {
                  onClose();
                  fetchActiveNotesZustand();
                }
              } catch (error) {
                console.error(error);
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
              <>
                <ModalBody pb={6}>
                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={!!errors.title && touched.title}
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>
                        {language === "en" ? "Title" : "Judul"}
                      </FormLabel>
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </Flex>
                    <Input
                      focusBorderColor={"orange.500"}
                      name={"title"}
                      placeholder={language === "en" ? "Title" : "Judul"}
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>

                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={!!errors.body && touched.body}
                  >
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>
                        {language === "en" ? "Description" : "Deskripsi"}
                      </FormLabel>
                      <FormErrorMessage>{errors.body}</FormErrorMessage>
                    </Flex>
                    <Textarea
                      focusBorderColor="orange.500"
                      name="body"
                      placeholder={
                        language === "en" ? "Description" : "Deskripsi"
                      }
                      value={values.body}
                      resize="vertical"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="orange"
                    mr={3}
                    leftIcon={<IoAddOutline />}
                    onClick={() => {
                      handleSubmit();
                    }}
                    isLoading={isSubmitting}
                  >
                    {language === "en" ? "Add" : "Tambah"}
                  </Button>
                  <Button onClick={onClose}>
                    {language === "en" ? "Cancel" : "Batal"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
