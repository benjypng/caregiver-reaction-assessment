import { useRouter } from "next/router";
import React from "react";
import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc-hooks";

const Result = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return;

  const res = trpc.getForm.useQuery({ id: id as string });
  if (!res.data) return null;
  const profileData = res.data;

  return (
    <>
      <Box p={4} border="1px solid #e2e8f0" borderRadius="lg" boxShadow="md">
        <VStack spacing={4} align="start">
          <Text fontWeight="bold" fontSize="lg" color="teal.500">
            Profile Information
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <Box>
              <Text>ID: {profileData.id}</Text>
              <Text>Survey Date: {profileData.survey_date}</Text>
              <Text>Age Group: {profileData.age_group}</Text>
              <Text>Gender: {profileData.gender}</Text>
              <Text>Race: {profileData.race}</Text>
              <Text>Marital Status: {profileData.marital_status}</Text>
            </Box>
            <Box>
              <Text>Education Level: {profileData.education_level}</Text>
              <Text>Employment Status: {profileData.employment_status}</Text>
              <Text>
                Main Caregiver: {profileData.main_caregiver ? "Yes" : "No"}
              </Text>
              <Text>Caregiving Length: {profileData.caregiving_length}</Text>
            </Box>
          </Grid>
        </VStack>

        <Box
          mt={4}
          p={4}
          border="1px solid #e2e8f0"
          borderRadius="lg"
          boxShadow="md"
        >
          <VStack spacing={4} align="start">
            <Text fontWeight="bold" fontSize="lg" color="teal.500">
              Questionnaire Answers
            </Text>
            {Object.keys(profileData)
              .filter((key) => key.startsWith("qn"))
              .map((key) => (
                <Text key={key}></Text>
              ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};
export default Result;
