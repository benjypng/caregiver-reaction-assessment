import { Flex, Spacer, Text } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc-hooks";
import AdminTable from "@/features/admin/components/AdminTable";
import ExportCSV from "@/features/admin/components/ExportCSV";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const res = trpc.forms.getAllForms.useQuery();

  if (res.error?.data?.code === "UNAUTHORIZED") {
    router.push("/api/auth/signin");
  }

  if (!res.data) return null;
  const data = res.data?.map((d) => ({
    ...d,
    msw_name: d.User?.name,
    survey_date: new Date(d.survey_date),
  }));

  console.log(data);

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
