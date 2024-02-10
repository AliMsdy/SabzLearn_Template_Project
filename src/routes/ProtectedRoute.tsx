// import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteType = {
  isPublic?: boolean;
  isAuthorized: boolean;
  path: string;
};

const ProtectedRoute = ({
  isPublic = true,
  isAuthorized,
  // path,
}: ProtectedRouteType) => {
  // const { userInfos } = useAuthContext();
  // const isAdminPanelPage = path.includes("/admin-panel");
  // const userRole = userInfos?.role;

  // if (isPublic) {
  //   return <Outlet />;
  // } else if (isAuthorized) { // isAuthorized means if user logged In or not...
  //   console.log("hello");
  //   if (!isAdminPanelPage) {
  //     return <Outlet />;
  //   } else if (userRole === "ADMIN") {
  //     return <Outlet />;
  //   } else {
  //     return <Navigate to="/" />;
  //   }
  // } else {
  //   return <Navigate to="/login" />;
  // }
  return isPublic || isAuthorized ? <Outlet /> : <Navigate to="login" />
};

export { ProtectedRoute };

