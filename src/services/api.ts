import mainAxios from "axios";
import { toast } from "react-toastify";
import axios from "./axios";

//type
import {
  ContactUsInputTypes,
  LoginInputTypes,
  RegisterInputTypes,
} from "@/types/shared";

//query API
const getCourses = async () => {
  const { data } = await axios.get("/courses");
  return data;
};
const getCourse = async (shortName: string) => {
  const { data } = await axios.get(`/courses/${shortName}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

const getCategoryCourses = async (categoryName: string) => {
  const { data } = await axios.get(`/courses/category/${categoryName}`);
  return data;
};

const getArticleInfo = async (shortName: string) => {
  const { data } = await axios.get(`/articles/${shortName}`);
  return data;
};
const getArticles = async () => {
  const { data } = await axios.get("/articles");
  return data;
};

const getUserInfo = async (token: string) => {
  const { data } = await axios.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getTopBarLinks = async () => {
  const { data } = await axios.get("/menus/topbar");
  return data;
};
const getAllMenus = async () => {
  const { data } = await axios.get("/menus");
  return data;
};

//mutation API

const submitCourseComment = async (commentData: {
  body: string;
  courseShortName: string;
  score: string;
}) => {
  const { data } = await axios.post("/comments", commentData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

const submitContactUsForm = async (contactData: ContactUsInputTypes) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = await axios.post("/contact", contactData);
  if (data.status === 201) {
    toast.success("پیغام شما با موفقیت به مدیران سایت ارسال شد");
  }
  console.log(data);
  return data.data;
};

const subscribeToNewsletter = async (email:{email:string}) => {
  const {status} = await axios.post("/newsletters", email);
  if (status === 201) {
    toast.success("ایمیل شما با موفقیت در خبرنامه ثبت شد");  
  }
};

//Authentication API
const registerUser = async (data: RegisterInputTypes) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const { data: responseData, status } = await axios.post(
      "/auth/register",
      data,
    );
    if (status === 201) {
      toast.success("کاربر با موفقیت ثبت شد");
      return responseData;
    }
  } catch (error) {
    // narrowing error type to axios Error type
    if (mainAxios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        //conflict Error
        toast.error("ایمیل یا نام کاربری قبلا ثبت شده است");
      }
    }
  }
};

const loginUser = async (data: LoginInputTypes) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data: responseData } = await axios.post("/auth/login", {
    identifier: data.emailOrUsername,
    password: data.password,
  });
  toast.success("با موفقیت وارد شدید");
  return responseData;
};

export {
  getAllMenus,
  getArticleInfo,
  getArticles,
  getCategoryCourses,
  getCourse,
  getCourses,
  getTopBarLinks,
  getUserInfo,
  loginUser,
  registerUser,
  submitContactUsForm,
  submitCourseComment,
  subscribeToNewsletter
};
