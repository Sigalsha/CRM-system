import React, { useState } from "react";
import InputWrapper from "../general/InputWrapper";
import "../../styles/general/landing.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*     handleInputChange = (event) => {
        const {
          target: { value, name }
        } = event;

        setName([name]: )

        this.setState({
          [name]: value
        });
      }; */

  /*   signup = () => {
        clearErrors();
      }; */

  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>Register</span>
      </div>
      <div className="landing-links-wrapper">
        <div>
          <InputWrapper
            inputVal={name}
            handleInputChange={(e) => setName(e.target.value)}
            inputTypeString="name:"
          />
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
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Register;
