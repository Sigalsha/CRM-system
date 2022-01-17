import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthHooks";

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default ProtectedRoutes;
