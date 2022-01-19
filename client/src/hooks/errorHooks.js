import { useSelector } from "react-redux";

export const useError = () => {
  const errorId = useSelector((state) => state.error.id);

  switch (errorId) {
    case "LOGIN_FAIL":
      return "Sorry, login failed. Please fill in the right email and password";
    case "REGISTER_FAIL":
      return "Sorry, registration failed. Please enter all required information";
    /*     case "AUTH_ERROR":
      return "Sorry, an error occurred. Please login"; */
    default:
      return;
  }
};
