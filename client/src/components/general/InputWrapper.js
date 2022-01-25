import React from "react";
import Required from "./Required";
import SubHeader from "./SubHeader";
import "../../styles/actions/addClient.css";

function InputWrapper({ inputHeader, htmlFor, isDatalist, Datalist, Input }) {
  return (
    <div className="input-wrapper">
      <Required />
      <SubHeader text={inputHeader} htmlFor={htmlFor} />
      {isDatalist ? Datalist : Input}
    </div>
  );
}

export default InputWrapper;
