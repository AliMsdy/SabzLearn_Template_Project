import { ColumnDef } from "@tanstack/react-table";
import { OrderActionCell } from "./orderActionCell";

//type
import { OrderType } from "@/types/shared";

export const orderColumn: ColumnDef<OrderType>[] = [
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
    accessorKey: "createdAt",
    header: "تاریخ",
    cell: ({ row }) =>
      new Date(row.original.createdAt.split("T")[0]).toLocaleDateString(
        "fa-IR",
      ),
    enableSorting: false,
  },
  {
    cell: "تکمیل شده",
    header: "وضعیت",
  },
  {
    accessorFn: ({ course }) => course.name,
    header: "دوره",
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: "مبلغ",
    cell: ({ row }) =>
      row.original.price === 0 ? "رایگان" : `${row.original.price.toLocaleString()} تومان`,
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: OrderActionCell,
    enableSorting: false,
  },
];
