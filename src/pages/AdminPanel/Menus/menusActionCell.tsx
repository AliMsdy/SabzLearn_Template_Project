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
import type { MenusType } from "@/types/shared";
import { Row } from "@tanstack/react-table";

function MenusActionCell({ row }: { row: Row<MenusType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { mutate: deleteMenu } = useMutateCall(["deleteMenuFromDB"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Menus"],
      });
      toast.success("منو مورد نظر با موفقیت حذف شد.");
    },
    onError: () => {
      toast.error("حذف منو با مشکلی مواجه شد.");
    },
  });
  const handleDeleteMenu = () => {
    deleteMenu({
      url: `/menus/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف منو مطمئن هستید؟"
        clickHandler={handleDeleteMenu}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
    </div>
  );
}

export { MenusActionCell };
