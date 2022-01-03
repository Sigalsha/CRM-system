import React, { useState } from "react";
import InputWrapper from "../general/InputWrapper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>Login</span>
      </div>
      <div className="landing-links-wrapper">
        <div>
          <InputWrapper
            inputVal={email}
            handleInputChange={(e) => setEmail(e.target.value)}
            inputTypeString="email:"
          />
          <InputWrapper
            inputVal={password}
            inputType="password"
            handleInputChange={(e) => setPassword(e.target.value)}
            inputTypeString="password:"
          />
        </div>
        <button type="submit" className="link-square">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
