import CRAResults from "@/features/cra-results";
import { trpc } from "@/utils/trpc-hooks";
import { useRouter } from "next/router";
import { createContext } from "react";
import { TableForm } from "../admin";

export const ProfileContext = createContext<TableForm | null>(null);

const Result = () => {
  const router = useRouter();

  const res = trpc.getForm.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id },
  );
  if (!res.data) return null;
  const profile = {
    ...res.data,
    msw_name: {
      name: res.data.msw_name.name,
      id: res.data.msw_name.id,
    },
    survey_date: new Date(res.data.survey_date),
  };

  return (
    <ProfileContext.Provider value={profile}>
      <CRAResults />
    </ProfileContext.Provider>
  );
};
export default Result;
