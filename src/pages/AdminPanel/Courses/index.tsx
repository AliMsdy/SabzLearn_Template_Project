//api
import { useQueryCall } from "@/hooks";

//components
import { Loading } from "@/Components";
import { DataTable, courseColumns } from "@/Components/AdminPanel";

function Courses() {
  const { data: courses, isLoading } = useQueryCall(["Courses"], {
    url: "/courses",
  });
  if (isLoading) return <Loading />;
  return (
    <section className="mt-8 rounded-md bg-white p-4 text-lg font-bold shadow-admin-panel-box-shadow ">
      <DataTable
        columns={courseColumns}
        data={courses}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color">دوره ها</span>
          </p>
        }
      />
    </section>
  );
}

export { Courses };
