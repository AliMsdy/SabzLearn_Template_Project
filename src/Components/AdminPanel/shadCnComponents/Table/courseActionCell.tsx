import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { toast } from "react-toastify";

//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

//components
import { AlertDialog, Button } from "@/Components";

//type
import type { CourseType } from "@/types/shared";

function CourseActionCell({ row }: { row: Row< CourseType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { mutate: deleteCourse } = useMutateCall(["deleteUserFromDB"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["Courses"], exact: true });
      toast.success("دوره مورد نظر با موفقیت حذف شد.");
    },
  });
  const handleCourseUser = () => {
    deleteCourse({
      url: `/courses/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const handleEditUser = () => {};


  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف دوره مطمئن هستید؟"
        clickHandler={handleCourseUser}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
      <Button className="bg-admin-blue-color" onClick={handleEditUser}>
        ویرایش
      </Button>
    </div>
  );
}

export { CourseActionCell };

