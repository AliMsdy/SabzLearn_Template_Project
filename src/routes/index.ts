import importLazyPage from "@/utils/importLazyPage";
import { renderRoutes } from "./generate-routes";

// Layouts
import { AdminPanelLayout } from "@/Layout/AdminPanelLayout";
import { AnonymousLayout } from "@/Layout/AnonymousLayout";
import { MainLayout } from "@/Layout/MainLayout";

//code splitting the pages

//adminPanelPages
const AdminMainPage = importLazyPage("MainPage", "MainPage", true);
const AdminUsersPage = importLazyPage("Users", "Users", true);
const AdminCoursesPage = importLazyPage("Courses", "Courses", true);
const AdminCategoryPage = importLazyPage("CategoryPage", "CategoryPage", true);
const AdminContactPage = importLazyPage("ContactPage", "ContactPage", true);
const AdminArticlesPage = importLazyPage("ArticlesPage", "ArticlesPage", true);
const AdminSessionsPage = importLazyPage("Sessions", "Sessions", true);
const AdminMenusPage = importLazyPage("Menus", "Menus", true);
const AdminCommentsPage = importLazyPage("Comments", "Comments", true);

//mainPages
const HomePage = importLazyPage("HomePage");
const CoursePage = importLazyPage("Course", "CoursePage");
const ArticlePage = importLazyPage("Article", "ArticlePage");
const CategoryPage = importLazyPage("Category", "CategoryPage");
const AllCoursesPage = importLazyPage("AllCourses", "AllCoursesPage");
const AllArticlesPage = importLazyPage("AllArticles", "AllArticlesPage");
const SessionsPage = importLazyPage("Sessions", "Sessions");

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
      {
        name: "sessions page",
        title: "sessions page",
        component: SessionsPage,
        isPublic:false,
        path: "/:courseName/:sessionID",
      },
    ],
  },
  {
    layout: AdminPanelLayout,
    routes: [
      {
        name: "adminPanel",
        title: "AdminPanel",
        component: AdminMainPage,
        path: "/admin-panel",
        routes: [
          {
            name: "admin-panel-users",
            title: "admin-panel-users",
            component: AdminUsersPage,
            path: "users",
          },
          {
            name: "admin-panel-courses",
            title: "admin-panel-courses",
            component: AdminCoursesPage,
            path: "courses",
          },
          {
            name: "admin-panel-course-categories",
            title: "admin-panel-course-categories",
            component: AdminCategoryPage,
            path: "categories",
          },
          {
            name: "admin-panel-contact-page",
            title: "admin-panel-contact-page",
            component: AdminContactPage,
            path: "contacts",
          },
          {
            name: "admin-panel-articles-page",
            title: "admin-panel-articles-page",
            component: AdminArticlesPage,
            path: "articles",
          },
          {
            name: "admin-panel-sessions-page",
            title: "admin-panel-sessions-page",
            component: AdminSessionsPage,
            path: "sessions",
          },
          {
            name: "admin-panel-menus-page",
            title: "admin-panel-menus-page",
            component: AdminMenusPage,
            path: "menus",
          },
          {
            name: "admin-panel-comments-page",
            title: "admin-panel-comments-page",
            component: AdminCommentsPage,
            path: "comments",
          },
        ],
      },
    ],
  },
];
export const Routes = renderRoutes(routes);
