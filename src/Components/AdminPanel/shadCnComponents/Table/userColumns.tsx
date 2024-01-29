import { ColumnDef } from "@tanstack/react-table";

//component
import { ActionCell } from "./actionCell";

//icon
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

export type UserTable = {
  _id: string;
  name: string;
  phone: number;
  email: string;
};

export const userColumns: ColumnDef<UserTable>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return (
        <div
          className="relative flex cursor-pointer items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {column.getIsSorted() === "asc" ? (
            <LuArrowUp className=" absolute right-0 h-6 w-6" />
          ) : (
            <LuArrowDown className=" absolute right-0 h-6 w-6" />
          )}
          <span>شناسه</span>
        </div>
      );
    },

    cell: ({ row }) => {
      const amount = parseFloat(row.id);
      const formatted = new Intl.NumberFormat("fa").format(amount + 1);
      return <div className="text-lg font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "نام و نام خانوادگی",
    
  },
  {
    accessorKey: "phone",
    header: "شماره",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="relative flex cursor-pointer items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {column.getIsSorted() === "asc" ? (
            <LuArrowUp className=" absolute right-0 h-6 w-6" />
          ) : (
            <LuArrowDown className=" absolute right-0 h-6 w-6" />
          )}

          <span>Email</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: ActionCell,
  },
];
