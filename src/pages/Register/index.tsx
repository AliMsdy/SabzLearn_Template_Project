import {
  registerInputList,
  registerValidationSchema,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

//component
import { Button, Input, SimpleLoading } from "@/Components";

//icons
import { FaUserPlus } from "react-icons/fa6";

//api
import { useRegister } from "@/services/mutation";

//type
import { RegisterInputTypes } from "@/types/shared";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { mutateAsync: registerUser, isPending } = useRegister();

  const methods = useForm<RegisterInputTypes>({
    resolver: yupResolver(registerValidationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const isFormValid = methods.formState.isValid;
  const onSubmit: SubmitHandler<RegisterInputTypes> = async (data) => {
    const responseData = await registerUser(data);
    console.log("responseData", responseData);
    if (responseData) {
      login(responseData.accessToken);
      //navigating to the homepage
      navigate("/",{replace:true});
    }
  };

  return (
    <div className="relative overflow-hidden before:absolute before:-inset-2 before:-top-24 before:-z-10 before:h-[480px] before:w-[150%] before:rotate-[-4deg] before:bg-[#2bce56] after:absolute after:top-0 after:-z-20 after:h-[480px] after:w-[150%]  after:rotate-[-4deg] after:bg-[#2bce5699]">
      <section className=" container mx-auto mt-14 flex max-w-[90%] items-center justify-center sm:max-w-[70%] md:mt-24 ">
        <div className="w-full max-w-[500px] rounded-lg border-b-4 border-solid border-primary-color bg-white p-6 pb-10 shadow-custom dark:bg-dark-theme-secondary">
          <h1 className="mt-3 text-center text-2xl text-secondary-color dark:text-white">
            ساخت حساب کاربری
          </h1>
          <h2 className="mt-2 text-center text-lg text-secondary-color dark:text-white">
            خوشحالیم قراره به جمع ما بپیوندی (:
          </h2>
          <div className="my-6 flex items-center justify-center gap-x-2 rounded-md bg-gray-color p-4 dark:bg-slate">
            <span className="text-secondary-color dark:text-white">
              قبلا ثبت نام کرده اید؟
            </span>
            <Button
              component="link"
              className="border-2 bg-[#bbb] p-2 hover:text-[#1e83f0]"
              to={"/login"}
            >
              وارد شوید
            </Button>
          </div>
          {/* FORM SECTION START */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              {registerInputList.map((input) => (
                <Input key={input.name} {...input} />
              ))}
              <Button
                disabled={!isFormValid || isPending}
                className="relative w-full"
              >
                {isPending ? (
                  <SimpleLoading className="absolute right-4 h-6 w-6" />
                ) : (
                  <FaUserPlus size={18} className="absolute right-4" />
                )}
                <div>{isPending ? "در حال ثبت اطلاعات " : "ثبت نام"}</div>
              </Button>
            </form>
          </FormProvider>
          {/* FORM SECTION END */}

          {/* USER NOTIFICATION START */}
          <div className="mt-4 text-xs text-secondary-color dark:text-white md:text-sm">
            <p className="mb-1">سلام کاربر محترم:</p>
            <ul className="mr-8 list-disc space-y-1">
              <li>
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li>
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li>لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید</li>
            </ul>
          </div>
          {/* USER NOTIFICATION END */}
        </div>
      </section>
    </div>
  );
}

export { Register };
