import { useSelector } from "react-redux";

export const useError = () => {
  const errorId = useSelector((state) => state.error.id);

  switch (errorId) {
    case "LOGIN_FAIL":
      return "Sorry, login failed. Please fill in the right email and password";
    case "REGISTER_FAIL":
      return "Sorry, registration failed. Please enter all required information";
    case "UPDATE_CLIENT_FAIL":
      return "Sorry, client was not updated. Please try again";
    case "ADD_CLIENT_FAIL":
      return "Sorry, client was not added. Please try again";
    /*     case "AUTH_ERROR":
      return "Sorry, an error occurred. Please login"; */
    default:
      return;
  }
};
