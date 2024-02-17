import { IconType } from "react-icons";
import * as yup from "yup";
// import { string, object } from 'yup';

//icons
import {
  FaEnvelope,
  FaLockOpen,
  FaPen,
  FaPhoneFlip,
  FaUser,
} from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";

type InputItem = {
  placeholder: string;
  type: string;
  Icon: IconType;
};

type RegisterInputItem = InputItem & {
  name:
    | "email"
    | "password"
    | "username"
    | "phone"
    | "name"
    | "confirmPassword";
};

type LoginInputItem = InputItem & {
  name: "emailOrUsername" | "password";
};

//schema Validation
const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(21, "حداکثر تعداد کاراکتر 21 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
  username: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  phone: yup
    .string()
    .required("فیلد را تکمیل کنید(الزامی)")
    .matches(
      /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
      "شماره تلفن شما به درستی وارد نشده است",
    ),
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
  //   "پسورد باید حداقل شامل 10 کاراکتر و یک عدد و یک حرف بزرک",
  // ),
  confirmPassword: yup
    .string()
    .required("فیلد را تکمیل کنید(الزامی)")
    .when("password", {
      is: (password: string) =>
        !!password && password.length > 0 ? true : false,
      then: (schema) =>
        schema.oneOf([yup.ref("password")], "پسورد با فیلد بالا مطابقت ندارد"),
    }),
});

const loginValidationSchema = yup.object().shape({
  emailOrUsername: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  password: yup
    .string()
    .min(5, "حداقل تعداد کاراکتر 5 عدد میباشد")
    .max(12, "حداکثر تعداد کاراکتر 12 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
  rememberMe: yup.boolean().required(),
});

const contactUsValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(21, "حداکثر تعداد کاراکتر 21 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
  email: yup
    .string()
    .email("ایمیل خود را به درستی وارد کنید")
    .required("فیلد را تکمیل کنید(الزامی)"),
  phone: yup
    .string()
    .required("فیلد را تکمیل کنید(الزامی)")
    .matches(
      /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
      "شماره تلفن شما به درستی وارد نشده است",
    ),
  body: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
});

const sendCommentSchema = yup.object().shape({
  textArea: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  score: yup.string().required("لطفا امتیاز را وارد کنید"),
});

const addUserValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(21, "حداکثر تعداد کاراکتر 21 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
  username: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  phone: yup
    .string()
    .required("فیلد را تکمیل کنید(الزامی)")
    .matches(
      /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
      "شماره تلفن شما به درستی وارد نشده است",
    ),
  email: yup
    .string()
    .email("ایمیل خود را به درستی وارد کنید")
    .required("فیلد را تکمیل کنید(الزامی)"),
  password: yup
    .string()
    .min(8, "حداقل تعداد کاراکتر 8 عدد میباشد")
    .max(12, "حداکثر تعداد کاراکتر 12 عدد میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
});
const addCategoryValidationSchema = yup.object().shape({
  title: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  name: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
});

const addCourseValidationSchema = yup.object().shape({
  name: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  description: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  categoryID: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  price: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  shortName: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  support: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  cover: yup
    .mixed()
    .test(
      "fileRequired",
      "عکسی را باید برای دوره انتخاب کنید",
      function (value) {
        return value instanceof File || value instanceof FileList;
      },
    )
    .test(
      "fileType",
      "فقط فایل‌های تصویری با فرمت (jpg ,jpeg ,png ) مجاز هستند",
      function (value) {
        if (value instanceof FileList) {
          return ["image/jpeg", "image/jpg", "image/png"].includes(
            value[0].type,
          );
        } else if (value instanceof File) {
          return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }
        return false;
      },
    )
    .test("fileSize", "حجم فایل باید کمتر از 2 مگابایت باشد", (value) => {
      if (value instanceof FileList) {
        return value[0] && value[0].size <= 2 * 1024 * 1024;
      } else if (value instanceof File) {
        return value && value.size <= 2 * 1024 * 1024;
      }
      return false;
    }),
});

