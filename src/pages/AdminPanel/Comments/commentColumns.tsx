import { ColumnDef } from "@tanstack/react-table";

//component
import { CommentActionCell } from "./commentActionCell";

//type
import type { CommentType } from "@/types/shared";

//utils
import { cn } from "@/lib/utils";

export const commentColumns: ColumnDef<CommentType>[] = [
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
    accessorFn: ({creator}) => creator.name,
    header: "کاربر",
  },

  {
    accessorKey: "course",
    header: "دوره",
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: CommentActionCell,
    enableSorting: false,
  },
];
