import { userColumns } from "./userColumns";
//context
import { useAuthContext } from "@/context/AuthContext";
//components
import { Section } from "@/Components/AdminPanel";
import { CustomDataTable } from "@/Components/AdminPanel/CustomDataTable";

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
  );
  return (
    <Section className="mt-8 font-bold">
      <CustomDataTable
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
