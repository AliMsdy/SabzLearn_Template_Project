import { ArticlePage, CategoryPage, CoursePage, HomePage } from "./pages";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/course-info/:courseName", element: <CoursePage /> },
  { path: "/category-info/:categoryName", element: <CategoryPage /> },
  { path: "/article-info/:articleName", element: <ArticlePage /> },
];

export default routes;
