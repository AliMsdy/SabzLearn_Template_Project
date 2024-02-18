import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
//components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadCnComponents/Table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
//icons

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: React.ReactNode;
  isPaginatedTable?: boolean;
  isLimitedPaddingEnabled?: boolean;
  paginationSize?: number;
  isForUserPanel?: boolean;
}

export function CustomDataTable<TData, TValue>({
  columns,
  data,
  title,
  isPaginatedTable = true,
  isLimitedPaddingEnabled = false,
  paginationSize = 5,
  isForUserPanel = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getPaginationRowModel: isPaginatedTable
      ? getPaginationRowModel()
      : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: paginationSize,
      },
    },
    enableSortingRemoval: true,
  });
  return (
    <>
      {title && title}
      <div className="flex items-center py-4">
        {/* search Input  */}
        <div className="relative flex items-center justify-between  rounded-md border-2 border-solid border-[#e6e6e6] p-1  shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:border-none dark:bg-slate ">
          <input
            className="w-full p-2 text-right focus:outline-none dark:bg-transparent dark:text-white"
            placeholder="جستجوی کاربران از طریق نام..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>
        {/* toggle column visibility */}
        <div className="mr-10">
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <Table style={{ width: table.getTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    style={{
                      width: header.getSize(),
                      borderBottom: isForUserPanel ? "1px solid #424242" : "",
                      boxShadow: isForUserPanel
                        ? ""
                        : "inset 0 0 0 1px #424242",
                    }}
                    key={header.id}
                    className={cn(
                      "group relative top-0 bg-[#f2f7fd] text-sm font-bold text-[#67747e] dark:bg-slate dark:text-[#f5f3f3] sm:text-lg",
                      { "cursor-col-resize": header.column.getIsResizing() },
                      // { "cursor-pointer": header.column.getCanSort() },
                    )}
                    // onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute right-0 top-0 h-full w-1.5 cursor-col-resize rounded-full bg-red-500 opacity-0 group-hover:opacity-100 ${
                        header.column.getIsResizing()
                          ? "bg-green-500 opacity-100"
                          : ""
                      }`}
                    />
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="font-iranSanse">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    style={{
                      width: cell.column.getSize(),
                      borderBottom: isForUserPanel ? "1px solid #424242" : "",
                      boxShadow: isForUserPanel
                        ? ""
                        : "inset 0 0 0 1px #424242",
                    }}
                    className={cn("dark:bg-admin-secondary-dark-color", {
                      " p-1.5": isLimitedPaddingEnabled,
                    })}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-4 flex items-center justify-between font-vazir text-sm dark:text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} ردیف از{" "}
        {table.getFilteredRowModel().rows.length} ردیف انتخاب شده است.
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
