import { useQuery } from "@tanstack/react-query";
import { getTopBarLinks,getAllMenus,getCourse, getCourses } from "./api";


// const useUserInfo = () => {
//   return useQuery({
//     queryKey: ["userInfo"],
//     queryFn: (token) => getUserInfo(token),
//     enabled:false
//   });
// };


const useTopBarLinks = () => {
  return useQuery({
    queryKey: ["TopBarLinks"],
    queryFn: getTopBarLinks,
  });
};
const useAllMenus= () => {
  return useQuery({
    queryKey: ["AllMenus"],
    queryFn: getAllMenus,
  });
};
const useCourses = () => {
  return useQuery({
    queryKey: ["Courses"],
    queryFn: getCourses,
  });
}

const useCourseInfo= (shortName:string) => {
  return useQuery({
    queryKey: ["CourseInfo",shortName],
    queryFn: () => getCourse(shortName),
  });
};
export { useTopBarLinks,useAllMenus,useCourseInfo,useCourses };
