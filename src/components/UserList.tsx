import React, { useEffect, useState } from "react";
import {
  Flex,
  FormControl,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Button,
  FormErrorMessage,
  Input,
  Tag,
} from "@opengovsg/design-system-react";
import { trpc } from "@/utils/trpc-hooks";
import { User } from "@prisma/client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import NewUser from "./NewUser";
import { Session } from "next-auth";

type NewUser = {
  name: string;
  email: string;
};

type SessionProps = {
  session: Session | null;
};

const UserList = ({ session }: SessionProps) => {
  const formMethods = useForm<NewUser>({
    mode: "onBlur",
  });
  const [users, setUsers] = useState<Partial<User>[]>([]);
  const [formError, setFormError] = useState<string>("");

  const [editingRowId, setEditingRowId] = useState<string>("");
  const [addUser, setAddUser] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await getUsers.refetch();
      if (!res.data) return;
      setUsers(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const getUsers = trpc.users.findAll.useQuery();
  const updateUserName = trpc.users.updateName.useMutation({
    onSuccess: () => {
      console.log("New name saved");
      setEditingRowId("");
    },
  });

  const deleteUser = trpc.users.deleteOne.useMutation({
    onSuccess: () => {
      console.log("User deleted");
    },
  });
  const createNewUser = trpc.users.createOne.useMutation({
    onSuccess: () => {
      setAddUser(false);
    },
    onError(error) {
      setFormError(error.message);
    },
  });

  const sendPwToUser = trpc.users.sendPassword.useMutation({
    onSuccess: () => {
      console.log("SENT");
    },
  });

  const handleDelete = (id: string) => {
    deleteUser.mutate({ id });
  };

  const updateUser = (data: { name: string }) => {
    updateUserName.mutate({ id: editingRowId, name: data.name });
  };

  const saveNewUser = (data: NewUser) => {
    createNewUser.mutate({ name: data.name, email: data.email });
  };

  const sendPassword = (id: string) => {
    sendPwToUser.mutate({ id });
  };

  return (
    <>
      {!addUser && (
        <Button mb="5" mr="3" onClick={() => setAddUser(true)}>
          Add User
        </Button>
      )}
      {addUser && (
        <Button
          variant="solid"
          colorScheme="critical"
          mb="5"
          mr="3"
          onClick={() => {
            setAddUser(false);
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
                      <Text alignSelf="center" color="red">
                        {formError}
                      </Text>
                    </Flex>
                  </Th>
                </FormProvider>
              </Tr>
            )}
            {users
              .filter((user) => user.id !== session?.user.id)
              .sort()
              .map((user) => (
                <Tr key={user.id}>
                  {editingRowId !== user.id && (
                    <Th>
                      <Text ml="2" mb="1">
                        {user.name}
                      </Text>{" "}
                      <Tag size="xs">{user.email}</Tag>
                    </Th>
                  )}
                  <FormProvider {...formMethods}>
                    {editingRowId === user.id && (
                      <Th>
                        <Controller
                          name="name"
                          rules={{ required: "Required" }}
                          render={({ field, fieldState: { error } }) => (
                            <FormControl isInvalid={!!error}>
                              <Input
                                {...field}
                                size="xs"
                                width="auto"
                                placeholder="Name"
                                defaultValue={user.name}
                              />
                              <FormErrorMessage>
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
                          {" "}
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
                            onClick={() => setEditingRowId("")}
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
  );
};

export default UserList;
