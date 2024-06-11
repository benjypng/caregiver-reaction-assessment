import { Box, Button, Text } from '@chakra-ui/react';
import { Form } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CaregiverDetails from '@/features/cra-form/components/CaregiverDetails';
import Citations from '@/features/cra-form/components/Citations';
import Questions from '@/features/cra-form/components/Questions';
import SurveyDetails from '@/features/cra-form/components/SurveyDetails';
import { calculateScore } from '@/libs/calculate-score';
import { trpc } from '@/utils/trpc-hooks';

export default function Home() {
  const router = useRouter();
  const formMethods = useForm<Form>({
    mode: 'onBlur',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitForm = trpc.forms.submitForm.useMutation({
    onError: (response) => {
      console.log(response);
      setSubmitting(false);
    },
    onSettled: async (response) => {
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
    <Box maxW={['100%', '100%', '90%']}>
      <Text textStyle="h3" mb="8">
        Caregiver Reaction Assessment
      </Text>
      <FormProvider {...formMethods}>
        <SurveyDetails />
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
