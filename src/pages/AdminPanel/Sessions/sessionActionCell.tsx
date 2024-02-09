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
import type { SessionType } from "@/types/shared";
import { Row } from "@tanstack/react-table";

function SessionActionCell({ row }: { row: Row<SessionType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { mutate: deleteSession } = useMutateCall(["deleteSessionFromCourse"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Sessions"],
      });
      toast.success("جلسه مورد نظر با موفقیت حذف شد.");
    },
    onError: () => {
      toast.error("حذف جلسه با مشکلی مواجه شد.");
    },
  });
  const handleDeleteSession = () => {
    deleteSession({
      url: `/courses/sessions/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف این جلسه مطمئن هستید؟"
        clickHandler={handleDeleteSession}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
    </div>
  );
}

export { SessionActionCell };
