import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FormsTable from "@/components/FormsTable";
import UserList from "@/components/UserList";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router = useRouter();
  const [manageUser, setManageUsers] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      {!manageUser && (
        <FormsTable session={session} setManageUsers={setManageUsers} />
      )}
      {manageUser && (
        <UserList session={session} setManageUsers={setManageUsers} />
      )}
    </>
  );
};

export default AdminDashboard;
