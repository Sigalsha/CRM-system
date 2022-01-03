import "../../styles/actions/addClient.css";

const Input = ({ inputType, name, value, onChange }) => {
  return (
    <input
      className="input-add-client"
      style={{
        textDecoration: "none",
        borderColor: "none",
        backgroundColor: "rgba(247, 206, 62, 0.5)"
      }}
      type={inputType ? inputType : "text"}
      name={name}
      value={value ? value : ""}
      onChange={onChange}
    />
  );
};

export default Input;
