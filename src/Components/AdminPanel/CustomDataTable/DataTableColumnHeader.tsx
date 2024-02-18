import type { Column } from "@tanstack/react-table";
//icons
import { RxArrowDown, RxArrowUp, RxCaretSort, RxEyeNone } from "react-icons/rx";

import { Button } from "@/Components";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadCnComponents/DropDown";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="-ml-3 h-8">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <RxArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <RxArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <RxCaretSort className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className="flex justify-between font-iranSanse"
            onClick={() => column.toggleSorting(false)}
          >
            <RxArrowUp className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            صعودی
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between font-iranSanse"
            onClick={() => column.toggleSorting(true)}
          >
            <RxArrowDown className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            نزولی
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-between font-iranSanse"
            onClick={() => column.toggleVisibility(false)}
          >
            <RxEyeNone className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
