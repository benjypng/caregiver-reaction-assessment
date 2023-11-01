import CRAResults from "@/features/cra-results";
import { trpc } from "@/utils/trpc-hooks";
import { Form } from "@prisma/client";
import { useRouter } from "next/router";
import { createContext } from "react";

export interface FormWithUser extends Form {
  msw_name: string | undefined;
  survey_date: Date;
}

export const ProfileContext = createContext<FormWithUser | null>(null);

const Result = () => {
  const router = useRouter();

  const res = trpc.forms.getForm.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id },
  );
  if (!res.data) return null;
  const profile = {
    ...res.data,
    msw_name: res.data.User?.name,
    survey_date: new Date(res.data.survey_date),
  };

  return (
    <ProfileContext.Provider value={profile}>
      <CRAResults />
    </ProfileContext.Provider>
  );
};
export default Result;
