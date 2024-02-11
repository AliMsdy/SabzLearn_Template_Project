import { ColumnDef } from "@tanstack/react-table";

//component
import { DiscountActionCell } from "./discountActionCell";

//type
import type { DiscountType } from "@/types/shared";

export const discountColumns: ColumnDef<DiscountType>[] = [
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
    accessorKey: "code",
    header: "کد",
  },
  {
    accessorKey: "percent",
    header: "درصد",
  },
  {
    accessorKey: "max",
    header: "حداکثر استفاده",
    enableSorting: false,
  },
  {
    accessorKey: "uses",
    header: "دفعات استفاده",
    enableSorting: false,
  },
  {
    accessorKey: "creator",
    header: "سازنده",
    enableSorting: false,
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: DiscountActionCell,
    enableSorting: false,
  },
];