const addSessionValidationSchema = yup.object().shape({
  title: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  relatedCourse: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  time: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  free: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  video: yup
    .mixed()
    .test(
      "fileRequired",
      "ویدیویی را باید برای جلسه انتخاب کنید",
      function (value) {
        return value instanceof File || value instanceof FileList;
      },
    )
    .test(
      "fileType",
      "فقط فایل‌های ویدیویی با فرمت (mp4 ,mkv ) مجاز هستند",
      function (value) {
        if (value instanceof FileList) {
          return ["video/mp4", "video/mkv"].includes(value[0].type);
        } else if (value instanceof File) {
          return ["video/mp4", "video/mkv"].includes(value.type);
        }
        return false;
      },
    ),
  // .test("fileSize", "حجم فایل باید کمتر از 2 مگابایت باشد", (value) => {
  //   if (value instanceof FileList) {
  //     return value[0] && value[0].size <= 2 * 1024 * 1024;
  //   } else if (value instanceof File) {
  //     return value && value.size <= 2 * 1024 * 1024;
  //   }
  //   return false;
  // }),
});
const addArticleValidationSchema = yup.object().shape({
  title: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  description: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  categoryID: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  shortName: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  cover: yup
    .mixed()
    .test(
      "fileRequired",
      "عکسی را باید برای مقاله انتخاب کنید",
      function (value) {
        return value instanceof File || value instanceof FileList;
      },
    )
    .test(
      "fileType",
      "فقط فایل‌های تصویری با فرمت (jpg ,jpeg ,png ) مجاز هستند",
      function (value) {
        if (value instanceof FileList) {
          return ["image/jpeg", "image/jpg", "image/png"].includes(
            value[0].type,
          );
        } else if (value instanceof File) {
          return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }
        return false;
      },
    )
    .test("fileSize", "حجم فایل باید کمتر از 2 مگابایت باشد", (value) => {
      if (value instanceof FileList) {
        return value[0] && value[0].size <= 2 * 1024 * 1024;
      } else if (value instanceof File) {
        return value && value.size <= 2 * 1024 * 1024;
      }
      return false;
    }),
  body: yup.string().required("مقاله نمیتواند بدون محتوا باشد..."),
});
const addMenuValidationSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "حداقل تعداد کاراکتر 5 میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
  href: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  parent: yup.string(),
});
const addDiscountValidationSchema = yup.object().shape({
  code: yup
    .string()
    .min(5, "حداقل تعداد کاراکتر 5 میباشد")
    .required("فیلد را تکمیل کنید(الزامی)"),
  percent: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  max: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  course: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
});

