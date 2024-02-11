import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

//components
import { Button, Input } from "@/Components";
import { AlertDialog, Modal } from "@/Components/AdminPanel";
import {
  DialogClose,
  DialogFooter,
} from "@/Components/AdminPanel/shadCnComponents/Dialog";

//type
import type { CommentType } from "@/types/shared";
import type { Row } from "@tanstack/react-table";
type RespondToCommentFormInputType = {
  body: string;
};

function CommentActionCell({ row }: { row: Row<CommentType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const methods = useForm<RespondToCommentFormInputType>({
    defaultValues: {
      body: row.original.answer ? row.original.answerContent?.body : "",
    },
  });
  const { mutate: deleteComment } = useMutateCall(["deleteCommentMessage"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Comments"],
      });
      toast.success("کامنت مورد نظر با موفقیت حذف شد.");
    },
    onError: () => {
      toast.error("حذف کامنت با مشکلی مواجه شد.");
    },
  });
  const { mutate: banUser } = useMutateCall(["banUser"], {
    onSuccess: async () => {
      toast.success("کاربر مورد نظر با موفقیت از سایت بن شد.");
    },
    onError: () => {
      toast.error("مشکلی پیش آمد،دوباره تلاش کنید");
    },
  });
  const { mutate: acceptComment } = useMutateCall(["acceptComment"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Comments"],
      });
      toast.success("کامنت با موفقیت تایید شد.");
    },
    onError: () => {
      toast.error("مشکلی پیش آمد،دوباره تلاش کنید");
    },
  });
  const { mutate: rejectComment } = useMutateCall(["rejectComment"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Comments"],
      });
      toast.success("کامنت با موفقیت رد شد.");
    },
    onError: () => {
      toast.error("مشکلی پیش آمد،دوباره تلاش کنید");
    },
  });
  const { mutate: sendResponse } = useMutateCall(["sendResponseToComment"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Comments"],
      });
      toast.success("پاسخ با موفقیت برای کامنت کاربر ارسال شد.");
    },
    onError: () => {
      toast.error("ارسال پاسخ کامنت با مشکل همراه بود دوباره سعی کنید");
    },
  });
  const handleDeleteComment = () => {
    deleteComment({
      url: `/comments/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleResponseToComment = (data: RespondToCommentFormInputType) => {
    sendResponse({
      url: `/comments/answer/${row.original._id}`,
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const handleBanUser = () => {
    banUser({
      url: `/users/ban/${row.original.creator._id}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const handleAcceptComment = () => {
    acceptComment({
      url: `/comments/accept/${row.original._id}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const handleRejectComment = () => {
    rejectComment({
      url: `/comments/reject/${row.original._id}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف کامنت مطمئن هستید؟"
        clickHandler={handleDeleteComment}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />

      <Modal
        DialogTriggerElement={
          <Button className="bg-sky-500">مشاهده کامنت</Button>
        }
        title="کامنت ارسالی از سوی کاربر"
      >
        <mark className="-mb-2 w-fit rounded-md bg-admin-blue-color p-1 text-white">
          کامنت ارسالی:{" "}
        </mark>
        <blockquote className="mb-1">
          <p className="mb-1">{row.original.body}</p>
        </blockquote>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleResponseToComment)}>
            <Input
              element="textarea"
              rows={5}
              label={`${
                row.original.answer
                  ? "(شما قبلا به این کامنت پاسخ داده اید یا آن را تایید کرده اید)"
                  : "پاسخ خود را وارد کنید "
              }`}
              name="body"
              placeholder="پاسخ..."
              id="response"
              className="mt-4"
            />
            <div className="flex justify-end">
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="submit" className="mt-3">
                    ارسال پاسخ
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </FormProvider>
      </Modal>

      <AlertDialog
        message="آیا از بن شدن ارسال کننده مطمئن هستید؟"
        clickHandler={handleBanUser}
        AlertTrigger={<Button className="bg-orange-700">بن کاربر</Button>}
      />
      {row.original.answer ? (
        <AlertDialog
          message="آیا از رد شدن کامنت مطمئن هستید؟"
          clickHandler={handleRejectComment}
          AlertTrigger={<Button className="bg-rose-700">رد کامنت</Button>}
        />
      ) : (
        <AlertDialog
          message="آیا از تایید شدن کامنت مطمئن هستید؟"
          clickHandler={handleAcceptComment}
          AlertTrigger={
            <Button className="bg-primary-color">تایید کامنت</Button>
          }
        />
      )}
    </div>
  );
}

export { CommentActionCell };
