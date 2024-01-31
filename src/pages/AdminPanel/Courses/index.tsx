import { courseColumns } from "./courseColumns";
//api
import { useQueryCall } from "@/hooks";

//components
import { Loading } from "@/Components";
import { DataTable, Section } from "@/Components/AdminPanel";

function Courses() {
  const { data: courses, isLoading } = useQueryCall(["Courses"], {
    url: "/courses",
  });
  if (isLoading) return <Loading />;
  return (
    <Section className="mt-8 font-bold">
      <DataTable
        columns={courseColumns}
        data={courses}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color">دوره ها</span>
          </p>
        }
      />
    </Section>
  );
}

export { Courses };
