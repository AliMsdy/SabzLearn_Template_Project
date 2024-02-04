import { categoryColumn } from "./categoryColumn";
//components
import { DataTable, Section } from "@/Components/AdminPanel";

//api
import { useQueryCall } from "@/hooks";

function ListOfCategories() {
  const { data: categories = [] } = useQueryCall(["Categories"], {
    url: "/category",
  });
  return (
    <Section className="mt-8 font-bold">
      <DataTable
        columns={categoryColumn}
        data={categories}
        isPaginatedTable={false}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color">دسته بندی ها</span>
          </p>
        }
      />
    </Section>
  );
}

export { ListOfCategories };

