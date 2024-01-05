import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const isDarkTheme = "dark" === localStorage.getItem("theme");
//type
import { Children } from "@/types/shared";
//contexts
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./AuthContext";
import ThemeContextProvider from "./ThemeContext";
function MainContext({ children }: Children) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        {children}
        <ToastContainer
          theme={isDarkTheme ? "dark" : "light"}
          rtl
          toastClassName="dark:bg-dark-theme-secondary w-3/4 sm:w-full"
        />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export { MainContext };
