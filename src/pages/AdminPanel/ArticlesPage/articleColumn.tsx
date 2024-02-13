import { ColumnDef } from "@tanstack/react-table";

//component
import { ArticleActionCell } from "./ArticleActionCell";

//type
import type { ArticleType } from "@/types/shared";

export const articleColumns: ColumnDef<ArticleType>[] = [
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
    header: "عنوان",
  },

  {
    accessorKey: "shortName",
    header: "لینک",
    enableSorting: false,
  },
  {
    accessorFn: ({ creator }) => creator.name,
    header: "نویسنده",
  },
  {
    accessorKey: "publish",
    header: "وضعیت مقاله",
    cell: ({row}) => row.original.publish === 1 ? "منتشر شده" : "پیش نویس" 
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: ArticleActionCell,
    enableSorting: false,
  },
];
