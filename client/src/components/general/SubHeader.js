import React from "react";
import "../../styles/general/subHeader.css";

const SubHeader = ({ text, htmlFor, isAuth }) => {
  return (
    <div className="input-header" id={`${isAuth && "auth-label"}`}>
      <label htmlFor={htmlFor}>{text}</label>
    </div>
  );
};

export default SubHeader;
