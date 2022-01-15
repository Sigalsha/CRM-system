import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../actions/authActions";
import InputWrapper from "../general/InputWrapper";
import "../../styles/general/landing.css";

const Register = ({ registerUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data);
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </div>
    </div>
  );
};

export default Register;
