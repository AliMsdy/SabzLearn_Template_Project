import { ColumnDef } from "@tanstack/react-table";

//component
import { TicketActionCell } from "./ticketActionCell";

//type
import type { TicketType } from "@/types/shared";
//utils
import { cn } from "@/lib/utils";

export const ticketColumns: ColumnDef<TicketType>[] = [
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
    accessorKey: "title",
    header: "عنوان تیکت",
    enableSorting: false,
  },
  {
    accessorKey: "departmentID",
    header: "دپارتمان",
    enableSorting: false,
  },
  {
    accessorKey: "departmentSubID",
    header: "واحد",
    enableSorting: false,
  },
  {
    accessorKey: "priority",
    cell: ({ row }) => {
      switch (row.original.priority) {
        case 1:
          return <div className="bg-red-500 text-white">زیاد</div>;
        case 2:
          return <div className="bg-amber-600 text-white">متوسط</div>;
        case 3:
          return <div className="bg-primary-color text-white">کم</div>;
      }
    },
    header: "اهمیت تیکت",
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: TicketActionCell,
    enableSorting: false,
  },
];
