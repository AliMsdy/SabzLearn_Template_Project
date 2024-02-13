//icons
import { FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";
//context
import { useAuthContext } from "@/context/AuthContext";
//component
import { AdminPanelBox, DataTable, Section } from "@/Components/AdminPanel";
import { Loading } from "@/Components";

//api
import { useQueryCall } from "@/hooks";

//column
import { userColumns } from "../Users/userColumns";

//type
type BoxInfoType = {
  title:string;
  count:string;
}

const AdminPanelBoxListIcons = [FaMoneyBillAlt, FaShoppingCart, FaMoneyBillAlt];

function MainPage() {
  const { token } = useAuthContext();
  const { data: adminInfos = {},isLoading } = useQueryCall(["adminPanelMainPageInfos"], {
    url: "/infos/p-admin",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if(isLoading) return <Loading />
  return (
    <>
      <h2 className="mt-4 text-xl font-bold duration-500 ease-out animate-in slide-in-from-bottom">
        خوش آمدید ،{" "}
        <span className="text-admin-blue-color">{adminInfos.adminName}</span>
      </h2>
      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminInfos.infos.map((boxInfo:BoxInfoType, index:number) => (
          <AdminPanelBox
            key={boxInfo.title}
            Icon={AdminPanelBoxListIcons[index]}
            {...boxInfo}
          />
        ))}
      </section>
      <Section className="mt-8 font-bold">
        <DataTable
          columns={userColumns}
          data={adminInfos.lastUsers}
          isPaginatedTable={false}
          title={
            <p className="mb-4">
              افراد اخیرا{" "}
              <span className="text-admin-blue-color ">ثبت نام</span> شده
            </p>
          }
        />
      </Section>
    </>
  );
}

export { MainPage };
