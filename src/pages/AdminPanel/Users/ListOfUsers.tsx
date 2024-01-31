import { userColumns } from "./userColumns";
//context
import { useAuthContext } from "@/context/AuthContext";
//components
import { Loading } from "@/Components";
import { DataTable } from "@/Components/AdminPanel";

//api
import { useQueryCall } from "@/hooks";
function ListOfUsers() {
  const { token } = useAuthContext();
  const { data: users, status } = useQueryCall(
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
  if (status !== "success") return <Loading />;
  return (
    <section className="mt-8 rounded-md bg-white p-4 text-lg font-bold shadow-admin-panel-box-shadow ">
      <DataTable
        columns={userColumns}
        data={users.reverse()}
        title={
          <p className="mb-4">
            افراد اخیرا <span className="text-admin-blue-color ">ثبت نام</span>{" "}
            شده
          </p>
        }
      />
    </section>
  );
}

export { ListOfUsers };
