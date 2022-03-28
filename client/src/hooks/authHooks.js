import { useSelector } from "react-redux";

export const useAuth = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated;
};

export const useLogged = () => {
  return useSelector((state) => state.auth.isLogged);
};

export const useUsername = () => {
  const user = useSelector((state) => state.auth.user);
  if (user && user.name) return user.name;
};
