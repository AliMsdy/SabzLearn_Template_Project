import { useAuthContext } from "@/context/AuthContext";

//context
import { orderColumn } from "./orderColumn";

//components
import { DataTable } from "@/Components/AdminPanel";

//api
import { useQueryCall } from "@/hooks";

function Orders() {
  const { token } = useAuthContext();
  const { data: userOrders = [] } = useQueryCall(["UserOrders"], {
    url: "/orders",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (
    <div className="">
      <DataTable
        isForUserPanel={true}
        paginationSize={8}
        columns={orderColumn}
        data={userOrders}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color">سفارش ها</span>
          </p>
        }
      />
    </div>
  );
}

export { Orders };
