import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Spacer,
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
} from "@opengovsg/design-system-react";
import { trpc } from "@/utils/trpc-hooks";
import { User } from "@prisma/client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import NewUser from "./NewUser";
import { Session } from "next-auth";

type FormsTableProps = {
  session: Session | null;
  setManageUsers: (value: boolean) => void;
};

type NewUser = {
  name: string;
  email: string;
};

const UserList = ({ session, setManageUsers }: FormsTableProps) => {
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
  const updateUserName = trpc.users.updateOne.useMutation({
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

  const handleDelete = (id: string) => {
    deleteUser.mutate({ id });
  };

  const updateUser = (data: { name: string }) => {
    updateUserName.mutate({ id: editingRowId, name: data.name });
  };

  const saveNewUser = (data: NewUser) => {
    createNewUser.mutate({ name: data.name, email: data.email });
  };

  return (
    <Box>
      <Flex>
        <Text textStyle="h4" mb="5">
          Admin Dashboard
        </Text>
        <Spacer />
        {session && session.user.is_admin && (
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
            <Button
              variant="ghost"
              mb="5"
              mr="3"
              onClick={() => setManageUsers(false)}
            >
              Manage Forms
            </Button>
          </>
        )}
      </Flex>
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
              .map((user) => (
                <Tr key={user.id}>
                  {editingRowId !== user.id && <Th>{user.name}</Th>}
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
                            onClick={() => handleDelete(user.id as string)}
                          >
                            Delete
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
    </Box>
  );
};

export default UserList;
