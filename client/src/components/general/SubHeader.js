import React from "react";
import "../../styles/general/subHeader.css";

const SubHeader = ({ text, htmlFor }) => {
  return (
    <div className="update-header">
      <label htmlFor={htmlFor}>{text}</label>
    </div>
  );
};

export default SubHeader;
