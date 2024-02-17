import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall, useQueryCall } from "@/hooks";

//components
import { Button, Input } from "@/Components";
import { Modal } from "@/Components/AdminPanel";
import {
  DialogClose,
  DialogFooter,
} from "@/Components/AdminPanel/shadCnComponents/Dialog";

//type
import type { TicketType } from "@/types/shared";
import type { Row } from "@tanstack/react-table";
type SendTicketAnswerFormInputType = {
  body: string;
};

//validation
import * as yup from "yup";
const sendTicketAnswerValidationSchema = yup.object().shape({
  body: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
});

function TicketActionCell({ row }: { row: Row<TicketType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { data: answerToTicket = {} } = useQueryCall(
    ["AnswerToTicket", row.original._id],
    {
      url: `/tickets/answer/${row.original._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      enabled: !!row.original.answer,
    },
  );
  const methods = useForm<SendTicketAnswerFormInputType>({
    resolver: yupResolver(sendTicketAnswerValidationSchema),
    defaultValues: {
      body: "",
    },
    values: { body: answerToTicket.answer },
  });

  const { mutate: sendTicketAnswer } = useMutateCall(
    ["sendResponseToUserTicket"],
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["Tickets"],
        });
        toast.success("پاسخ با موفقیت برای کاربر ارسال شد.");
      },
      onError: () => {
        toast.error("ارسال پاسخ با مشکل همراه بود دوباره سعی کنید");
      },
    },
  );

  const handleResponseToTicket = (data: SendTicketAnswerFormInputType) => {
    console.log("data",data)
    sendTicketAnswer({
      url: "/tickets/answer",
      data: { ...data, ticketID: row.original._id },
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <Modal
        DialogTriggerElement={<Button>مشاهده تیکت</Button>}
        title="تیکت ارسالی از سوی کاربر"
      >
        <mark className="-mb-2 w-fit rounded-md bg-admin-blue-color p-1 text-white">
          تیکت ارسالی:{" "}
        </mark>
        <blockquote className="mb-1">
          <p className="mb-1">{row.original.body}</p>
          <footer className="text-left">فرستنده: {row.original.user}</footer>
        </blockquote>
        <p>
          فرستاده شده در:{" "}
          {new Date(row.original.createdAt).toLocaleString("fa-IR")}
        </p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleResponseToTicket)}>
            <Input
              element="textarea"
              rows={5}
              label="پاسخ خود را وارد کنید"
              name="body"
              placeholder="پاسخ..."
              id="body"
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
    </div>
  );
}

export { TicketActionCell };
