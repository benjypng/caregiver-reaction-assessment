import { Flex, FormControl } from '@chakra-ui/react';
import { FormErrorMessage, Input } from '@opengovsg/design-system-react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const NewUser = () => {
  const { control } = useFormContext();

  return (
    <Flex>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Required' }}
        render={({ field, fieldState: { error } }) => (
          <FormControl isInvalid={!!error}>
            <Input {...field} size="xs" width="auto" placeholder="Name" />
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl isInvalid={!!error}>
            <Input {...field} size="xs" width="auto" placeholder="Email" />
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
    </Flex>
  );
};

export default NewUser;
