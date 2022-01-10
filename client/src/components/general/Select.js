import "../../styles/general/select.css";

const Select = ({
  placeholder,
  onChange,
  name,
  optionlist,
  value,
  defaultValue
}) => {
  return (
    <select
      className="text-row"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      optionlist={optionlist}
    >
      <option defaultValue={defaultValue}>{defaultValue}</option>
      {optionlist.map((option, i) => {
        return (
          <option key={i} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
