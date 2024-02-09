import { sessionColumns } from "./sessionColumns";


//components
import { DataTable, Section } from "@/Components/AdminPanel"
import { AddNewSession } from "./AddNewSession"

//api
import { useQueryCall } from "@/hooks";

function Sessions() {
  const { data: sessions = [] } = useQueryCall(["Sessions"], {
    url: "/courses/sessions",
  });
  return (
    <div>
        <AddNewSession />
        <Section className="mt-8 font-bold">
        <DataTable
          columns={sessionColumns}
          data={sessions.reverse()}
          title={
            <p className="mb-4">
              لیست <span className="text-admin-blue-color">آخرین جلسات </span> افزوده شده 
            </p>
          }
        />
      </Section>
    </div>
  )
}

export { Sessions }