import { ColumnDef } from "@tanstack/react-table";

//component
import { DataTableColumnHeader } from "@/Components/AdminPanel/CustomDataTable/DataTableColumnHeader";
import { Checkbox } from "@/Components/AdminPanel/shadCnComponents/Checkbox";
import { UserActionCell } from "./userActionCell";
export type UserTable = {
  _id: string;
  name: string;
  phone: number;
  email: string;
  role: "USER" | "ADMIN";
};

export const userColumns: ColumnDef<UserTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 60,
  },
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="نام کامل" />
    ),
  },
  {
    accessorKey: "phone",
    header: "phone",
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "نقش",
    cell: ({ row }) =>
      row.original.role === "ADMIN" ? (
        <div className="text-primary-color">مدیر</div>
      ) : (
        "کاربر سایت"
      ),
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: UserActionCell,
    enableSorting: false,
  },
];
