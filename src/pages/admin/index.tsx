import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import FormsTable from '@/components/FormsTable';
import UserList from '@/components/UserList';

const AdminDashboard = () => {
  const router = useRouter();
  const [manageUsers, setManageUsers] = useState(false);
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') router.push('/');

  return (
    <>
      {status === 'authenticated' && (
        <Box>
          <Flex>
            <Text textStyle="h4" mb="5">
              Admin Dashboard
            </Text>
            <Spacer />
            {session?.user.is_admin && (
              <>
                {!manageUsers && (
                  <Button
                    variant="ghost"
                    mb="5"
                    mr="3"
                    onClick={() => setManageUsers(true)}
                  >
                    Manage Users
                  </Button>
                )}
                {manageUsers && (
                  <Button
                    variant="ghost"
                    mb="5"
                    mr="3"
                    onClick={() => setManageUsers(false)}
                  >
                    Manage Forms
                  </Button>
                )}
              </>
            )}
          </Flex>
          <Spacer />
          {!manageUsers && <FormsTable />}
          {manageUsers && <UserList session={session} />}
        </Box>
      )}
    </>
  );
};

export default AdminDashboard;
