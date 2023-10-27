import { Text } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc-hooks";
import AdminTable from "./components/AdminTable";

const AdminDashboard = () => {
  const res = trpc.getAllForms.useQuery();
  const data = res.data?.map((d) => ({
    ...d,
    msw_name: d.msw_name.name,
    survey_date: new Date(d.survey_date),
  }));

  return (
    <>
      <Text textStyle="h4">AdminDashboard</Text>
      {data && <AdminTable data={data} />}
    </>
  );
};

export default AdminDashboard;
