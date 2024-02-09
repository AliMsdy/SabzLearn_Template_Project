import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
//components
import { Button } from "@/Components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadCnComponents/Table";
//icons
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from "react-icons/lu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: React.ReactNode;
  isPaginatedTable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  isPaginatedTable = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
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
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    enableSortingRemoval: true,
  });
  return (
    <>
      {title && title}
      <Table style={{ width: table.getTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    style={{
                      width: header.getSize(),
                      boxShadow: "inset 0 0 0 1px #424242",
                    }}
                    key={header.id}
                    className={cn(
                      "group relative top-0 bg-[#f2f7fd] text-lg font-bold text-[#67747e] dark:bg-slate dark:text-[#f5f3f3]",
                      { "cursor-col-resize": header.column.getIsResizing() },
                      { "cursor-pointer": header.column.getCanSort() },
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {(() => {
                      const isSorted = header.column.getIsSorted();
                      if (isSorted === "asc") {
                        return (
                          <LuArrowDown
                            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
                            title="صعودی"
                          />
                        );
                      } else if (isSorted === "desc") {
                        return (
                          <LuArrowUp
                            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
                            title="نزولی"
                          />
                        );
                      } else if (
                        isSorted === false &&
                        header.column.getCanSort()
                      ) {
                        return (
                          <LuArrowUpDown
                            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
                            title="پیش فرض"
                          />
                        );
                      }
                      // Handle other cases if needed
                      return null; // Default case or when isSorted is not a valid value
                    })()}
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
                      boxShadow: "inset 0 0 0 1px #424242",
                    }}
                    className="dark:bg-admin-secondary-dark-color"
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
      {isPaginatedTable && (
        <div className="flex items-center gap-4 py-4">
          <Button onClick={() => table.setPageIndex(0)}>صفحه اول</Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            صفحه قبل
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            صفحه بعد
          </Button>
          <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
            صفحه آخر
          </Button>
        </div>
      )}
    </>
  );
}
