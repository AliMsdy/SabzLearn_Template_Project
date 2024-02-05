//api
import { useQueryCall } from "@/hooks";
//components
import { DataTable, Section } from "@/Components/AdminPanel";

//utils
import { articleColumns } from "./articleColumn";
function ArticlesPage() {
  const { data: articles = [] } = useQueryCall(["Articles"], {
    url: "/articles",
  });
  return (
    <Section>
      <DataTable
        columns={articleColumns}
        data={articles}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color">مقالات</span>
          </p>
        }
      />
    </Section>
  );
}

export { ArticlesPage };
