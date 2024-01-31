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
import type { Row } from "@tanstack/react-table";
type CategoryType = {
  _id: string;
  title: string;
};

function CategoryActionCell({ row }: { row: Row<CategoryType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { mutate: deleteCategory } = useMutateCall(["deleteCourseCategory"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Categories"],
        exact: true,
      });
      toast.success("دسته بندی مورد نظر با موفقیت حذف شد.");
    },
  });
  const handleDeleteCategory = () => {
    deleteCategory({
      url: `/category/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const handleEditCategory = () => {};

  return (
    <div className="flex justify-evenly gap-2">
      <Button className="bg-admin-blue-color" onClick={handleEditCategory}>
        ویرایش
      </Button>
      <AlertDialog
        message="آیا از حذف دسته بندی مطمئن هستید؟"
        clickHandler={handleDeleteCategory}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
    </div>
  );
}

export { CategoryActionCell };
