import mainAxios from "axios";
import { toast } from "react-toastify";
import axios from "./axios";

//type
import { LoginInputTypes, RegisterInputTypes } from "@/types/shared";

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
    headers:{
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  });
  return data;
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
  getCourse,
  getCourses,
  getTopBarLinks,
  getUserInfo,
  loginUser,
  registerUser,
  submitCourseComment,
};
