import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { AUTH_HEADERS, AUTH_BUTTONS, AUTH_ALERTS } from "../../utils/constants";
import { useAuth } from "./useAuth";
import InputWrapper from "../general/InputWrapper";
import Alert from "../general/Alert";
import "../../styles/general/landing.css";

const Login = () => {
  const isAuthenticated = useAuth();
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.error.msg);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const dispatch = useDispatch();

  /*   console.log(error);
  console.log(isAuthenticated); */

  const [loginMsg, setLoginMsg] = useState("");

  useEffect(() => {
    console.log(isAuthenticated, "from useEffect login");
    console.log(user, "from useEffect login");

    if (isAuthenticated) {
      // alert("you are logged in :)");
      setLoginMsg('you are logged in :)"');
    }

    if (error) {
      // setError(error.msg);
      console.log(error);
    }
    if (!isAuthenticated) {
      console.log("user load fail");
    }
  }, [isAuthenticated, user, error]);

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
    debugger;
    if (isAuthenticated) {
      console.log("you are logged in :)");
      return;
    }
    e.preventDefault();

    if (
      !validateInput(email, "email") ||
      !validateInput(password, "password")
    ) {
      return;
    }

    dispatch(login({ email, password }));

    setEmail("");
    setPassword("");
    resetInputs();
  };

  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>{AUTH_HEADERS["login"]}</span>
      </div>
      <div className="landing-links-wrapper">
        <p>{loginMsg}</p>
        {alert && <Alert text={alertText} toggleAlert={toggleAlert} />}
        <form onSubmit={handleSubmit}>
          <div>
            <InputWrapper
              inputVal={email}
              handleInputChange={(e) => setEmail(e.target.value)}
              inputHeader="email:"
              inputName="email"
              inputType="email"
            />
            <InputWrapper
              inputVal={password}
              inputType="password"
              handleInputChange={(e) => setPassword(e.target.value)}
              inputHeader="password:"
              inputName="password"
            />
          </div>
          <button type="submit" className="link-square">
            {AUTH_BUTTONS["login"]}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
