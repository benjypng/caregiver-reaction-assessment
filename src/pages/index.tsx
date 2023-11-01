import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import SurveyDetails from "@/features/cra-form/components/SurveyDetails";
import CaregiverDetails from "@/features/cra-form/components/CaregiverDetails";
import Questions from "@/features/cra-form/components/Questions";
import { Form } from "@prisma/client";
import { trpc } from "@/utils/trpc-hooks";
import { useRouter } from "next/navigation";
import { calculateScore } from "@/libs/calculate-score";
import { InferGetStaticPropsType } from "next";
import prisma from "prisma/client";
import Citations from "@/features/cra-form/components/Citations";

export const getStaticProps = async () => {
  const users = await prisma.user.findMany();
  if (!users) return;
  return { props: { users } };
};

export default function Home({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const formMethods = useForm<Form>({
    mode: "onBlur",
  });

  const submitForm = trpc.forms.submitForm.useMutation({
    onError: (response) => {
      console.log(response);
      setSubmitting(false);
    },
    onSettled: (response) => {
      router.push(`/cra-results/${response?.id}`);
    },
  });

  const onSubmit = (data: Form) => {
    setSubmitting(true);
    const score = calculateScore(data);
    submitForm.mutate({
      ...data,
      ...score,
      main_caregiver: data.main_caregiver == true,
    });
  };

  return (
    <Box maxW={["100%", "100%", "90%"]}>
      <Text textStyle="h3" mb="8">
        Caregiver Reaction Assessment
      </Text>
      <FormProvider {...formMethods}>
        <SurveyDetails users={users} />
        <CaregiverDetails />
        <Questions />
        <Button
          isLoading={submitting}
          onClick={formMethods.handleSubmit(onSubmit)}
          colorScheme="telegram"
          w="10em"
        >
          Submit
        </Button>
      </FormProvider>
      <Citations />
    </Box>
  );
}
