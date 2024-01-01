import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
//type
import { Children } from "@/types/shared";
//contexts
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./AuthContext";
const isDarkTheme = "dark" === localStorage.getItem("theme");
function MainContext({ children }: Children) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <AuthContextProvider>
        {children}
      <ToastContainer
        theme={isDarkTheme ? "dark" : "light"}
        rtl
        toastClassName="dark:bg-dark-theme-secondary w-3/4 sm:w-full"
      />
    </AuthContextProvider>
  );
}

export { MainContext };
