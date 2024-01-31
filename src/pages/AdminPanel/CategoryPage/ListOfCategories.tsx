import { categoryColumn } from "./categoryColumn";
//components
import { Loading } from "@/Components";
import { DataTable, Section } from "@/Components/AdminPanel";

//api
import { useQueryCall } from "@/hooks";

function ListOfCategories() {
  const { data: categories, isLoading } = useQueryCall(["Categories"], {
    url: "/category",
  });
  if (isLoading) return <Loading />;
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
