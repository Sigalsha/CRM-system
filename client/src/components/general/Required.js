import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import "../../styles/general/required.css";

const Required = ({ isClient }) => {
  return (
    <FontAwesomeIcon
      icon={faAsterisk}
      className={`main ${isClient ? "client-input" : ""}`}
    />
  );
};

export default Required;
