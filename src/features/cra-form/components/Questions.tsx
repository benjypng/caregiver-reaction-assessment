import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  RadioGroup,
} from "@chakra-ui/react";
import { Radio } from "@opengovsg/design-system-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import questions from "../../../constants/questions.json";

type Question = {
  no: string;
  qn: string;
  "qn-cn": string;
  "qn-my": string;
  "qn-tm": string;
};

const Questions = () => {
  const { control } = useFormContext();
  return (
    <>
      <Text textStyle="h5">m-CRA (Modified Caregiver Reaction Assessment)</Text>
      {questions
        .sort((a: { no: string }, b: { no: string }) => {
          const noA = parseInt(a.no.replace("qn", ""));
          const noB = parseInt(b.no.replace("qn", ""));
          return noA - noB;
        })
        .map((q: Question) => (
          <Box key={q.qn}>
            <Controller
              control={control}
              name={
                q.no as
                  | "qn1"
                  | "qn2"
                  | "qn3"
                  | "qn4"
                  | "qn5"
                  | "qn6"
                  | "qn7"
                  | "qn8"
                  | "qn9"
                  | "qn10"
                  | "qn11"
                  | "qn12"
                  | "qn13"
                  | "qn14"
                  | "qn15"
                  | "qn16"
                  | "qn17"
                  | "qn18"
                  | "qn19"
                  | "qn20"
                  | "qn21"
              }
              rules={{ required: "Required" }}
              render={({ field, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} mb={6}>
                  <FormLabel>
                    <Text>{q.qn}</Text>
                    <Text>{q["qn-cn"]}</Text>
                    <Text>{q["qn-my"]}</Text>
                    <Text>{q["qn-tm"]}</Text>
                  </FormLabel>
                  <RadioGroup {...field}>
                    <Radio allowDeselect={true} value="1">
                      Strongly Disagree
                    </Radio>
                    <Radio allowDeselect={true} value="2">
                      Disagree
                    </Radio>
                    <Radio allowDeselect={true} value="3">
                      Neither Agree Nor Disagree
                    </Radio>
                    <Radio allowDeselect={true} value="4">
                      Agree
                    </Radio>
                    <Radio allowDeselect={true} value="5">
                      Strongly Agree
                    </Radio>
                  </RadioGroup>
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </Box>
        ))}
    </>
  );
};

export default Questions;
