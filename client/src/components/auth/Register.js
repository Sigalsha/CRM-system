import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { AUTH_ALERTS, AUTH_HEADERS, AUTH_BUTTONS } from "../../utils/constants";
import utils from "../../utils/utils";
import InputWrapper from "../general/InputWrapper";
import Alert from "../general/Alert";
import "../../styles/general/landing.css";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const dispatch = useDispatch();

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleInputChange = (e) => {
    const {
      target: { name, value }
    } = e;

    setValues((oldValues) => ({
      ...oldValues,
      [name]: value
    }));
  };

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
    debugger;
    for (let val in inputValues) {
      if (!utils.isMinLength(inputValues[val])) {
        setAlert(true);
        setAlertText(`${val} ${AUTH_ALERTS["register"]["minChar"]}`);
        return false;
      }

      if (val === "email" && !validateEmail(inputValues[val])) {
        setAlert(true);
        setAlertText(AUTH_ALERTS["register"]["emailValidate"]);
        return false;
      }
    }
    return true;
  };
  const validateEmail = (email) => emailReg.test(email);

  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const resetValues = (values) => {
    Object.keys(values).map((key) => (values[key] = ""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateInput(values.name, "name") ||
      !validateInput(values.email, "email") ||
      !validateInput(values.password, "password")
    ) {
      return;
    }

    if (!checkNewUserDetails(values)) return;

    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password
    };

    dispatch(registerUser(newUser));

    setValues(resetValues(values));
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
              inputVal={values.name}
              handleInputChange={handleInputChange}
              inputHeader="name:"
              htmlFor="name"
              inputName="name"
            />
            <InputWrapper
              inputVal={values.email}
              handleInputChange={handleInputChange}
              inputHeader="email:"
              htmlFor="email"
              inputName="email"
            />
            <InputWrapper
              inputVal={values.password}
              inputType="password"
              handleInputChange={handleInputChange}
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
    </div>
  );
};

export default Register;
