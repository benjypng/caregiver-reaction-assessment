import { trpc } from "@/utils/trpc-hooks";

export const swrFetcher = (key: string) => {
  console.log("HELLO WORLD", key);
  const { data, isLoading } = trpc.users.findAll.useQuery();
  console.log("DATA", data);
  return { data, isLoading };
};
