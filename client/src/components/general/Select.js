import "../../styles/general/select.css";

const Select = ({
  placeholder,
  onChange,
  name,
  optionList,
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
      optionList={optionList}
    >
      <option defaultValue={defaultValue}>{defaultValue}</option>
      {optionList.map((option, i) => {
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
