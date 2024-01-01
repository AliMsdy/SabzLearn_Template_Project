import { IconType } from "react-icons";
import * as yup from "yup";

//icons
import { FaEnvelope, FaLockOpen, FaUser,FaPen  } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
type InputItem = {
  placeholder: string;
  type: string;
  Icon: IconType;
};

type RegisterInputItem = InputItem & {
  name: "email" | "password" | "username" | "name" | "confirmPassword";
};

type LoginInputItem = InputItem & {
  name: "emailOrUsername" | "password" ;
};

//schema Validation
const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(21, "حداکثر تعداد کاراکتر 21 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
    username: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  email: yup
    .string()
    .email("ایمیل خود را به درستی وارد کنید")
    .required("فیلد را تکمیل کنید(الزامی)"),
  password: yup
    .string()
    .min(8, "حداقل تعداد کاراکتر 8 عدد میباشد")
    .max(12, "حداکثر تعداد کاراکتر 12 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
    // .matches(
    //   /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //   "پسورد باید حداقل شامل 10 کاراکتر و یک عدد و یک حرف بزرک"
    // ),
    confirmPassword: yup
      .string()
      .required("فیلد را تکمیل کنید(الزامی)")
      .when("password", {
        is: (password:string) => (!!password && password.length > 0 ? true : false),
        then: (schema) =>
          schema.oneOf([yup.ref("password")], "پسورد با فیلد بالا مطابقت ندارد"),
      })
  
});

const loginValidationSchema = yup.object().shape({
  emailOrUsername: yup
    .string()
    .required("فیلد را تکمیل کنید(الزامی)"),
  password: yup
    .string()
    .min(5, "حداقل تعداد کاراکتر 5 عدد میباشد")
    .max(12, "حداکثر تعداد کاراکتر 12 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
  rememberMe: yup.boolean().required(),
});

const sendCommentSchema = yup.object().shape({
  textArea: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  score:yup.string().required("لطفا امتیاز را وارد کنید")
});

//input lists

const registerInputList: RegisterInputItem[] = [
  { placeholder: "نام و نام خانوادگی", type: "text", Icon: FaUser, name: "name" },
  { placeholder: "نام کاربری", type: "text", Icon: FaPen , name: "username" },
  { placeholder: "آدرس ایمیل", type: "email", Icon: FaEnvelope, name: "email" },
  {
    placeholder: "رمز عبور",
    type: "password",
    Icon: FaLockOpen,
    name: "password",
  },
  {
    placeholder: "تایید رمز عبور",
    type: "password",
    Icon: TbPasswordUser,
    name: "confirmPassword",
  },
];

const loginInputList: LoginInputItem[] = [
  {
    placeholder: "نام کاربری یا آدرس ایمیل",
    type: "text",
    Icon: FaUser,
    name: "emailOrUsername",
  },
  {
    placeholder: "رمز عبور",
    type: "password",
    Icon: FaLockOpen,
    name: "password",
  },
];


export {
  loginInputList,
  loginValidationSchema,
  registerInputList,
  registerValidationSchema,
  sendCommentSchema,
};
