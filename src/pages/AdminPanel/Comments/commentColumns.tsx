import { ColumnDef } from "@tanstack/react-table";

//component
import { CommentActionCell } from "./commentActionCell";

//type
import type { CommentType } from "@/types/shared";

//svg
import StarUnfilled from "/images/svgs/star.svg";
import StarFilled from "/images/svgs/star_fill.svg";

//utils
import { cn } from "@/lib/utils";

export const commentColumns: ColumnDef<CommentType>[] = [
  {
    accessorKey: "_id",
    header: "شناسه",
    cell: ({ row }) => {
      const amount = parseFloat(row.id);
      const formatted = new Intl.NumberFormat("fa").format(amount + 1);
      return (
        <div
          className={cn("text-lg font-medium", {
            "bg-primary-color": row.original.answer,
            "bg-red-400": !row.original.answer,
          })}
        >
          {formatted}
        </div>
      );
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
    accessorFn: ({ creator }) => creator.name,
    header: "کاربر",
  },

  {
    accessorKey: "course",
    header: "دوره",
  },
  {
    accessorKey: "score",
    header: "امتیاز کاربر برای دوره",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {
            <>
              <>
                {Array(5 - row.original.score)
                  .fill(0)
                  .map((_,i) => (
                    <img src={StarUnfilled} alt="score" key={i} />
                  ))}
              </>
              <>
                {Array(row.original.score)
                  .fill(0)
                  .map((_,i) => (
                    <img src={StarFilled} alt="score" key={i} />
                  ))}
              </>
            </>
          }
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: CommentActionCell,
    enableSorting: false,
  },
];
