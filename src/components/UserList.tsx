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
import { Button } from "@opengovsg/design-system-react";
import { trpc } from "@/utils/trpc-hooks";
import { User } from "@prisma/client";

type FormsTableProps = {
  session: any;
  setManageUsers: (value: boolean) => void;
};

const UserList = ({ session, setManageUsers }: FormsTableProps) => {
  const [users, setUsers] = useState<Partial<User>[]>([]);

  const getUsers = trpc.users.findAll.useQuery();

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
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Th>{user.name}</Th>
                <Th>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleDelete(user.id as string)}
                  >
                    Delete
                  </Button>
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
