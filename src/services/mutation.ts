import { useMutation } from "@tanstack/react-query";
import { registerUser,loginUser,submitContactUsForm } from "./api";

//type
import { RegisterInputTypes,LoginInputTypes,ContactUsInputTypes } from "@/types/shared";


// const useSubmitComment = () => {
//   return useMutation({
//     mutationFn: (data:) => registerUser(data),
//   });
// };


const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInputTypes) => registerUser(data),
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: (data:LoginInputTypes) => loginUser(data),
  });
};

const useContactUs = () => {
  return useMutation({
    mutationFn: (data: ContactUsInputTypes) => submitContactUsForm(data),
  });
};

export { useRegister,useLogin,useContactUs};
