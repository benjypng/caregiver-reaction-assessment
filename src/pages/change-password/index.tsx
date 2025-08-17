import { FormControl, Text } from '@chakra-ui/react'
import {
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@opengovsg/design-system-react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { trpc } from '@/utils/trpc-hooks'

type FormMessage = {
  type: 'error' | 'success'
  message: string
}

const ChangePassword = () => {
  const session = useSession()
  const formMethods = useForm<{ newpassword: string }>({ mode: 'onBlur' })
  const [formMsg, setFormMsg] = useState<FormMessage | null>()

  const updatePassword = trpc.users.updatePassword.useMutation({
    onSuccess: () => {
      setFormMsg({
        type: 'success',
        message: 'Password updated successfully',
      })
    },
    onError: (error) => {
      const errorArr = JSON.parse(error.message)
      setFormMsg({
        type: 'error',
        message: errorArr[0].message,
      })
    },
  })

  const onSubmit = (data: { newpassword: string }) => {
    if (session && session.data) {
      updatePassword.mutate({
        id: session.data?.user.id,
        password: data.newpassword,
      })
    }
  }

  return (
    <>
      <Text textStyle="h4" mb="5">
        Change Password
      </Text>
      <FormProvider {...formMethods}>
        <Controller
          name="newpassword"
          rules={{ required: 'Required' }}
          render={({ field, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel mb={1}>Enter your new password below</FormLabel>
              <Input {...field} size="sm" required />
              <FormErrorMessage>{error?.message ?? ' '}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Button mt="3" size="xs" onClick={formMethods.handleSubmit(onSubmit)}>
          Save
        </Button>
        <Text
          fontSize="small"
          color={formMsg?.type === 'error' ? 'red' : 'blue'}
          mt="3"
        >
          {formMsg?.message}
        </Text>
      </FormProvider>
    </>
  )
}

export default ChangePassword
