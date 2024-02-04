import React, { Dispatch, SetStateAction } from "react";

type Children = {
  children: React.ReactNode;
};
type SetState<T> = Dispatch<SetStateAction<T>>;

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
  categoryID:{
    title:string;
  }
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

type RegisterInputTypes = {
  name: string;
  username: string;
  phone:string;
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
  name: string;
  email: string;
  phone: string;
  body: string;
};

type UserType = {
  name: string;
  email: string;
  password: string;
  username: string;
  profile:string;
  role: string;
  courses: [];
  notifications: [];
};

type LinkType = {
  title: string;
  href: string;
  submenus: LinkType[] | [];
};

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
  status:"presell" | "start";
  support: "گروه تلگرامی" | "پرسش و پاسخ سبزلرن" | "";
};

export type {
  ArticleType,
  Children,
  CommentType,
  CourseType,
  LinkType,
  LoginInputTypes,
  RegisterInputTypes,
  SetState,
  UserType,
  ContactUsInputTypes,
  AddNewCourseInputTypes,
};
