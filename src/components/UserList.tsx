import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { trpc } from '@/utils/trpc-hooks'

import NewUser from './NewUser'

type NewUser = {
  name: string
  email: string
}

type FormMessage = {
  type: 'error' | 'success'
  message: string
}

const UserList = () => {
  const { data } = useSession()
  const formMethods = useForm<NewUser>({
    mode: 'onBlur',
  })

  const [users, setUsers] = useState<Partial<User>[]>([])
  const [formMsg, setFormMsg] = useState<FormMessage | null>()
  const [editingRowId, setEditingRowId] = useState<string>('')
  const [addUser, setAddUser] = useState<boolean>(false)

  const getUsers = trpc.users.findAll.useQuery()

  const putUsers = async () => {
    const res = await getUsers.refetch()
    if (!res.data) return
    setUsers(res.data.sort((a, b) => a.name.localeCompare(b.name)))
  }

  useEffect(() => {
    putUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (formMsg) {
      setTimeout(() => setFormMsg(null), 3000)
      putUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formMsg])

  const updateUserName = trpc.users.updateName.useMutation({
    onSuccess: () => {
      setEditingRowId('')
      setFormMsg({
        type: 'success',
        message: 'User updated',
      })
    },
    onError(error) {
      setFormMsg({
        type: 'error',
        message: error.message,
      })
    },
  })
  const deleteUser = trpc.users.deleteOne.useMutation({
    onSuccess: () => {
      setFormMsg({
        type: 'success',
        message: 'User deleted',
      })
    },
    onError(error) {
      setFormMsg({
        type: 'error',
        message: error.message,
      })
    },
  })
  const createNewUser = trpc.users.createOne.useMutation({
    onSuccess: () => {
      setAddUser(false)
    },
    onError(error) {
      setFormMsg({
        type: 'error',
        message: error.message,
      })
    },
  })

  const sendPwToUser = trpc.users.sendPassword.useMutation({
    onSuccess: () => {
      setFormMsg({
        type: 'success',
        message: 'Password successfully sent',
      })
    },
    onError(error) {
      setFormMsg({
        type: 'error',
        message: error.message,
      })
    },
  })

  const handleDelete = (id: string) => {
    deleteUser.mutate({ id })
  }

  const updateUser = (data: { name: string }) => {
    updateUserName.mutate({ id: editingRowId, name: data.name })
  }

  const saveNewUser = (data: NewUser) => {
    createNewUser.mutate({ name: data.name, email: data.email })
  }

  const sendPassword = (id: string) => {
    sendPwToUser.mutate({ id })
  }

  return (
    <>
      {!addUser && (
        <Flex alignContent="center" gap="2" mb="3">
          <Button onClick={() => setAddUser(true)}>Add User</Button>
          <Text
            alignSelf="center"
            color={formMsg?.type === 'success' ? 'green' : 'red'}
          >
            {formMsg?.message}
          </Text>
        </Flex>
      )}
      {addUser && (
        <Button
          variant="solid"
          colorScheme="critical"
          mb="5"
          mr="3"
          onClick={() => {
            setAddUser(false)
          }}
        >
          Cancel
        </Button>
      )}
      <TableContainer>
        <Table variant="simple" layout="fixed">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {addUser && (
              <Tr key="addUser">
                <FormProvider {...formMethods}>
                  <Th>
                    <NewUser />
                  </Th>
                  <Th>
                    <Flex>
                      <Button
                        size="xs"
                        mr="2"
                        onClick={formMethods.handleSubmit(saveNewUser)}
                      >
                        Save
                      </Button>
                    </Flex>
                  </Th>
                </FormProvider>
              </Tr>
            )}
            {users
              .filter((user) => user.id !== data?.user.id)
              .map((user) => (
                <Tr key={user.id}>
                  {editingRowId !== user.id && (
                    <Th>
                      <Text ml="2" mb="1">
                        {user.name}
                      </Text>{' '}
                      <Tag size="xs">{user.email}</Tag>
                    </Th>
                  )}
                  <FormProvider {...formMethods}>
                    {editingRowId === user.id && (
                      <Th>
                        <Controller
                          name="name"
                          rules={{ required: 'Required' }}
                          render={({ field, fieldState: { error } }) => (
                            <FormControl isInvalid={!!error}>
                              <Input
                                {...field}
                                size="xs"
                                width="200px"
                                placeholder="Name"
                                defaultValue={user.name}
                              />
                              <FormErrorMessage size="xs">
                                {error?.message}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        />
                      </Th>
                    )}
                    <Th>
                      {editingRowId === user.id && (
                        <>
                          {' '}
                          <Button
                            variant="ghost"
                            size="xs"
                            mr="2"
                            onClick={formMethods.handleSubmit(updateUser)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            color="red"
                            onClick={() => setEditingRowId('')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {editingRowId !== user.id && (
                        <>
                          <Button
                            variant="ghost"
                            size="xs"
                            mr="2"
                            onClick={() => setEditingRowId(user.id as string)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            color="red"
                            mr="2"
                            onClick={() => handleDelete(user.id as string)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            color="green"
                            onClick={() => sendPassword(user.id as string)}
                          >
                            Send Password
                          </Button>
                        </>
                      )}
                    </Th>
                  </FormProvider>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserList
