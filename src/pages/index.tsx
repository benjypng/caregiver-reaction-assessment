import { Box } from "@chakra-ui/react";
import CRAForm from "../features/cra-form";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <Box maxW={["100%", "100%", "90%"]}>
      <CRAForm />
    </Box>
  );
}
