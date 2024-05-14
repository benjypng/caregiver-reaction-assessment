import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc-hooks";
import AdminTable from "@/features/admin/components/AdminTable";
import ExportCSV from "@/features/admin/components/ExportCSV";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@opengovsg/design-system-react";
import { useState } from "react";

const AdminDashboard = () => {
  const [manageUser, setManageUsers] = useState(false);

  const router = useRouter();
  const res = trpc.forms.getAllForms.useQuery();

  const { data: session } = useSession();

  if (res.error?.data?.code === "UNAUTHORIZED") {
    router.push("/api/auth/signin");
  }

  if (!res.data) return null;
  const data = res.data?.map((d) => ({
    ...d,
    msw_name: d.User?.name,
    survey_date: new Date(d.survey_date),
  }));

  return (
    <>
      {!manageUser && (
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
                onClick={() => setManageUsers(true)}
              >
                Manage Users
              </Button>
            )}
            {data && <ExportCSV data={data} />}
          </Flex>
          {data && <AdminTable data={data} />}
        </Box>
      )}
      {manageUser && (
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
        </Box>
      )}
    </>
  );
};

export default AdminDashboard;
