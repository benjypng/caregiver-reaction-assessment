import { Box, Flex, Spacer, Tag, Text } from '@chakra-ui/react';
import React from 'react';

import { handleQuestions } from '@/libs/table-helpers/handle-questions';

type QuestionComponentProps = {
  q: {
    no: string;
    qn: string;
    'qn-cn': string;
    'qn-my': string;
    'qn-tm': string;
  };
  question: string;
};

const QuestionComponent = ({ q, question }: QuestionComponentProps) => {
  return (
    <Flex key={q.no} wrap="wrap" gap="2" mb="3">
      <Box w="100%">
        <Text pt="2" fontSize="sm">
          {q.qn}
        </Text>
        <Text pt="2" fontSize="sm">
          {q['qn-cn']}
        </Text>
        <Text pt="2" fontSize="sm">
          {q['qn-my']}
        </Text>
        <Text pt="2" fontSize="sm">
          {q['qn-tm']}
        </Text>
      </Box>
      <Spacer />
      <Tag colorScheme="blue">{handleQuestions(question)}</Tag>
    </Flex>
  );
};

export default QuestionComponent;
