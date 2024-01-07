import { useQuery } from "@tanstack/react-query";
import { getTopBarLinks,getAllMenus,getCourse, getCourses, getCategoryCourses, getArticleInfo, getArticles,getSearchResult } from "./api";

//MENUS AND LINKS START
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
//MENUS AND LINKS END


//COURSES START

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



const useCategoryCourses= (shortName:string) => {
  return useQuery({
    queryKey: ["categoryCourses",shortName],
    queryFn: () => getCategoryCourses(shortName),
  });
};
//COURSES END


// ARTICLES START

const useArticles = () => {
  return useQuery({
    queryKey: ["Articles"],
    queryFn: getArticles,
  });
}

const useArticleInfo= (shortName:string) => {
  return useQuery({
    queryKey: ["ArticleInfo",shortName],
    queryFn: () => getArticleInfo(shortName),
  });
};

// ARTICLES END


const useSearchQueryResult = (searchedValue:string) => {
  return useQuery({
    queryKey: ["searchResult",searchedValue],
    queryFn: () => getSearchResult(searchedValue),
  });
};


export { useTopBarLinks,useAllMenus,useCourseInfo,useCourses,useCategoryCourses,useArticleInfo,useArticles,useSearchQueryResult };
