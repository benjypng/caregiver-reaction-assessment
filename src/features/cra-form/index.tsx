import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text } from "@chakra-ui/react";
import SurveyDetails from "./components/SurveyDetails";
import CaregiverDetails from "./components/CaregiverDetails";
import Questions from "./components/Questions";
import { Form } from "@prisma/client";
import { trpc } from "@/utils/trpc-hooks";
import { Button } from "@opengovsg/design-system-react";
import { useRouter } from "next/navigation";

const CRAForm = () => {
  const router = useRouter();
  const formMethods = useForm<Form>({
    mode: "onBlur",
  });

  const submitForm = trpc.submitForm.useMutation({
    onSettled: (response) => {
      router.push(`/cra-results/${response?.id}`);
    },
  });

  const onSubmit = (data: Form) => {
    submitForm.mutate({
      ...data,
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
      <Button onClick={formMethods.handleSubmit(onSubmit)}>Hello</Button>
    </FormProvider>
  );
};

export default CRAForm;
