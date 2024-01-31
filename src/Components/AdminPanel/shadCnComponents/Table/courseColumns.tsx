import { ColumnDef } from "@tanstack/react-table";

//component
import { CourseActionCell } from "./courseActionCell";

//type
import type { CourseType } from "@/types/shared";

export const courseColumns: ColumnDef<CourseType>[] = [
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
    accessorKey: "name",
    header: "عنوان دوره",
  },
  {
    accessorKey: "price",
    header: "مبلغ",
    cell: ({ row }) =>
      row.original.price === 0 ? "رایگان" : row.original.price.toLocaleString(),
  },
  {
    accessorKey: "isComplete",
    header: "وضعیت",
    cell: ({ row }) => {
      const isComplete = row.original.isComplete;
      return isComplete ? "تکمیل شده" : "در حال برگذاری";
    },
    enableSorting: false,
  },
  {
    accessorKey: "shortName",
    header: "لینک",
    enableSorting: false,
  },
  {
    accessorKey: "creator",
    header: "مدرس",
  },
  {
    accessorKey: "categoryID",
    header: "دسته بندی",
    cell: ({ row }) => row.original.categoryID.title,
    enableSorting: false,
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: CourseActionCell,
    enableSorting: false,
  },
];
