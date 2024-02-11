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
  key:string;
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
};



type ArticleType = {
  cover: string;
  shortName: string;
  title: string;
  description: string;
  _id: string;
  creator: {
    name: string;
    role: string;
    profile: string;
  };
};

type SessionType = {
  _id:string;
  title:string;
  course:{
    _id:string;
    name:string;
  }
  time:string;
  free:"0" | "1"
}

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
  courses: [];
  notifications: [];
};

type LinkType = {
  title: string;
  href: string;
  submenus: LinkType[] | [];
};

type MenusType = {
  _id:string;
  title:string;
  href:string;
  parent:MenusType
}

type CommentType = {
  _id: string;
  title: string;
  creator: {
    name: string;
    role: string;
  };
  body: string;
  createdAt: string;
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
    isValidationStylesEnabled?:boolean;
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
  LinkType,
  LoginInputTypes,
  RegisterInputTypes,
  SetState,
  UserType,
  SessionType,
  LandingCountUptype,
  MenusType
};
