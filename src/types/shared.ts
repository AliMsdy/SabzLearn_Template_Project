import React, {
  Dispatch,
  SetStateAction,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

type Children = {
  children: React.ReactNode;
};
type SetState<T> = Dispatch<SetStateAction<T>>;

type LandingCountUptype = {
  numberValue: number;
  subTitle: string;
  svgSrc: string;
  key: string;
};

type CourseType = {
  _id: string;
  cover: string;
  registers: number;
  price: number;
  creator: string;
  name: string;
  shortName: string;
  isForSlider?: boolean;
  description: string;
  isComplete: 0 | 1;
  categoryID: {
    title: string;
  };
  support:string;
  discount:number;
  courseAverageScore:number;
};

type OrderType = {
  _id: string;
  course: CourseType;
  price: number;
  createdAt:string;
  user:string;
};

type CreatorType = {
  _id: string;
  name: string;
  role: string;
  profile: string;
  email: string;
  username: string;
};

type DiscountType = {
  _id:string;
  code:string;
  percent:string;
  max:string;
  uses:string;
  creator:string;
}

type ArticleType = {
  cover: string;
  shortName: string;
  title: string;
  description: string;
  publish: 0 | 1;
  _id: string;
  creator: CreatorType;
};

type SessionType = {
  _id: string;
  title: string;
  course: {
    _id: string;
    name: string;
  };
  time: string;
  free: "0" | "1";
};

type RegisterInputTypes = {
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginInputTypes = {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
};

type ContactUsInputTypes = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  body: string;
  answer: number;
};

type UserType = {
  name: string;
  email: string;
  password: string;
  username: string;
  profile: string;
  role: string;
  phone:string;
  courses: [];
  notifications: [];
};

type LinkType = {
  title: string;
  href: string;
  submenus: LinkType[] | [];
};

type TicketType = {
  _id:string;
  departmentID:string;
  departmentSubID:string;
  priority:number;
  title:string;
  body:string;
user:string;
answer:number;
course:string;
isAnswer:number;
createdAt:string;
}

type MenusType = {
  _id: string;
  title: string;
  href: string;
  parent: MenusType;
};

type CommentType = {
  _id: string;
  title: string;
  course: string;
  creator: CreatorType;
  answerContent: (Omit<CommentType, "course"> & { course: CourseType }) | null;
  body: string;
  createdAt: string;
  answer: number;
  isAnswer: number;
  score:number;
};

type AddNewCourseInputTypes = {
  name: string;
  description: string;
  categoryID: string;
  price: string;
  shortName: string;
  cover: File | "";
  status: "presell" | "start";
  support: "گروه تلگرامی" | "پرسش و پاسخ سبزلرن" | "";
};
type AddNewArticleInputTypes = {
  title: string;
  description: string;
  categoryID: string;
  shortName: string;
  cover: File | "";
  body: string;
};
type AddNewSessionInputTypes = {
  title: string;
  relatedCourse: string;
  time: string;
  video: File | "";
  free: "0" | "1";
};
type AddNewDiscountInputTypes = {
  code: string;
  percent: string;
  max: string;
  course: string;
};

type AddNewTicketInputType = {
  departmentID: string;
  departmentSubID: string;
  title: string;
  body: string;
  priority: string;
  course?:string;
}
type radioInputProps = {
  id: string;
  value: string;
};

type InputListType = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    element?: string;
    options?: { title: string; value: string; disabled?: boolean }[];
    presell?: radioInputProps;
    start?: radioInputProps;
    withMoney?: radioInputProps;
    free?: radioInputProps;
    isValidationStylesEnabled?: boolean;
  };

export type {
  AddNewArticleInputTypes,
  AddNewCourseInputTypes,
  AddNewSessionInputTypes,
  ArticleType,
  Children,
  CommentType,
  ContactUsInputTypes,
  CourseType,
  InputListType,
  LandingCountUptype,
  LinkType,
  LoginInputTypes,
  MenusType,
  RegisterInputTypes,
  SessionType,
  SetState,
  UserType,
  AddNewDiscountInputTypes,
  DiscountType,
  OrderType,
  AddNewTicketInputType,
  TicketType
};
