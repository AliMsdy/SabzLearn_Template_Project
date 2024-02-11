import { discountColumns } from "./discountColumns";

//components
import { DataTable, Section } from "@/Components/AdminPanel";
import { AddNewDiscount } from "./AddNewDiscount";

//api
import { useQueryCall } from "@/hooks";

//context
import { useAuthContext } from "@/context/AuthContext";

function Discounts() {
  const { token } = useAuthContext();
  const { data: discounts = [] } = useQueryCall(["Discounts"], {
    url: "/offs",
    headers: { Authorization: `Bearer ${token}` },
  });
  return (
    <div>
      <AddNewDiscount />
      <Section className="mt-8 font-bold">
        <DataTable
          columns={discountColumns}
          data={discounts}
          title={
            <p className="mb-4">
              لیست <span className="text-admin-blue-color">کد های تخفیف </span>
            </p>
          }
        />
      </Section>
    </div>
  );
}

export { Discounts };
