import { trpc } from "@/utils/trpc-hooks";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Result = () => {
  const router = useRouter();
  console.log(router.query.id);

  const res = trpc.getForm.useQuery({ id: router.query.id as string });
  if (!res.data) return null;

  return (
    <>
      <Text textStyle="h4">Profile: {res.data.id}</Text>
      <SimpleGrid columns={[1, null, 2]}>
        <Box>
          <Text>MSW Name</Text>
        </Box>

        <Box>
          <Text>Survey Dste</Text>
        </Box>
      </SimpleGrid>
    </>
  );
};
export default Result;
