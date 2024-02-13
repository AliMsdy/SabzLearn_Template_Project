import { userColumns } from "./userColumns";
//context
import { useAuthContext } from "@/context/AuthContext";
//components
import { DataTable, Section } from "@/Components/AdminPanel";

//api
import { useQueryCall } from "@/hooks";
function ListOfUsers() {
  const { token } = useAuthContext();
  const { data: users = [] } = useQueryCall(
    ["Users"],
    {
      url: "/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      enabled: !!token,
    },
  );
  return (
    <Section className="mt-8 font-bold">
      <DataTable
        columns={userColumns}
        data={users}
        title={
          <p className="mb-4">
            افراد<span className="text-admin-blue-color ">ثبت نام</span> شده
          </p>
        }
      />
    </Section>
  );
}

export { ListOfUsers };
