import { ColumnDef } from "@tanstack/react-table";

//component
import { SessionActionCell } from "./sessionActionCell";

//type
import type { SessionType } from "@/types/shared";

export const sessionColumns: ColumnDef<SessionType>[] = [
  {
    accessorKey: "_id",
    header: "شناسه",
    cell: ({ row }) => {
      const amount = parseFloat(row.id);
      const formatted = new Intl.NumberFormat("fa").format(amount + 1);
      return <div className="text-lg font-medium">{formatted}</div>;
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
    accessorKey: "title",
    header: "عنوان جلسه",
  },
  {
    accessorKey: "time",
    header: "مدت زمان",
    enableSorting: false,
  },

  {
    accessorFn: ({ course }) => course.name,
    header: "دوره",
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: SessionActionCell,
    enableSorting: false,
  },
];
