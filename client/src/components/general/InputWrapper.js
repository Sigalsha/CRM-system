import React from "react";
import Required from "./Required";
import SubHeader from "./SubHeader";
import Input from "./Input";
import "../../styles/actions/addClient.css";

const InputWrapper = ({
  inputVal,
  inputType,
  inputTypeString,
  handleInputChange
}) => {
  return (
    <div className="input-wrapper">
      <Required />
      <SubHeader text={inputTypeString} />
      <Input
        name={inputTypeString}
        value={inputVal}
        onChange={handleInputChange}
        inputType={inputType}
      />
    </div>
  );
};

export default InputWrapper;
