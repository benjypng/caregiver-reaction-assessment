import { Flex } from "@chakra-ui/react";
import CRAForm from "../features/cra-form";

export default function Home() {
  return (
    <Flex
      gap={5}
      direction="column"
      justifyContent="center"
      alignItems="start"
      gridColumn={{ base: "1 / -1", md: "2 / 12" }}
      py={{ base: "3.5rem", md: "5.5rem" }}
    >
      <CRAForm />
    </Flex>
  );
}
