import { courseColumns } from "./courseColumns";
//api
import { useQueryCall } from "@/hooks";

//components
import { DataTable, Section } from "@/Components/AdminPanel";
import { AddNewCourse } from "./AddNewCourse";

function Courses() {
  const { data: courses = [] } = useQueryCall(["Courses"], {
    url: "/courses",
  });
  return (
    <>
      <AddNewCourse />
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
    </>
  );
}

export { Courses };
