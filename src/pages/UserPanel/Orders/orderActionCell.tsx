//components
import { Button } from "@/Components";

//type
import { OrderType } from "@/types/shared";
import type { Row } from "@tanstack/react-table";

function OrderActionCell({ row }: { row: Row<OrderType> }) {
  return (
    <div className="flex justify-evenly gap-2">
      <Button component="link" to={`/my-account/orders/${row.original._id}`}>
        نمایش جزئیات
      </Button>
    </div>
  );
}

export { OrderActionCell };
