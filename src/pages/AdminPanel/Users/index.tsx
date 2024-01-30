import {
  addUserInputList,
  addUserValidationSchema,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";


//components
import { Button, Input, SimpleLoading } from "@/Components";

//icons
import { FaUserPlus } from "react-icons/fa6";

//api
import { useMutateCall } from "@/hooks";
import type { AxiosError } from "axios";

//type
import type { RegisterInputTypes } from "@/types/shared";
type AddUserInputTypes = Omit<RegisterInputTypes, "confirmPassword">;

function Users() {
  const methods = useForm<AddUserInputTypes>({
    resolver: yupResolver(addUserValidationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
    },
  });
  
  const { mutate: registerUser, isPending } = useMutateCall(["registerUser"], {
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      toast.success("حساب کاربری با موفقیت ساخته شد.");
      methods.reset()
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        //conflict Error
        toast.error("ایمیل یا نام کاربری قبلا ثبت شده است");
      }
      if (error.response?.status === 403) {
        //banned User Error
        toast.error("این شماره تلفن از سایت بن شده است");
      }
    },
  });
  const onSubmit: SubmitHandler<AddUserInputTypes> = (data) => {
    console.log(data);
    registerUser({
      url: "/auth/register",
      data: { ...data, confirmPassword: data.password },
    });
  };
  return (
    <section className="mt-3 rounded-md bg-white p-3 shadow-admin-panel-box-shadow">
      <h2 className="mt-2 text-2xl">
        افزودن <span className="text-admin-blue-color">کاربر</span> جدید
      </h2>
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10  md:flex-row">
            {addUserInputList.map((inputArray, index) => {
              return (
                <div className="flex flex-col gap-4 md:w-1/2 " key={index}>
                  {inputArray.map((input) => (
                    <Input key={input.name} {...input} />
                  ))}
                </div>
              );
            })}
          </div>
          <Button
            disabled={isPending}
            className="relative mt-6 bg-admin-blue-color pr-12"
          >
            {isPending ? (
              <SimpleLoading className="absolute right-4 h-6 w-6" />
            ) : (
              <FaUserPlus size={18} className="absolute right-4" />
            )}
            <div>{isPending ? "در حال ثبت اطلاعات " : "افزودن کاربر"}</div>
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}

export { Users };
