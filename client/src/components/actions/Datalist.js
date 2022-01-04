import "../../styles/actions/datalist.css";

const Datalist = ({
  list,
  placeholder,
  name,
  onChange,
  id,
  mapList,
  isAddClient,
  onFocus
}) => {
  return (
    <div className={isAddClient ? "datalist-add-client" : "datalist-wrapper"}>
      <input
        className={`input-text ${isAddClient ? "input-text-add-client" : ""}`}
        type="text"
        list={list}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
      />
      <datalist id={id}>
        {mapList.map((item, i) => (
          <option
            value={item && item.name ? item.name : item}
            key={item && item._id ? item._id : i}
          />
        ))}
      </datalist>
    </div>
  );
};

export default Datalist;
