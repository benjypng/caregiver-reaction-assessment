import { Box, Heading, Stack, StackDivider } from '@chakra-ui/react';
import React, { useContext } from 'react';

import questions from '@/constants/questions.json';
import { FormWithUser, ProfileContext } from '@/pages/cra-results/[id]';

import QuestionComponent from './QuestionComponent';

const filterArrayByIndex = (indexArr: number[]) => {
  return questions
    .sort((a: { no: string }, b: { no: string }) => {
      const noA = parseInt(a.no.replace('qn', ''));
      const noB = parseInt(b.no.replace('qn', ''));
      return noA - noB;
    })
    .filter((_d, i) => indexArr.indexOf(i + 1) !== -1);
};

const QuestionsResults = () => {
  const profile = useContext(ProfileContext);
  if (!profile) return null;

  // Question Index
  const poorHealth = [1, 4, 6, 7, 13, 14, 16, 18];
  const finances = [20, 21];
  const familySupport = [2, 8, 10, 12, 15];
  const esteem = [3, 5, 9, 11, 17, 19];

  const poorHealthQns = filterArrayByIndex(poorHealth);
  const financeQns = filterArrayByIndex(finances);
  const familySupportQns = filterArrayByIndex(familySupport);
  const esteemQns = filterArrayByIndex(esteem);

  return (
    <Box px="3">
      <Stack divider={<StackDivider borderWidth="medium" />} spacing="4">
        <Heading size="sm">Disturbed Schedule & Poor Health</Heading>
        {poorHealthQns.map((q, index: number) => {
          const question = profile[q.no as keyof FormWithUser] as string;
          return <QuestionComponent key={index} q={q} question={question} />;
        })}
        <Heading size="sm">Lack of Finances</Heading>
        {financeQns.map((q, index) => {
          const question = profile[q.no as keyof FormWithUser] as string;
          return <QuestionComponent key={index} q={q} question={question} />;
        })}
        <Heading size="sm">Lack of Family Support</Heading>
        {familySupportQns.map((q, index) => {
          const question = profile[q.no as keyof FormWithUser] as string;
          return <QuestionComponent key={index} q={q} question={question} />;
        })}
        <Heading size="sm">Esteem</Heading>
        {esteemQns.map((q, index) => {
          const question = profile[q.no as keyof FormWithUser] as string;
          return <QuestionComponent key={index} q={q} question={question} />;
        })}
      </Stack>
    </Box>
  );
};

export default QuestionsResults;
