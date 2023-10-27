import { Flex } from "@chakra-ui/react";
import { AppGrid } from "../templates/AppGrid";
import CRAForm from "../features/cra-form";

export default function Home() {
  return (
    <AppGrid
      bg="base.canvas.brand-subtle"
      px="1.5rem"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPos="bottom right"
    >
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
    </AppGrid>
  );
}
