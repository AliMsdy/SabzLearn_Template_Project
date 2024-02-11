import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

//components
import { Button } from "@/Components";
import { AlertDialog } from "@/Components/AdminPanel";

//type
import type { DiscountType } from "@/types/shared";
import { Row } from "@tanstack/react-table";

function DiscountActionCell({ row }: { row: Row<DiscountType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { mutate: deleteDiscountCode } = useMutateCall(["deleteDiscountCode"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Discounts"],
      });
      toast.success("کد تخفیف مورد نظر با موفقیت حذف شد.");
    },
    onError: () => {
      toast.error("حذف کد تخفیف با مشکلی مواجه شد.");
    },
  });
  const handleDeleteDiscountCode = () => {
    deleteDiscountCode({
      url: `/offs/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف این کد تخفیف مطمئن هستید؟"
        clickHandler={handleDeleteDiscountCode}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
    </div>
  );
}

export { DiscountActionCell };
