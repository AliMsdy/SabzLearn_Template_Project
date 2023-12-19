import { Link, useLocation } from "react-router-dom";

//component
import { Button } from "@/Components";

//icons
import { FaSignInAlt } from "react-icons/fa";
import { FaEnvelope, FaLockOpen, FaUser, FaUserPlus } from "react-icons/fa6";
const loginInputList = [
  { placeholder: "نام کاربری یا آدرس ایمیل", type: "text", Icon: FaUser },
  { placeholder: "رمز عبور", type: "password", Icon: FaLockOpen },
];
const registerInputList = [
  { placeholder: "نام کاربری", type: "text", Icon: FaUser },
  { placeholder: "آدرس ایمیل", type: "email", Icon: FaEnvelope },
  { placeholder: "رمز عبور", type: "password", Icon: FaLockOpen },
];

// sm:min-w-[500px]  md:min-w-[750px]
function Login() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  const inputList = isLogin ? loginInputList : registerInputList;
  return (
    <div className="relative overflow-hidden before:absolute before:-inset-2 before:-top-24 before:-z-10 before:h-[480px] before:w-[150%] before:rotate-[-4deg] before:bg-[#2bce56] after:absolute after:top-0 after:-z-20 after:h-[480px] after:w-[150%]  after:rotate-[-4deg] after:bg-[#2bce5699]">
      <section className=" container mx-auto mt-14 flex max-w-[90%] items-center justify-center sm:max-w-[70%] md:mt-24 ">
        <div className="w-full max-w-[500px] rounded-lg border-b-4 border-solid border-primary-color bg-white p-6 pb-10 shadow-custom dark:bg-dark-theme-secondary">
          <h1 className="mt-3 text-center text-2xl text-secondary-color dark:text-white">
            {isLogin ? "ورود به حساب کاربری" : "ساخت حساب کاربری"}
          </h1>
          <h2 className="mt-2 text-center text-lg text-secondary-color dark:text-white">
            {isLogin
              ? "خوشحالیم دوباره میبینیمت دوست عزیز :)"
              : "خوشحالیم قراره به جمع ما بپیوندی (:"}
          </h2>
          <div className="my-6 flex items-center justify-center gap-x-2 rounded-md bg-gray-color p-4 dark:bg-slate">
            <span className="text-secondary-color dark:text-white">
              {isLogin ? "کاربر جدید هستید؟" : "قبلا ثبت نام کرده اید؟"}
            </span>
            <Button
            component="link"
              className="bg-[#bbb] p-2 hover:text-[#1e83f0]"
              to={isLogin ? "/" : "login"}
            >
              {isLogin ? "ثبت نام" : "وارد شوید"}
            </Button>
          </div>
          {/* FORM SECTION START */}
          <form className="flex flex-col gap-y-4">
            {inputList.map(({ Icon, ...rest }) => (
              <div
                className="relative flex items-center justify-between  rounded-md border-2 border-solid border-[#e6e6e6] p-1  shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] dark:border-none dark:bg-slate"
                key={rest.placeholder}
              >
                <input
                  className="w-full p-2 focus:outline-none dark:bg-transparent"
                  {...rest}
                />
                <Icon
                  size={18}
                  className="absolute left-3 text-[#ccc] dark:text-white"
                />
              </div>
            ))}
            <Button className="relative w-full">
              {isLogin ? (
                <FaSignInAlt size={18} className="absolute right-4" />
              ) : (
                <FaUserPlus size={18} className="absolute right-4" />
              )}
              <div>{isLogin ? "ورود" : "ثبت نام"}</div>
            </Button>
            {isLogin && (
              <div className="flex flex-col justify-between gap-y-2 sm:mt-4 sm:flex-row">
                <div className="flex gap-x-2">
                  <input type="checkbox" name="" id="" />
                  مرا بخاطر بسپار
                </div>
                <div>
                  <Link to="/#">رمز عبور خود را فراموش کرده اید؟</Link>
                </div>
              </div>
            )}
          </form>
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
