import { ColumnDef } from "@tanstack/react-table";

//component
import { ContactActionCell } from "./contactActionCell";

//type
import type { ContactUsInputTypes } from "@/types/shared";

//utils
import { cn } from "@/lib/utils";

export const contactColumns: ColumnDef<ContactUsInputTypes>[] = [
  {
    accessorKey: "_id",
    header: "شناسه",
    cell: ({ row }) => {
      const amount = parseFloat(row.id);
      const formatted = new Intl.NumberFormat("fa").format(amount + 1);
      return (
        <div
          className={cn("text-lg font-medium", {
            "bg-primary-color": row.original.answer,
            "bg-red-400": !row.original.answer,
          })}
        >
          {formatted}
        </div>
      );
    },
    sortingFn: (a, b) => {
      const aValue = a.index + 1;
      const bValue = b.index + 1;

      // Compare the numeric values for sorting
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    },
  },
  {
    accessorKey: "name",
    header: "نام و نام خانوادگی",
  },

  {
    accessorKey: "email",
    header: "ایمیل",
  },
  {
    accessorKey: "phone",
    header: "شماره تلفن",
    enableSorting: false,
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: ContactActionCell,
    enableSorting: false,
  },
];
