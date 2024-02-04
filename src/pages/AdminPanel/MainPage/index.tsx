//icons
import { FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";
//context
import { useAuthContext } from "@/context/AuthContext";
//component
import { AdminPanelBox } from "@/Components/AdminPanel";

const AdminPanelBoxList = [
  { title: "درآمد", Icon: FaMoneyBillAlt, desc: "درآمد در یک ماه گذشته" },
  { title: "فروش", Icon: FaShoppingCart, desc: "فروش در یک ماه گذشته" },
  { title: "هزینه", Icon: FaMoneyBillAlt, desc: "هزینه در یک ماه گذشته" },
];

function MainPage() {
  const { userInfos } = useAuthContext();

  return (
    <>
      <h2 className="mt-4 text-xl font-bold duration-500 ease-out animate-in slide-in-from-bottom">
        خوش آمدید ،{" "}
        <span className="text-admin-blue-color">{userInfos?.name}</span>
      </h2>
      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AdminPanelBoxList.map((boxInfo) => (
          <AdminPanelBox key={boxInfo.title} {...boxInfo} />
        ))}
      </section>
    </>
  );
}

export { MainPage };
