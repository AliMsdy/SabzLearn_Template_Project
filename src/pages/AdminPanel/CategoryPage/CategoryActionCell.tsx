import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";

//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

//components
import { Button } from "@/Components";
import { AlertDialog, EditModal } from "@/Components/AdminPanel";

//type
import type { Row } from "@tanstack/react-table";
type CategoryType = {
  _id: string;
  title: string;
  name: string;
};

//utils
import { genereteInputListFromColumnList } from "@/utils/createInputList";
import { categoryColumn } from "./categoryColumn";

function CategoryActionCell({ row }: { row: Row<CategoryType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const refetchCategories = useCallback(async (title: string) => {
    await queryClient.invalidateQueries({
      queryKey: ["Categories"],
    });
    toast.success(`دسته بندی مورد نظر با موفقیت ${title} شد.`);
  }, []);//eslint-disable-line
  const { mutate: deleteCategory } = useMutateCall(["deleteCourseCategory"], {
    onSuccess: () => refetchCategories("حذف"),
  });
  const { mutate: editCategory } = useMutateCall(["editCourseCategory"], {
    onSuccess: () => refetchCategories("ویرایش"),
  });
  const handleDeleteCategory = () => {
    deleteCategory({
      url: `/category/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleEditCategory = (data: any) => {
    editCategory({
      url: `/category/${row.original._id}`,
      data: { ...data, name: row.original.name },
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <EditModal
        DialogTriggerElement={
          <Button className="bg-admin-blue-color">ویرایش</Button>
        }
        title="ویرایش دسته بندی"
        inputList={genereteInputListFromColumnList(categoryColumn, row)}
        clickHandler={handleEditCategory}
      />
      <AlertDialog
        message="آیا از حذف دسته بندی مطمئن هستید؟"
        clickHandler={handleDeleteCategory}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
    </div>
  );
}

export { CategoryActionCell };
