import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex, Text } from "@chakra-ui/react";
import SurveyDetails from "./components/SurveyDetails";
import CaregiverDetails from "./components/CaregiverDetails";
import Questions from "./components/Questions";
import { Form } from "@prisma/client";
import { trpc } from "@/utils/trpc-hooks";
import { useRouter } from "next/navigation";
import { calculateScore } from "@/libs/calculate-score";

const CRAForm = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const formMethods = useForm<Form>({
    mode: "onBlur",
  });

  const submitForm = trpc.submitForm.useMutation({
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
    <FormProvider {...formMethods}>
      <Text textStyle="h3" mb="8">
        Caregiver Reaction Assessment
      </Text>
      <SurveyDetails />
      <CaregiverDetails />
      <Questions />
      <Flex direction="row" gap="3">
        <Button
          isLoading={submitting}
          onClick={formMethods.handleSubmit(onSubmit)}
          colorScheme="telegram"
          w="10em"
        >
          Submit
        </Button>
      </Flex>
    </FormProvider>
  );
};

export default CRAForm;
