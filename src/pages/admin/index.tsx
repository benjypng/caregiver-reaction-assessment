import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FormsTable from "@/components/FormsTable";
import UserList from "@/components/UserList";
import { useRouter } from "next/router";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Button } from "@opengovsg/design-system-react";

const AdminDashboard = () => {
  const router = useRouter();
  const [manageUsers, setManageUsers] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <Box>
      <Flex>
        <Text textStyle="h4" mb="5">
          Admin Dashboard
        </Text>
        <Spacer />
        {session && session.user.is_admin && (
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
  );
};

export default AdminDashboard;
