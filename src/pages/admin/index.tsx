import { Flex, Text } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc-hooks";
import AdminTable from "./components/AdminTable";
import { Form } from "@prisma/client";
import ExportCSV from "./components/ExportCSV";

export interface TableForm extends Form {
  msw_name: string;
}

export type AdminTableProps = {
  data: TableForm[];
};

const AdminDashboard = () => {
  const res = trpc.getAllForms.useQuery();
  const data = res.data?.map((d) => ({
    ...d,
    msw_name: d.msw_name.name,
    survey_date: new Date(d.survey_date),
  }));

  return (
    <Flex
      gap={5}
      direction="column"
      justifyContent="center"
      alignItems="start"
      gridColumn={{ base: "1 / -1", md: "2 / 12" }}
      py={{ base: "3.5rem", md: "5.5rem" }}
    >
      <Text textStyle="h4">AdminDashboard</Text>
      {data && <ExportCSV data={data} />}
      {data && <AdminTable data={data} />}
    </Flex>
  );
};

export default AdminDashboard;
