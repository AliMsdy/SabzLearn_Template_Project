import {
  editUserInfosInputList,
  editUserInfosValidationSchema,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

//component
import { AlertDialog } from "@/Components/AdminPanel";

//context
import { Button, Input } from "@/Components";
//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

type EditUserInfosInputTypes = {
  name: string;
  email: string;
  phone: string;
  username: string;
  newPassword: string;
  confirmNewPassword: string;
};
function EditUserInfos() {
  const { userInfos, token } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { mutate: saveUserInfos } = useMutateCall(["editAndSaveUserInfos"], {
    onSuccess: async () => {
      toast.success("اطلاعات با موفقیت ثبت شد");
      methods.setValue("confirmNewPassword", "");
      methods.setValue("newPassword", "");
    },
    onError: () => {
      toast.error("مشکلی پیش آمد، دوباره امتحان کنید");
    },
  });
  const methods = useForm<EditUserInfosInputTypes>({
    resolver: yupResolver(editUserInfosValidationSchema),
    defaultValues: {
      name: userInfos!.name,
      email: userInfos!.email,
      phone: userInfos!.phone,
      username: userInfos!.username,
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit: SubmitHandler<EditUserInfosInputTypes> = (data) => {
    const { confirmNewPassword, ...newData } = data; //eslint-disable-line
    saveUserInfos({
      url: "/users",
      method: "PUT",
      data: { ...newData, password: newData.newPassword },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="mt-8 flex flex-wrap justify-between gap-2 gap-y-4 text-sm sm:mt-0">
        {editUserInfosInputList.map((input) => {
          return input.name === "username" ? (
            <div className="w-full" key={input.name}>
              <Input {...input} />
              <i className="mt-4 block pr-4">
                اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
              </i>
            </div>
          ) : input.name === "newPassword" ? (
            <div key={input.name} className="mt-4 w-full">
              <div className="mb-4 border-b-2 border-solid border-primary-color pb-3 text-lg">
                تغییر گذرواژه
              </div>
              <Input {...input} />
            </div>
          ) : (
            <div className="w-full" key={input.name}>
              <Input {...input} />
            </div>
          );
        })}
        <div className="flex w-full justify-end">
          <AlertDialog
            open={open}
            setOpen={setOpen}
            message="آیا از ذخیره تغییرات مطمئن هستید؟"
            clickHandler={() => {
              setOpen(false);
              methods.handleSubmit(onSubmit)();
            }}
            AlertTrigger={<Button className="mt-4">ذخیره تغییرات</Button>}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export { EditUserInfos };
