//api
import { useQueryCall } from "@/hooks";

//components

import { DataTable, Section } from "@/Components/AdminPanel";

//utils
import { contactColumns } from "./contactColumns";

function ContactPage() {
  const { data: messages = [] } = useQueryCall(["Contacts"], {
    url: "/contact",
  });

  return (
    <Section>
      <DataTable
        columns={contactColumns}
        data={messages}
        title={
          <p className="mb-4">
            لیست <span className="text-admin-blue-color">پیام ها</span>
          </p>
        }
      />
    </Section>
  );
}

export { ContactPage };
