import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { DatePicker, SingleSelect } from '@opengovsg/design-system-react'
import { Controller, useFormContext } from 'react-hook-form'

import { trpc } from '@/utils/trpc-hooks'

const SurveyDetails = () => {
  const { control } = useFormContext()
  const { data: users, isLoading } = trpc.users.findAll.useQuery()

  return (
    <>
      <Text textStyle="h5" mb="5">
        Survey Details
      </Text>
      <SimpleGrid columns={[1, null, 2]} gap={3} w="full" mb="10">
        <Controller
          control={control}
          name="userId"
          rules={{ required: 'Required' }}
          render={({ field, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel mb={1}>MSW Name</FormLabel>
              <SingleSelect
                placeholder="Select option"
                {...field}
                size="sm"
                items={
                  !isLoading && users
                    ? users.sort().map((m) => ({
                        value: m.id,
                        label: m.name,
                      }))
                    : ['Loading']
                }
              />
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name={'survey_date'}
          rules={{ required: 'You must select a date' }}
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
  )
}

export default SurveyDetails
