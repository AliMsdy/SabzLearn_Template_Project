import { menuColumns } from "./menuColumns";
//api
import { useQueryCall } from "@/hooks";

//components
import { DataTable, Section } from "@/Components/AdminPanel";
import { AddNewMenu } from "./AddNewMenu";

function Menus() {
  const { data: menus = [] } = useQueryCall(["Menus"], {
    url: "/menus/all",
  });
  return (
    <>
      <AddNewMenu menus={menus} />
      <Section className="mt-8 font-bold">
        <DataTable
          isPaginatedTable={false}
          columns={menuColumns}
          data={menus}
          title={
            <p className="mb-4">
              لیست <span className="text-admin-blue-color">منوها</span>
            </p>
          }
        />
      </Section>
    </>
  );
}

export { Menus };
