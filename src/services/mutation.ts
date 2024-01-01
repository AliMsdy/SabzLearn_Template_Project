import { useMutation } from "@tanstack/react-query";
import { registerUser,loginUser } from "./api";

//type
import { RegisterInputTypes,LoginInputTypes } from "@/types/shared";


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

export { useRegister,useLogin};
