import "../../styles/general/input.css";
import "../../styles/clients/editClientPopUp.css";

function Input({ inputType, name, value, onChange, isPopupInput }) {
  return (
    <input
      className={`${isPopupInput ? "popup-input" : "general-input"}`}
      type={inputType ? inputType : "text"}
      name={name}
      value={value ? value : ""}
      onChange={onChange}
    />
  );
}

export default Input;
