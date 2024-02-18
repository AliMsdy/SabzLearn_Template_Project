import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

//components
import { Button } from "@/Components";
import { AlertDialog, Modal } from "@/Components/AdminPanel";
import {
  DialogClose,
  DialogFooter,
} from "@/Components/AdminPanel/shadCnComponents/Dialog";
//type
import { type UserTable } from "./userColumns";
type ChangeUserRoleInputType = {
  role: "ADMIN" | "USER";
};

function UserActionCell({ row }: { row: Row<UserTable> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const methods = useForm<ChangeUserRoleInputType>({
    defaultValues: {
      role: row.original.role,
    },
  });
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
  const { mutate: changeUserRole } = useMutateCall(["changeUserRole"], {
    onSuccess: () => refetchUsersData("نقش کاربر با موفقیت تغییر داده شد"),
  });
  const handleDeleteUser = () => {
    deleteUser({
      url: `/users/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const handleBaneUser = () => {
    banUser({
      url: `/users/ban/${row.original._id}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const handleChangeUserRole = (data: ChangeUserRoleInputType) => {
    changeUserRole({
      url: `/users/role`,
      method: "PUT",
      data: { ...data, id: row.original._id },
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
      <Modal
        DialogTriggerElement={
          <Button className="bg-admin-blue-color">تغییر نقش کاربر</Button>
        }
        title="تغییر نقش کاربر"
      >
        <form onSubmit={methods.handleSubmit(handleChangeUserRole)}>
          <h2 className="mb-2">نقش جدید کاربر را وارد کنید: </h2>
          <div className="flex gap-7">
            <div className="flex cursor-pointer items-center gap-2">
              <label htmlFor="admin" className="cursor-pointer">
                مدیر سایت
              </label>
              <input
                type="radio"
                id="admin"
                value="ADMIN"
                className="cursor-pointer"
                {...methods.register("role")}
              />
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <label htmlFor="user" className="cursor-pointer">
                کاربر سایت
              </label>
              <input
                type="radio"
                id="user"
                value="USER"
                className="cursor-pointer"
                {...methods.register("role")}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="submit" className="mt-3">
                  ذخیره تغییرات
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export { UserActionCell };
