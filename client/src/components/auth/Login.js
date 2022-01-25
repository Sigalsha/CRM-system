import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AUTH_HEADERS,
  AUTH_BUTTONS,
  AUTH_ALERTS,
  NAV_LINKS,
  NAV_LINKS_TITLES,
  AUTH_SUB_HEADERS
} from "../../utils/constants";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { useAuth, useLogged } from "../../hooks/authHooks";
import { useError } from "../../hooks/errorHooks";
import InputWrapper from "../general/InputWrapper";
import Input from "../general/Input";
import Alert from "../general/Alert";
import LinkContainer from "../general/LinkContainer";
import "../../styles/general/landing.css";

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

    if (error) {
      setAlert(true);
      setAlertText(error);
    }
  }, [dispatch, navigate, from, isAuthenticated, isLogged, error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const toggleAlert = () => setAlert(!alert);

  const validateInput = (inputValue, inputType) => {
    if (!inputValue) {
      setAlert(true);
      setAlertText(AUTH_ALERTS["login"][inputType]);
      return false;
    }
    return true;
  };

  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateInput(inputValues.email, "email") ||
      !validateInput(inputValues.password, "password")
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
      <div className="landing-header">
        <span>{AUTH_HEADERS["login"]}</span>
      </div>
      <div className="landing-links-wrapper">
        {alert && <Alert text={alertText} toggleAlert={toggleAlert} />}
        <form onSubmit={handleSubmit}>
          <div>
            <InputWrapper
              inputHeader="email:"
              htmlFor="email"
              Input={
                <Input
                  name="email"
                  inputType="email"
                  value={inputValues.email}
                  onChange={handleInputChange}
                />
              }
            />
            <InputWrapper
              inputHeader="password:"
              htmlFor="password"
              Input={
                <Input
                  inputType="password"
                  name="password"
                  value={inputValues.password}
                  onChange={handleInputChange}
                />
              }
            />
          </div>
          <button type="submit" className="link-square">
            {AUTH_BUTTONS["login"]}
          </button>
        </form>
      </div>
      <div className="landing-links-wrapper">
        <p>{AUTH_SUB_HEADERS["login"]}</p>
        <LinkContainer
          path={`/${NAV_LINKS.guestUser[1]}`}
          text={NAV_LINKS_TITLES["register"]}
        />
      </div>
    </div>
  );
};

export default Login;
