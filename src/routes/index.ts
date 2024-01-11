import importLazyPage from "@/utils/importLazyPage";
import { renderRoutes } from "./generate-routes";


// Layouts
import { AdminPanelLayout } from "@/Layout/AdminPanelLayout";
import { AnonymousLayout } from "@/Layout/AnonymousLayout";
import { MainLayout } from "@/Layout/MainLayout";

// Pages
// import { ContactUs, Login, Register, SearchPage } from "@/pages";

//adminPanelPages
// import { MainPage, Users } from "@/pages/AdminPanel";



//code splitting the pages
//mainPages
const HomePage = importLazyPage("HomePage");
const CoursePage = importLazyPage("Course", "CoursePage");
const ArticlePage = importLazyPage("Article", "ArticlePage");
const CategoryPage = importLazyPage("Category", "CategoryPage");
const AllCoursesPage = importLazyPage("AllCourses", "AllCoursesPage");
const AllArticlesPage = importLazyPage("AllArticles", "AllArticlesPage");

//other pages
const ContactUs = importLazyPage("ContactUs");
const Login = importLazyPage("Login");
const Register = importLazyPage("Register");
const SearchPage = importLazyPage("SearchPage");


export const routes = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: "login",
        title: "Login page",
        component: Login,
        path: "/login",
      },
      {
        name: "register",
        title: "Register page",
        component: Register,
        path: "/register",
      },
      {
        name: "contactUs",
        title: "ContactUs page",
        component: ContactUs,
        path: "/contact-us",
      },
    ],
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: "home",
        title: "Home page",
        component: HomePage,
        path: "/",
      },
      {
        name: "category",
        title: "Category page",
        component: CategoryPage,
        path: "/category-info/:categoryName",
      },
      {
        name: "article",
        title: "Article page",
        component: ArticlePage,
        path: "/article-info/:articleName",
      },
      {
        name: "course",
        title: "Course page",
        component: CoursePage,
        path: "/course-info/:courseName",
      },
      {
        name: "all courses",
        title: "All Courses page",
        component: AllCoursesPage,
        path: "/all-courses/",
      },
      {
        name: "all articles",
        title: "All Articles page",
        component: AllArticlesPage,
        path: "/all-articles/",
      },
      {
        name: "search page",
        title: "search page",
        component: SearchPage,
        path: "/search/:searchedValue",
      },
    ],
  },
  {
    layout: AdminPanelLayout,
    routes: [
      {
        name: "adminPanel",
        title: "AdminPanel",
        // component: MainPage,
        path: "/admin-panel",
        // isPublic: false,
        routes: [
          {
            name: "admin-panel-users",
            title: "admin-panel-users",
            // component: Users,
            path: "users",
          },
        ],
      },
    ],
  },
];
export const Routes = renderRoutes(routes);
