import CRAResults from "@/features/cra-results";
import { trpc } from "@/utils/trpc-hooks";
import { Skeleton } from "@chakra-ui/react";
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

  const { data, isLoading } = trpc.forms.getForm.useQuery(
    { id: router.query.id as string },
    { enabled: !!router.query.id },
  );
  if (!data) return null;

  const profile = {
    ...data,
    msw_name: data.User?.name,
    survey_date: new Date(data.survey_date),
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <ProfileContext.Provider value={profile}>
        <CRAResults />
      </ProfileContext.Provider>
    </Skeleton>
  );
};
export default Result;
