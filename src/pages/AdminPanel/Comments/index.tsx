//api
import { useQueryCall } from "@/hooks";

//components

import { DataTable, Section } from "@/Components/AdminPanel";

//utils
import { commentColumns } from "./commentColumns";

function Comments() {
  const { data: comments = [] } = useQueryCall(["Comments"], {
    url: "/comments",
  });
  return (
    <Section>
      <DataTable
        columns={commentColumns}
        data={comments}
        isLimitedPaddingEnabled={true}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color">کامنت ها</span>
          </p>
        }
      />
    </Section>
  );
}

export { Comments };
