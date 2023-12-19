import { renderRoutes } from "./generate-routes";

// Layouts
import {AnonymousLayout} from "@/Layout/AnonymousLayout";
import {MainLayout} from "@/Layout/MainLayout";

// Pages
import { ArticlePage, CategoryPage,CoursePage ,HomePage,AllCoursesPage,Login } from "@/pages";

export const routes = [
{
    layout: AnonymousLayout,
    routes: [
      // {
      //   name: 'login',
      //   title: 'Login page',
      //   component: Login,
      //   path: '/',
        
      // },
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: '/login',
        
      },
      {
        name: 'register',
        title: 'Register page',
        component: Login,
        path: '/register',
        
      },
    ]
  },
{
    layout: MainLayout,
    routes: [
      {
        name: 'home',
        title: 'Home page',
        component: HomePage,
        path: '/',
      },
      {
        name: 'category',
        title: 'Category page',
        component: CategoryPage,
        path: '/category-info/:categoryName'
      },
      {
        name: 'article',
        title: 'Article page',
        component: ArticlePage,
        path: '/article-info/:articleName'
      },
      {
        name: 'course',
        title: 'Course page',
        component: CoursePage,
        path: '/course-info/:courseName'
      },
      {
        name: 'all courses',
        title: 'All Courses page',
        component: AllCoursesPage,
        path: '/all-courses',
        isPublic:false
      },
      
    ]
  }
];
export const Routes = renderRoutes(routes);

// import { ArticlePage, CategoryPage,CoursePage ,HomePage,AllCoursesPage,Login,Register } from "./pages";
// import { CoursePage } from "./pages/Course/test";

// const routes = [
//   { path: "/home", element: <HomePage /> },
//   { path: "/", element: <Login /> },
//   { path: "/all-courses", element: <AllCoursesPage /> },
//   { path: "/course-info/:courseName", element: <CoursePage /> },
//   { path: "/category-info/:categoryName", element: <CategoryPage /> },
//   { path: "/article-info/:articleName", element: <ArticlePage /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
// ];

// export default routes;

// {
//     name: 'users',
//     title: 'Users',
//     hasSiderLink: true,
//     routes: [
//       {
//         name: 'list-users',
//         title: 'List of users',
//         hasSiderLink: true,
//         component: ListUsers,
//         path: '/users'
//       },
//       {
//         name: 'create-user',
//         title: 'Add user',
//         hasSiderLink: true,
//         component: CreateUser,
//         path: '/users/new'
//       }
//     ]
//   }