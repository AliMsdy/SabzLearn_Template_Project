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
import type { ContactUsInputTypes } from "@/types/shared";
import type { Row } from "@tanstack/react-table";
type ContactFormInputType = {
  answer: string;
};

function ContactActionCell({ row }: { row: Row<ContactUsInputTypes> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const methods = useForm<ContactFormInputType>({
    defaultValues: {
      answer: "",
    },
  });
  const { mutate: deleteMessage } = useMutateCall(["deleteSentMessage"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Contacts"],
      });
      toast.success("پیام مورد نظر با موفقیت حذف شد.");
    },
    onError: () => {
      toast.error("حذف پیام با مشکلی مواجه شد.");
    },
  });
  const { mutate: sendResponse } = useMutateCall(["sendResponseToUserEmail"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Contacts"],
      });
      toast.success("پیام با موفقیت برای کاربر ایمیل شد.");
    },
    onError: () => {
      toast.error("ارسال پیام با مشکل همراه بود دوباره سعی کنید");
    },
  });
  const handleDeleteMessage = () => {
    deleteMessage({
      url: `/contact/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleResponseToMessage = (data: ContactFormInputType) => {
    sendResponse({
      url: "/contact/answer",
      data: { ...data, email: row.original.email },
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <AlertDialog
        message="آیا از حذف پیغام ارسالی مطمئن هستید؟"
        clickHandler={handleDeleteMessage}
        AlertTrigger={<Button className="bg-red-600">حذف</Button>}
      />

      <Modal
        DialogTriggerElement={<Button>مشاهده پیام</Button>}
        title="پیغام ارسالی از سوی کاربر"
        // clickHandler={handleResponseToMessage}
      >
        <mark className="-mb-2 w-fit rounded-md bg-admin-blue-color p-1 text-white">
          پیغام ارسالی:{" "}
        </mark>
        <blockquote className="mb-1">
          <p className="mb-1">{row.original.body}</p>
          <footer className="text-left">فرستنده: {row.original.name}</footer>
        </blockquote>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleResponseToMessage)}>
            <Input
              element="textarea"
              rows={5}
              label="پاسخ خود را وارد کنید"
              name="answer"
              placeholder="پاسخ..."
              id="response"
              className="mt-4"
              spellCheck="false"
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
    </div>
  );
}

export { ContactActionCell };
