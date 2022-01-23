import { useState, useEffect } from "react";
import "../../styles/general/select.css";

const Select = ({
  placeholder,
  onChange,
  name,
  optionlistProp,
  value,
  labelName
}) => {
  const [optionlist, setOptionlist] = useState([]);

  useEffect(() => {
    if (
      (optionlistProp && optionlistProp.length > 2) ||
      optionlistProp.includes("Sold")
    ) {
      setOptionlist(optionlistProp);
    }
  }, [optionlistProp]);

  return (
    <div className="filter-group">
      <label>{labelName}: </label>
      <select
        className="text-row"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        optionlist={optionlist}
      >
        <option defaultValue="All">All</option>
        {optionlist.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
