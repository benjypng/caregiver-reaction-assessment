import { FormWithUser, ProfileContext } from "@/pages/cra-results/[id]";
import { Box, StackDivider, Stack, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import questions from "@/constants/questions.json";
import QuestionComponent from "./QuestionComponent";
import { filterFns } from "@tanstack/react-table";

const QuestionsResults = () => {
  const profile = useContext(ProfileContext);
  if (!profile) return null;

  // Question Index
  const poorHealth = [1, 4, 6, 7, 13, 14, 16, 18];
  const finances = [20, 21];
  const familySupport = [2, 8, 10, 12, 15];
  const esteem = [3, 5, 9, 11, 17, 19];

  function filterArrayByIndex(indexArr, array) {
    return array
      .sort((a: { no: string }, b: { no: string }) => {
        const noA = parseInt(a.no.replace("qn", ""));
        const noB = parseInt(b.no.replace("qn", ""));
        return noA - noB;
      })
      .filter((d, i) => indexArr.indexOf(i + 1) !== -1);
  }

  const poorHealthQns = filterArrayByIndex(poorHealth, questions);
  const financeQns = filterArrayByIndex(finances, questions);
  const familySupportQns = filterArrayByIndex(familySupport, questions);
  const esteemQns = filterArrayByIndex(esteem, questions);

  return (
    <Box px="3">
      <Stack divider={<StackDivider borderWidth="medium" />} spacing="4">
        <Heading size="sm">Disturbed Schedule && Poor Health</Heading>
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
