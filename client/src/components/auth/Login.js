import React, { useState } from "react";
import { AUTH_HEADERS, AUTH_BUTTONS } from "../../utils/constants";
import InputWrapper from "../general/InputWrapper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>{AUTH_HEADERS["login"]}</span>
      </div>
      <div className="landing-links-wrapper">
        <div>
          <InputWrapper
            inputVal={email}
            handleInputChange={(e) => setEmail(e.target.value)}
            inputHeader="email:"
            inputName="email"
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
      </div>
    </div>
  );
};

export default Login;
