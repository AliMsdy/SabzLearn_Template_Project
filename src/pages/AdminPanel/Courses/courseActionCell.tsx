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
import type { CourseType } from "@/types/shared";
import { Row } from "@tanstack/react-table";



function CourseActionCell({ row }: { row: Row<CourseType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { mutate: deleteCourse } = useMutateCall(["deleteCourseFromDB"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Courses"],
      });
      toast.success("دوره مورد نظر با موفقیت حذف شد.");
    },
    onError: () => {
      toast.error("حذف دوره با مشکلی مواجه شد.");
    },
  });
  const handleDeleteCourse = () => {
    deleteCourse({
      url: `/courses/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };


  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف دوره مطمئن هستید؟"
        clickHandler={handleDeleteCourse}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
      
    </div>
  );
}

export { CourseActionCell };

