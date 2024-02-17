import { useAuthContext } from "@/context/AuthContext";
import { useQueryCall } from "@/hooks";

//components
import { DataTable, Section } from "@/Components/AdminPanel";
//columns
import { ticketColumns } from "./ticketColumns";


function Tickets() {
  const { token } = useAuthContext();
  const { data: tickets = [] } = useQueryCall(
    ["Tickets"],
    {
      url: "/tickets",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return (
    <Section>
      <DataTable
        columns={ticketColumns}
        data={tickets}
        isLimitedPaddingEnabled={true}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color ">تیکت های </span> ارسالی
          </p>
        }
      />
    </Section>
  );
}

export { Tickets };