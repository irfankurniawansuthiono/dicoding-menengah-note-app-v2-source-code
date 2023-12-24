import { Spinner, Flex } from "@chakra-ui/react";

export default function SpinnerComponent() {
  return (
    <Flex justifyContent="center" alignItems="center" w={"full"} mt={10}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
        size="xl"
      />
    </Flex>
  );
}
