//icons
import { FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";
//context
import { useAuthContext } from "@/context/AuthContext";
//component
import { Loading } from "@/Components";
import { AdminPanelBox, DataTable, userColumns } from "@/Components/AdminPanel";
import { useQueryCall } from "@/hooks";

const AdminPanelBoxList = [
  { title: "درآمد", Icon: FaMoneyBillAlt, desc: "درآمد در یک ماه گذشته" },
  { title: "فروش", Icon: FaShoppingCart, desc: "فروش در یک ماه گذشته" },
  { title: "هزینه", Icon: FaMoneyBillAlt, desc: "هزینه در یک ماه گذشته" },
];

function MainPage() {
  const { userInfos, token } = useAuthContext();
  const { data: users,status } = useQueryCall(
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
  if(status !== 'success') return <Loading />
  return (
    <div className="px-2 font-lalehzar">
      <h2 className="mt-4 text-xl font-bold duration-500 ease-out animate-in slide-in-from-bottom">
        خوش آمدید ،{" "}
        <span className="text-admin-blue-color">{userInfos?.name}</span>
      </h2>
      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AdminPanelBoxList.map((boxInfo) => (
          <AdminPanelBox key={boxInfo.title} {...boxInfo} />
        ))}
      </section>

      <section className="mt-8 rounded-md bg-white p-4 text-lg font-bold shadow-admin-panel-box-shadow ">
          <DataTable
            columns={userColumns}
            data={users}
            title={
              <p className="mb-4">
                افراد اخیرا{" "}
                <span className="text-admin-blue-color ">ثبت نام</span> شده
              </p>
            }
          />
      </section>
    </div>
  );
}

export { MainPage };

