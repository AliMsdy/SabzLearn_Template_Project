import React, { Dispatch, SetStateAction } from "react";

type Children = {
  children: React.ReactNode;
};
type SetState<T> = Dispatch<SetStateAction<T>>;

type CourseType = {
  _id:string;
  cover: string;
  registers: number;
  price: number;
  creator: string;
  name: string;
  shortName: string;
  isForSlider?: boolean;
  description:string;
};

type ArticleType = {
  cover:string;
  shortName:string;
  title:string;
  description:string
  _id:string
  creator:{
    name:string
    role:string
    profile:string
  }
}

type RegisterInputTypes = {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginInputTypes = {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
};

type UserType = {
  name: string;
  email: string;
  password: string;
  username: string;
  role: string;
  courses:[]
  notifications:[]
};

type LinkType = {
  title: string;
  href: string;
  submenus: LinkType[] | [];
}


type CommentType = {
  _id:string
  title:string
  creator:{
    name:string
    role:string
  };
  body:string;
  createdAt:string;
}


export type { Children, CourseType, RegisterInputTypes, SetState,UserType,LoginInputTypes,LinkType,CommentType,ArticleType };
