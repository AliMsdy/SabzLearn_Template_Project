import { ColumnDef } from "@tanstack/react-table";

//component
import { ActionCell } from "./actionCell";


export type UserTable = {
  _id: string;
  name: string;
  phone: number;
  email: string;
};

export const userColumns: ColumnDef<UserTable>[] = [
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
    header: "نام و نام خانوادگی",
  },
  {
    accessorKey: "phone",
    header: "شماره",
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: ActionCell,
    enableSorting: false,
  },
];
