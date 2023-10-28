import { ProfileContext } from "@/pages/cra-results/[id]";
import {
  Text,
  Box,
  Flex,
  Spacer,
  StackDivider,
  Stack,
  Tag,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import questions from "@/constants/questions.json";
import { handleQuestions } from "@/libs/table-helpers/handle-questions";
import { TableForm } from "@/pages/admin";

const QuestionsResults = () => {
  const profile = useContext(ProfileContext);
  if (!profile) return null;

  return (
    <Box px="3">
      <Stack divider={<StackDivider borderWidth="medium" />} spacing="4">
        {questions.map((q) => {
          const question = profile[q.no as keyof TableForm] as string;
          return (
            <Flex key={q.no} wrap="wrap" gap="2" mb="3">
              <Box w="100%">
                <Text pt="2" fontSize="sm">
                  {q.qn}
                </Text>
                <Text pt="2" fontSize="sm">
                  {q["qn-cn"]}
                </Text>
                <Text pt="2" fontSize="sm">
                  {q["qn-my"]}
                </Text>
                <Text pt="2" fontSize="sm">
                  {q["qn-tm"]}
                </Text>
              </Box>
              <Spacer />
              <Tag colorScheme="facebook">{handleQuestions(question)}</Tag>
            </Flex>
          );
        })}
      </Stack>
    </Box>
  );
};

export default QuestionsResults;
