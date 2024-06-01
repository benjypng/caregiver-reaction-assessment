import AdminTable from "@/features/admin/components/AdminTable";
import ExportCSV from "@/features/admin/components/ExportCSV";
import { trpc } from "@/utils/trpc-hooks";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Button } from "@opengovsg/design-system-react";
import { Session } from "next-auth";
import React from "react";

type FormsTableProps = {
  session: Session | null;
  setManageUsers: (value: boolean) => void;
};

const FormsTable = ({ session, setManageUsers }: FormsTableProps) => {
  const res = trpc.forms.getAllForms.useQuery();
  const data = res.data?.map((d) => ({
    ...d,
    msw_name: d.User?.name,
    survey_date: new Date(d.survey_date),
  }));

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
            onClick={() => setManageUsers(true)}
          >
            Manage Users
          </Button>
        )}
        {data && <ExportCSV data={data} />}
      </Flex>
      {data && <AdminTable data={data} />}
    </Box>
  );
};

export default FormsTable;
