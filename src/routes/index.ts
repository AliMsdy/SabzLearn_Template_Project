// import { lazy } from "react";
import { renderRoutes } from "./generate-routes";

// Layouts
import {AnonymousLayout} from "@/Layout/AnonymousLayout";
import {MainLayout} from "@/Layout/MainLayout";

// Pages
import { ArticlePage, CategoryPage,CoursePage,HomePage ,AllCoursesPage,Login,Register,AllArticlesPage,ContactUs,SearchPage } from "@/pages";
// const HomePage = lazy(() => import("../pages/HomePage"));
// console.log(HomePage)


export const routes = [
{
    layout: AnonymousLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: '/login',
        
      },
      {
        name: 'register',
        title: 'Register page',
        component: Register,
        path: '/register',
        
      },
      {
        name: 'contactUs',
        title: 'ContactUs page',
        component: ContactUs,
        path: '/contact-us',
        
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
        path: '/all-courses/',
      },
      {
        name: 'all articles',
        title: 'All Articles page',
        component: AllArticlesPage,
        path: '/all-articles/',
        isPublic:false
      },
      {
        name: "search page",
        title: 'search page',
        component: SearchPage,
        path: '/search/:searchedValue',
      },
      
    ]
  }
];
export const Routes = renderRoutes(routes);
