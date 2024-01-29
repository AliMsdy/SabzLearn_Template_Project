import {
  loginInputList,
  loginValidationSchema,
} from "@/constants/formInputsInformation";
import { useAuthContext } from "@/context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//component
import { Button, Input, SimpleLoading } from "@/Components";

//icons
import { FaSignInAlt } from "react-icons/fa";

//type
import { LoginInputTypes } from "@/types/shared";

//api
import { useMutateCall } from "@/hooks";

function Login() {
  const navigate = useNavigate();
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const { login } = useAuthContext();
  const { mutate: loginUser, isPending } = useMutateCall(
    ["loginUser"],
    {
      onSuccess: async ({
        data: { accessToken },
      }: {
        data: { accessToken: string };
      }) => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        login(accessToken);
        // navigating to the homepage
        navigate("/", { replace: true });
        toast.success("خوش آمدید");
      },
    },
  );
  const methods = useForm<LoginInputTypes>({
    resolver: yupResolver(loginValidationSchema),
    mode: "onChange",
    defaultValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
  });
  const isFormValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<LoginInputTypes> = (data) => {
    loginUser({
      url: "/auth/login",
      data: {
        identifier: data.emailOrUsername,
        password: data.password,
      },
    });
  };
  const recaptchaChagneHandler = () => {
    //sending the token we get from recaptcha to backend
    // console.log(value)
    setIsRecaptchaVerified(true);
  };

  return (
    <div className="relative overflow-hidden before:absolute before:-inset-2 before:-top-24 before:-z-10 before:h-[480px] before:w-[150%] before:rotate-[-4deg] before:bg-[#2bce56] after:absolute after:top-0 after:-z-20 after:h-[480px] after:w-[150%]  after:rotate-[-4deg] after:bg-[#2bce5699]">
      <section className=" container mx-auto mt-14 flex max-w-[90%] items-center justify-center sm:max-w-[70%] md:mt-24 ">
        <div className="w-full max-w-[500px] rounded-lg border-b-4 border-solid border-primary-color bg-white p-6 pb-10 shadow-custom dark:bg-dark-theme-secondary">
          <h1 className="mt-3 text-center text-2xl text-secondary-color dark:text-white">
            ورود به حساب کاربری
          </h1>
          <h2 className="mt-2 text-center text-lg text-secondary-color dark:text-white">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </h2>
          <div className="my-6 flex items-center justify-center gap-x-2 rounded-md bg-gray-color p-4 dark:bg-slate">
            <span className="text-secondary-color dark:text-white">
              کاربر جدید هستید؟
            </span>
            <Button
              component="link"
              className="bg-[#bbb] p-2 hover:text-[#1e83f0]"
              to="/register"
            >
              ثبت نام
            </Button>
          </div>
          {/* FORM SECTION START */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              {loginInputList.map((input) => (
                <Input key={input.name} {...input} />
              ))}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={recaptchaChagneHandler}
              />
              <Button
                disabled={!isFormValid || isPending || !isRecaptchaVerified}
                className="relative w-full"
              >
                {isPending ? (
                  <SimpleLoading className="absolute right-4 h-6 w-6" />
                ) : (
                  <FaSignInAlt size={18} className="absolute right-4" />
                )}

                <div>{isPending ? "در حال بررسی اطلاعات " : "ورود"}</div>
              </Button>

              <div className="flex flex-col justify-between gap-y-2 sm:mt-4 sm:flex-row">
                <div className="flex gap-x-2">
                  <input {...methods.register("rememberMe")} type="checkbox" />
                  مرا بخاطر بسپار
                </div>
                <div>
                  <Link to="/#">رمز عبور خود را فراموش کرده اید؟</Link>
                </div>
              </div>
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

export { Login };
