import { trpc } from "@/utils/trpc-hooks";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  SimpleGrid,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { SingleSelect, DatePicker } from "@opengovsg/design-system-react";
import { MSW } from "@prisma/client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const SurveyDetails = () => {
  const { control } = useFormContext();
  const { data, isLoading, error } = trpc.getMSWs.useQuery();
  if (error) return <Text>Fatal Error</Text>;

  return (
    <>
      <Text textStyle="h5" mb="5">
        Survey Details
      </Text>
      <SimpleGrid columns={[1, null, 2]} gap={3} w="full" mb="10">
        <Controller
          control={control}
          name="mSWId"
          rules={{ required: "Required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel mb={1}>MSW Name</FormLabel>
              {isLoading && <SkeletonText />}
              {data && (
                <SingleSelect
                  placeholder="Select option"
                  {...field}
                  size="sm"
                  items={data.map((m: MSW) => ({
                    value: m.id,
                    label: m.name,
                  }))}
                />
              )}
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name={"survey_date"}
          rules={{ required: "You must select a date" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel mb={1}>Survey Date</FormLabel>
              <DatePicker {...field} size="sm" />
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </SimpleGrid>
    </>
  );
};

export default SurveyDetails;