const registerToCourseWithOffCodeValidationSchema = yup.object().shape({
  offCode: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
});
const sendTicketValidationSchema = yup.object().shape({
  departmentID: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  departmentSubID: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  title: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  body: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  priority: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
  course: yup.string().when("departmentSubID", {
    is: "63b688c5516a30a651e98156",
    then: (schema) => schema.required("فیلد را تکمیل کنید(الزامی)"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

//input lists

const registerInputList: RegisterInputItem[] = [
  {
    placeholder: "نام و نام خانوادگی",
    type: "text",
    Icon: FaUser,
    name: "name",
  },
  { placeholder: "نام کاربری", type: "text", Icon: FaPen, name: "username" },
  { placeholder: "شماره تلفن", type: "tel", Icon: FaPhoneFlip, name: "phone" },
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

const contactUsInputList = [
  {
    placeholder: "نام و نام خانوادگی",
    type: "text",
    Icon: FaUser,
    name: "name",
  },
  { placeholder: "آدرس ایمیل", type: "email", Icon: FaEnvelope, name: "email" },
  {
    placeholder: "شماره تماس",
    type: "phone",
    Icon: FaPhoneFlip,
    name: "phone",
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

const addUserInputList = [
  [
    {
      placeholder: "نام و نام خانوادگی کاربر را وارد کنید",
      type: "text",
      name: "name",
      label: "نام و نام خانوادگی",
    },
    {
      placeholder: "نام کاربری را وارد کنید",
      type: "text",
      name: "username",
      label: "نام کاربری",
    },
    {
      placeholder: "آدرس ایمیل را وارد کنید",
      type: "email",
      name: "email",
      label: "ایمیل",
    },
  ],
  [
    {
      placeholder: "رمز عبور کاربر را وارد کنید",
      type: "password",
      name: "password",
      label: "رمز عبور",
    },
    {
      placeholder: "شماره تلفن را وارد کنید",
      type: "tel",
      name: "phone",
      label: "تلفن",
    },
  ],
];

const addCourseCategoryInputList = [
  {
    placeholder: "عنوان دسته بندی را وارد کنید",
    type: "text",
    name: "title",
    label: "عنوان",
  },
  {
    type: "text",
    name: "name",
    label: "اسم کوتاه",
  },
];

const addNewCourseInputList = [
  [
    {
      name: "name",
      label: "نام دوره",
      placeholder: "نام دوره را وارد کنید...",
      type: "text",
      id: "name",
    },
    {
      name: "description",
      label: "توضیحات دوره",
      element: "textarea",
      rows: 4,
      placeholder: "درباره دوره توضیح مختصر دهید...",
      id: "description",
    },
    {
      name: "categoryID",
      label: "دسته بندی دوره",
      element: "select",
      id: "categoryID",
      options: [
        {
          title: "دسته بندی دوره را انتخاب کنید",
          value: "",
          disabled: true,
        },
      ],
    },
    {
      name: "support",
      label: "نحوه پشتیبانی دوره",
      element: "select",
      id: "support",
      options: [
        {
          title: "نحوه پشتیبانی را انتخاب کنید",
          value: "",
          disabled: true,
        },
        {
          title: "پرسش و پاسخ سبزلرن",
          value: "پرسش و پاسخ سبزلرن",
        },
        {
          title: "گروه تلگرامی",
          value: "گروه تلگرامی",
        },
      ],
    },
    {
      type: "radio",
      id: "status",
      presell: {
        id: "presell",
        value: "presell",
      },
      start: {
        id: "start",
        value: "start",
      },
    },
  ],
  [
    {
      name: "price",
      label: "قیمت دوره",
      placeholder: "قیمت دوره را وارد کنید...",
      type: "number",
      id: "price",
    },
    {
      name: "shortName",
      label: "نام کوتاه (URL) دوره",
      placeholder: "نامی کوتاه برای دوره انتخاب کنید",
      type: "text",
      id: "shortName",
    },
    {
      type: "file",
      id: "cover",
      className: "hidden",
      accept: "image/png, image/jpg, image/jpeg",
    },
  ],
];

const addNewArticleInputList = [
  [
    {
      name: "title",
      label: "عنوان مقاله",
      placeholder: "عنوان مقاله را وارد کنید",
      type: "text",
      id: "title",
      isValidationStylesEnabled: false,
    },
    {
      name: "description",
      label: "چکیده مقاله",
      element: "textarea",
      rows: 4,
      placeholder: "خلاصه یا توضیحی مختصر درباره مقاله...",
      id: "description",
      isValidationStylesEnabled: false,
    },
    {
      name: "categoryID",
      label: "دسته بندی مقاله",
      element: "select",
      id: "categoryID",
      options: [
        {
          title: "دسته بندی مقاله را انتخاب کنید",
          value: "",
          disabled: true,
        },
      ],
    },
  ],
  [
    {
      name: "shortName",
      label: "لینک مقاله",
      placeholder: "لینک کوتاه برای مقاله را وارد کنید",
      type: "text",
      id: "shortName",
      isValidationStylesEnabled: false,
    },
    {
      type: "file",
      id: "cover",
      className: "hidden",
      accept: "image/png, image/jpg, image/jpeg",
    },
  ],
];
const addNewSessionInputList = [
  [
    {
      name: "title",
      label: "عنوان جلسه",
      placeholder: "عنوان جلسه را وارد کنید",
      type: "text",
      id: "title",
      isValidationStylesEnabled: false,
    },
    {
      name: "relatedCourse",
      label: "دوره مربوطه",
      element: "select",
      id: "relatedCourse",
      options: [
        {
          title: "دوره مربوطه را وارد کنید...",
          value: "",
          disabled: true,
        },
      ],
    },
    {
      type: "radio",
      id: "free",
      withMoney: {
        id: "withMoney",
        value: 0,
      },
      free: {
        id: "free",
        value: 1,
      },
    },
  ],
  [
    {
      name: "time",
      label: "مدت زمان جلسه",
      placeholder: "مدت زمان جلسه را با فرمت  mm ss  وارد کنید",
      id: "time",
      isValidationStylesEnabled: false,
    },
    {
      type: "file",
      id: "video",
      className: "hidden",
      accept: "video/mp4, video/mkv",
    },
  ],
];

const addNewMenuInputList = [
  [
    {
      name: "title",
      label: "عنوان منو",
      placeholder: "عنوان منو را وارد کنید",
      type: "text",
      id: "title",
      isValidationStylesEnabled: false,
    },
    {
      name: "parent",
      label: "منوی اصلی",
      element: "select",
      id: "parent",
      options: [
        {
          title: "منوی اصلی را انتخاب کنید",
          value: "",
          disabled: true,
        },
      ],
    },
  ],
  [
    {
      name: "href",
      label: "آدرس منو",
      placeholder: "عنوان منو را وارد کنید",
      type: "text",
      id: "href",
      isValidationStylesEnabled: false,
    },
  ],
];
const addNewDiscountInputList = [
  [
    {
      name: "code",
      label: "کد تخفیف",
      placeholder: "کد تخفیف دلخواه خود را وارد کنید",
      type: "text",
      id: "code",
      isValidationStylesEnabled: false,
    },

    {
      name: "course",
      label: "دوره مربوطه",
      element: "select",
      id: "course",
      options: [
        {
          title: "دروه را انتخاب کنید",
          value: "",
          disabled: true,
        },
      ],
    },
  ],
  [
    {
      name: "percent",
      label: "درصد تخفیف",
      placeholder: "درصد تخفیف را وارد کنید",
      type: "text",
      id: "percent",
      isValidationStylesEnabled: false,
    },
    {
      name: "max",
      label: "حداکثر استفاده",
      placeholder: "حد اکثر تعداد استفاده از کد  تخفیف را وارد کنید",
      type: "text",
      id: "max",
      isValidationStylesEnabled: false,
    },
  ],
];
const addNewTicketInputList = [
  [
    {
      name: "departmentID",
      label: "دپارتمان مورد نظر را انتخاب کنید",
      element: "select",
      id: "departmentID",
      options: [
        {
          title: "دپارتمان را انتخاب کنید",
          value: "",
          disabled: true,
        },
      ],
    },

    {
      name: "title",
      label: "عنوان تیکت را انتخاب نمایید",
      placeholder: "عنوان...",
      type: "text",
      id: "title",
      isValidationStylesEnabled: false,
    },
    {
      name: "course",
      label: "دوره مربوطه را انتخاب کنید: ",
      element: "select",
      id: "courses",
      options: [
        {
          title: "دوره مورد نظر را انتخاب کنید",
          value: "",
          disabled: true,
        },
      ],
    },
  ],
  [
    {
      name: "departmentSubID",
      label: "واحد مربوطه را انتخاب نمایید",
      element: "select",
      id: "departmentSubID",
      options: [
        {
          title: "لطفا ابتدا دپارتمان مورد نظر را اتخاب نمایید",
          value: "",
          disabled: true,
        },
      ],
    },
    {
      name: "priority",
      label: "اهمیت تیکت را انتخاب نمایید",
      element: "select",
      id: "priority",
      options: [
        {
          title: "سطح اولویت را انتخاب نمایید",
          value: "",
          disabled: true,
        },
        {
          value: "3",
          title: "کم",
        },
        {
          value: "2",
          title: "متوسط",
        },
        {
          value: "1",
          title: "زیاد",
        },
      ],
    },
  ],
];
export {
  addArticleValidationSchema,
  addCategoryValidationSchema,
  addCourseCategoryInputList,
  addCourseValidationSchema,
  addDiscountValidationSchema,
  addMenuValidationSchema,
  addNewArticleInputList,
  addNewCourseInputList,
  addNewDiscountInputList,
  addNewMenuInputList,
  addNewSessionInputList,
  addNewTicketInputList,
  addSessionValidationSchema,
  addUserInputList,
  addUserValidationSchema,
  contactUsInputList,
  contactUsValidationSchema,
  loginInputList,
  loginValidationSchema,
  registerInputList,
  registerToCourseWithOffCodeValidationSchema,
  registerValidationSchema,
  sendCommentSchema,
  sendTicketValidationSchema,
};
