import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { useCallback } from "react";
import { toast } from "react-toastify";

//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

//components
import { Button } from "@/Components";
import { AlertDialog } from "@/Components/AdminPanel";

//type
import { type UserTable } from "./userColumns";
//utils

function UserActionCell({ row }: { row: Row<UserTable> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const refetchUsersData = useCallback(async (message: string) => {
    await queryClient.invalidateQueries({
      queryKey: ["Users"],
    });
    toast.success(message);
  }, []); //eslint-disable-line
  const { mutate: deleteUser } = useMutateCall(["deleteUserFromDB"], {
    onSuccess: () => refetchUsersData("کاربر مورد نظر با موفقیت حذف شد."),
  });
  const { mutate: banUser } = useMutateCall(["banUser"], {
    onSuccess: () =>
      refetchUsersData("کاربر مورد نظر با موفقیت از سایت بن شد."),
  });
  // const { mutate: editUserInfo } = useMutateCall(["editUserInfo"], {
  //   onSuccess: () => refetchUsersData("اطلاعات کاربر با موفقیت آپدیت شد.")
  // });
  const handleDeleteUser = () => {
    deleteUser({
      url: `/users/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  // const handleEditUser = (data:any) => {
  //   editUserInfo({
  //     url: `/users/ban/${row.original._id}`,
  //     method: "PUT",
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  // };
  const handleBaneUser = () => {
    banUser({
      url: `/users/ban/${row.original._id}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف کاربر مطمئن هستید؟"
        clickHandler={handleDeleteUser}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />
      <AlertDialog
        message="آیا از بن شدن کاربر مطمئن هستید؟"
        clickHandler={handleBaneUser}
        AlertTrigger={<Button className="bg-lime-800">بن کاربر</Button>}
      />
    </div>
  );
}

export { UserActionCell };

