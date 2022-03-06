import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AUTH_ALERTS,
  AUTH_HEADERS,
  AUTH_BUTTONS,
  NAV_LINKS,
  AUTH_SUB_HEADERS,
  LANDING
} from "../../utils/constants";
import utils from "../../utils/utils";
import { resetInputs, validateInput } from "../../utils/helpers";
import { registerUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { useAuth } from "../../hooks/authHooks";
import { useError } from "../../hooks/errorHooks";
import LinkContainer from "../general/LinkContainer";
import InputWrapper from "../general/InputWrapper";
import Input from "../general/Input";
import Alert from "../general/Alert";
import "../../styles/general/landing.css";
import "../../styles/general/login.css";
import "../../styles/general/register.css";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    name: ""
  });

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const error = useError();

  useEffect(() => {
    // Check for register error
    if (error) {
      setAlert(true);
      setAlertText(error);
    } else {
      setAlert(false);
      setAlertText("");
    }

    // If authenticated, close modal
    if (isAuthenticated) {
      setAlert(true);
      setAlertText("you are logged in :)");

      dispatch(clearErrors());
      navigate(`/${NAV_LINKS.guestUser[0]}`);
    }
  }, [error, isAuthenticated]);

  const toggleAlert = () => setAlert(!alert);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const checkNewUserDetails = (inputValues) => {
    for (let val in inputValues) {
      if (!utils.isMinLength(inputValues[val])) {
        setAlert(true);
        setAlertText(`${val} ${AUTH_ALERTS["register"]["minChar"]}`);
        return false;
      }

      if (val === "email" && !utils.isEmailValid(inputValues[val])) {
        setAlert(true);
        setAlertText(AUTH_ALERTS["register"]["emailValidate"]);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateInput(
        inputValues.name,
        "name",
        setAlert,
        setAlertText,
        AUTH_ALERTS["register"]
      ) ||
      !validateInput(
        inputValues.email,
        "email",
        setAlert,
        setAlertText,
        AUTH_ALERTS["register"]
      ) ||
      !validateInput(
        inputValues.password,
        "password",
        setAlert,
        setAlertText,
        AUTH_ALERTS["register"]
      )
    ) {
      return;
    }

    const { name, email, password } = inputValues;

    if (!checkNewUserDetails({ name, email, password })) return;

    dispatch(registerUser({ name, email, password }));

    setInputValues({ ...inputValues, name: "", email: "", password: "" });
    resetInputs();
  };

  return (
    <div className="landing-container">
      <div className="auth-wrapper">
        <p className="auth-header register-header">{LANDING["header"]}</p>
        <p className="auth-sub-header register-sub-header">
          {LANDING["subHeader"]}
        </p>
        <div className="register-wrapper">
          {alert && (
            <Alert text={alertText} toggleAlert={toggleAlert} isAuth={true} />
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <InputWrapper
                inputHeader="name:"
                htmlFor="name"
                isAuth={true}
                Input={
                  <Input
                    name="name"
                    value={inputValues.name}
                    onChange={handleInputChange}
                    isAuth={true}
                  />
                }
              />
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
                    name="password"
                    inputType="password"
                    value={inputValues.password}
                    onChange={handleInputChange}
                    isAuth={true}
                  />
                }
              />
            </div>
            <button type="submit" className="auth-btn">
              {AUTH_BUTTONS["register"]}
            </button>
          </form>
          <div className="login-link-wrapper">
            <p>{AUTH_SUB_HEADERS["register"]}</p>
            <LinkContainer
              path={`/${NAV_LINKS.guestUser[0]}`}
              text={AUTH_HEADERS["login"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
