import React from "react";
import Required from "./Required";
import SubHeader from "./SubHeader";
import Input from "./Input";
import "../../styles/actions/addClient.css";

const InputWrapper = ({
  inputVal,
  inputType,
  inputHeader,
  inputName,
  handleInputChange,
  htmlFor
}) => {
  return (
    <div className="input-wrapper">
      <Required />
      <SubHeader text={inputHeader} htmlFor={htmlFor} />
      <Input
        name={inputName}
        value={inputVal}
        onChange={handleInputChange}
        inputType={inputType}
      />
    </div>
  );
};

export default InputWrapper;
