import { FormControl, FormLabel } from "@chakra-ui/react";
import { FormErrorMessage, SingleSelect } from "@opengovsg/design-system-react";
import { Controller, useFormContext } from "react-hook-form";

type CaregiverSelectProps = {
  name: any;
  description: string;
  field?: object;
};

const returnItems = (name: object) => {
  return Object.values(name).map((v) => {
    return {
      value: v!,
      label: v!,
    };
  });
};

const CaregiverSelect = ({
  name,
  description,
  field,
}: CaregiverSelectProps) => {
  const { control } = useFormContext();

  if (!field) {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: "Required" }}
        render={({ field, fieldState: { error } }) => (
          <FormControl isInvalid={!!error}>
            <FormLabel mb={1}>{description}</FormLabel>
            <SingleSelect
              placeholder="Select option"
              {...field}
              size="sm"
              isClearable={false}
              items={[
                {
                  value: "true",
                  label: "Yes",
                },
                {
                  value: "false",
                  label: "No",
                },
              ]}
            />
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
    );
  } else {
    const items = returnItems(field);
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: "Required" }}
        render={({ field, fieldState: { error } }) => (
          <FormControl isInvalid={!!error}>
            <FormLabel mb={1}>{description}</FormLabel>
            <SingleSelect
              isClearable={false}
              placeholder="Select option"
              {...field}
              size="sm"
              items={items}
            />
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
    );
  }
};

export default CaregiverSelect;
