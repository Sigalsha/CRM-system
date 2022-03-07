import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LANDING,
  AUTH_BUTTONS,
  AUTH_ALERTS,
  NAV_LINKS,
  NAV_LINKS_TITLES,
  AUTH_SUB_HEADERS
} from "../../utils/constants";
import { resetInputs, validateInput } from "../../utils/helpers";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { useAuth, useLogged } from "../../hooks/authHooks";
import { useError } from "../../hooks/errorHooks";
import InputWrapper from "../general/InputWrapper";
import Input from "../general/Input";
import Alert from "../general/Alert";
import LinkContainer from "../general/LinkContainer";
import "../../styles/general/landing.css";
import "../../styles/general/login.css";

const Login = () => {
  const isAuthenticated = useAuth();
  const isLogged = useLogged();
  const error = useError();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: ""
  });
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log(isAuthenticated, "from useEffect login");

    if (isAuthenticated && isLogged) {
      dispatch(clearErrors());
      navigate(from, { replace: true });
    }

    dispatchAlert();
  }, [dispatch, navigate, from, isAuthenticated, isLogged, error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const toggleAlert = () => setAlert(!alert);

  const dispatchAlert = () => {
    if (error) {
      setAlert(true);
      setAlertText(error);
      dispatch(clearErrors());
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateInput(
        inputValues.email,
        "email",
        setAlert,
        setAlertText,
        AUTH_ALERTS["login"]
      ) ||
      !validateInput(
        inputValues.password,
        "password",
        setAlert,
        setAlertText,
        AUTH_ALERTS["login"]
      ) ||
      !dispatchAlert()
    ) {
      return;
    }

    const { email, password } = inputValues;
    dispatch(login({ email, password }));
    setInputValues({ ...inputValues, email: "", password: "" });
    resetInputs();
  };

  return (
    <div className="landing-container">
      <div className="auth-wrapper">
        <p className="auth-header">{LANDING["header"]}</p>
        <p className="auth-sub-header">{LANDING["subHeader"]}</p>
        {alert && (
          <Alert text={alertText} toggleAlert={toggleAlert} isAuth={true} />
        )}
        <div className="login-wrapper">
          <form onSubmit={handleSubmit} className="login-form">
            <InputWrapper
              inputHeader="email:"
              htmlFor="email"
              isAuth={true}
              Input={
                <Input
                  name="email"
                  inputType="email"
                  value={inputValues.email}
                  onChange={handleInputChange}
                  isAuth={true}
                />
              }
            />
            <InputWrapper
              inputHeader="password:"
              htmlFor="password"
              isAuth={true}
              Input={
                <Input
                  inputType="password"
                  name="password"
                  value={inputValues.password}
                  onChange={handleInputChange}
                  isAuth={true}
                />
              }
            />
            <button type="submit" className="auth-btn">
              {AUTH_BUTTONS["login"]}
            </button>
          </form>
          <div className="register-link-wrapper">
            <p>{AUTH_SUB_HEADERS["login"]}</p>
            <LinkContainer
              path={`/${NAV_LINKS.guestUser[1]}`}
              text={NAV_LINKS_TITLES["register"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
