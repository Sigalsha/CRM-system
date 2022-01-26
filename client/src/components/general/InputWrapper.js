import React from "react";
import Required from "./Required";
import SubHeader from "./SubHeader";
import "../../styles/general/inputWrapper.css";
import "../../styles/clients/editClientPopUp.css";

function InputWrapper({
  inputHeader,
  htmlFor,
  isDatalist,
  Datalist,
  Input,
  isPopupInput
}) {
  return (
    <div className={`${isPopupInput ? "popup-row" : "input-wrapper"}`}>
      {!isPopupInput && <Required />}
      <SubHeader text={inputHeader} htmlFor={htmlFor} />
      {isDatalist ? Datalist : Input}
    </div>
  );
}

export default InputWrapper;
