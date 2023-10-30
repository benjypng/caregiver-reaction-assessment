import { Flex, Spacer, Text } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc-hooks";
import { Form } from "@prisma/client";
import AdminTable from "@/features/admin/components/AdminTable";
import ExportCSV from "@/features/admin/components/ExportCSV";

export interface TableForm extends Form {
  msw_name: string;
}

const AdminDashboard = () => {
  const res = trpc.forms.getAllForms.useQuery();
  if (!res.data) return null;
  const data = res.data?.map((d) => ({
    ...d,
    msw_name: d.msw_name.name,
    survey_date: new Date(d.survey_date),
  }));

  return (
    <>
      <Flex>
        <Text textStyle="h4" mb="5">
          Admin Dashboard
        </Text>
        <Spacer />
        {data && <ExportCSV data={data} />}
      </Flex>
      {data && <AdminTable data={data} />}
    </>
  );
};

export default AdminDashboard;
