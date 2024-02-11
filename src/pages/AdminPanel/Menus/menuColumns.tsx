import { ColumnDef } from "@tanstack/react-table";

//component
import { MenusActionCell } from "./menusActionCell";

//type
import type { MenusType } from "@/types/shared";

//icons
import { FaCheck } from "react-icons/fa6";
export const menuColumns: ColumnDef<MenusType>[] = [
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
    accessorKey: "href",
    header: "مقصد",
  },
  {
    cell: ({
      row: {
        original: { parent },
      },
    }) => {
      return parent ? (
        parent.title
      ) : (
        <span className="flex justify-center text-primary-color" title="صفحه اصلی">
          <FaCheck size={20} />
        </span>
      );
    },
    header: "فرزند...",
    enableSorting: false,
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: MenusActionCell,
    enableSorting: false,
  },
];
