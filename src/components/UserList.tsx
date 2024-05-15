import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Button, Input } from "@opengovsg/design-system-react";
import { trpc } from "@/utils/trpc-hooks";
import { User } from "@prisma/client";

type FormsTableProps = {
  session: any;
  setManageUsers: (value: boolean) => void;
};

const UserList = ({ session, setManageUsers }: FormsTableProps) => {
  const [users, setUsers] = useState<Partial<User>[]>([]);
  const [editingRowId, setEditingRowId] = useState<string>("");
  const [editedName, setEditedName] = useState<string>("");

  const getUsers = trpc.users.findAll.useQuery();
  const updateUserName = trpc.users.updateOne.useMutation({
    onSettled: () => {
      console.log("New name saved");
      setEditingRowId("");
      setEditedName("");
    },
  });

  // TODO: Prevent deleting of self
  const deleteUser = trpc.users.deleteOne.useMutation({
    onSettled: () => {
      console.log("User deleted");
    },
  });

  useEffect(() => {
    (async () => {
      const res = await getUsers.refetch();
      if (!res.data) return;
      setUsers(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const handleDelete = (id: string) => {
    deleteUser.mutate({ id });
  };

  const save = () => {
    updateUserName.mutate({ id: editingRowId, name: editedName });
  };

  return (
    <Box>
      <Flex>
        <Text textStyle="h4" mb="5">
          Admin Dashboard
        </Text>
        <Spacer />
        {session && session.user.is_admin && (
          <Button
            variant="ghost"
            mb="5"
            mr="3"
            onClick={() => setManageUsers(false)}
          >
            Manage Forms
          </Button>
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
            {users.map((user) => (
              <Tr key={user.id}>
                {editingRowId !== user.id && <Th>{user.name}</Th>}
                {editingRowId === user.id && (
                  <Input
                    width="auto"
                    mt="3"
                    ml="5"
                    size="xs"
                    value={editedName}
                    onChange={(e: any) => setEditedName(e.target.value)}
                  />
                )}
                <Th>
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
                  {editingRowId === user.id && (
                    <>
                      {" "}
                      <Button variant="ghost" size="xs" mr="2" onClick={save}>
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
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
