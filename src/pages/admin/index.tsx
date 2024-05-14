import { useSession } from "next-auth/react";
import { useState } from "react";
import FormsTable from "@/components/FormsTable";
import UserList from "@/components/UserList";

const AdminDashboard = () => {
  const [manageUser, setManageUsers] = useState(false);

  const { data: session } = useSession();

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
