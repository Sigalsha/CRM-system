import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import {
  AUTH_ALERTS,
  AUTH_HEADERS,
  AUTH_BUTTONS,
  NAV_LINKS,
  NAV_LINKS_TITLES
} from "../../utils/constants";
import utils from "../../utils/utils";
import { useAuth } from "../../hooks/authHooks";
import { useError } from "../../hooks/errorHooks";
import LinkContainer from "../general/LinkContainer";
import InputWrapper from "../general/InputWrapper";
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

  const validateInput = (inputValue, inputType) => {
    if (!inputValue) {
      setAlert(true);
      setAlertText(AUTH_ALERTS["register"][inputType]);
      return false;
    }
    return true;
  };

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

  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateInput(name, "name") ||
      !validateInput(email, "email") ||
      !validateInput(password, "password")
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
              inputVal={name}
              handleInputChange={(e) => setName(e.target.value)}
              inputHeader="name:"
              htmlFor="name"
              inputName="name"
            />
            <InputWrapper
              inputVal={email}
              handleInputChange={(e) => setEmail(e.target.value)}
              inputHeader="email:"
              htmlFor="email"
              inputName="email"
              inputType="email"
            />
            <InputWrapper
              inputVal={password}
              inputType="password"
              handleInputChange={(e) => setPassword(e.target.value)}
              inputHeader="password:"
              htmlFor="password"
              inputName="password"
            />
          </div>
          <button type="submit" className="link-square">
            {AUTH_BUTTONS["register"]}
          </button>
        </form>
      </div>
      <div className="landing-links-wrapper">
        <p>Not your first time? </p>
        <LinkContainer
          path={`/${NAV_LINKS.guestUser[0]}`}
          text={NAV_LINKS_TITLES["login"]}
        />
      </div>
    </div>
  );
};

export default Register;
