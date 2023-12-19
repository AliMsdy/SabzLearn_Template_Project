import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteType = {
  isPublic?: boolean;
  isAuthorized: boolean;
};

const ProtectedRoute = ({ isPublic=true, isAuthorized }: ProtectedRouteType) => {
  return isPublic || isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export { ProtectedRoute };
