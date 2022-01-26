import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AUTH_ALERTS,
  AUTH_HEADERS,
  AUTH_BUTTONS,
  NAV_LINKS,
  AUTH_SUB_HEADERS
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
        name,
        "name",
        setAlert,
        setAlertText,
        AUTH_ALERTS["register"]
      ) ||
      !validateInput(
        email,
        "email",
        setAlert,
        setAlertText,
        AUTH_ALERTS["register"]
      ) ||
      !validateInput(
        password,
        "password",
        setAlert,
        setAlertText,
        AUTH_ALERTS["register"]
      )
    ) {
      return;
    }

    if (!checkNewUserDetails({ name, email, password })) return;

    dispatch(registerUser({ name, email, password }));

    setName("");
    setEmail("");
    setPassword("");
    resetInputs();
  };

  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>{AUTH_HEADERS["register"]}</span>
      </div>
      <div className="landing-links-wrapper">
        {alert && <Alert text={alertText} toggleAlert={toggleAlert} />}
        <form onSubmit={handleSubmit}>
          <div>
            <InputWrapper
              inputHeader="name:"
              htmlFor="name"
              Input={
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              }
            />
            <InputWrapper
              inputHeader="email:"
              htmlFor="email"
              Input={
                <Input
                  name="email"
                  inputType="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              }
            />
            <InputWrapper
              inputHeader="password:"
              htmlFor="password"
              Input={
                <Input
                  name="password"
                  inputType="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              }
            />
          </div>
          <button type="submit" className="link-square">
            {AUTH_BUTTONS["register"]}
          </button>
        </form>
      </div>
      <div className="landing-links-wrapper">
        <p>{AUTH_SUB_HEADERS["register"]}</p>
        <LinkContainer
          path={`/${NAV_LINKS.guestUser[0]}`}
          text={AUTH_HEADERS["login"]}
        />
      </div>
    </div>
  );
};

export default Register;
