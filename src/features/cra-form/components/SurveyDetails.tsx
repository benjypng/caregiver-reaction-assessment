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
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const SurveyDetails = () => {
  const { control } = useFormContext();
  const { data: users, isLoading } = trpc.users.findAll.useQuery();

  return (
    <>
      <Text textStyle="h5" mb="5">
        Survey Details
      </Text>
      <SimpleGrid columns={[1, null, 2]} gap={3} w="full" mb="10">
        <Controller
          control={control}
          name="userId"
          rules={{ required: "Required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel mb={1}>MSW Name</FormLabel>
              {isLoading && (
                <SkeletonText noOfLines={3} spacing="2" skeletonHeight="1" />
              )}
              {users && (
                <SingleSelect
                  placeholder="Select option"
                  {...field}
                  size="sm"
                  items={users.map((m) => ({
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
              <DatePicker id="datepicker" {...field} size="sm" />
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </SimpleGrid>
    </>
  );
};

export default SurveyDetails;
