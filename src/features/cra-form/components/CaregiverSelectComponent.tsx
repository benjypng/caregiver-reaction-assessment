import { FormControl, FormLabel } from '@chakra-ui/react'
import { FormErrorMessage, SingleSelect } from '@opengovsg/design-system-react'
import { Controller, useFormContext } from 'react-hook-form'

type CaregiverSelectProps = {
  name: string
  description: string
  items: { value: string; label: string }[]
}

const CaregiverSelect = ({
  name,
  description,
  items,
}: CaregiverSelectProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: 'Required' }}
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
  )
}

export default CaregiverSelect
