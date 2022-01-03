import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/general/alert.css";

const Alert = ({ text, toggleAlert }) => {
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <button className="close-btn" onClick={toggleAlert}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <p className="alert-text">
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>{text}</span>
        </p>
      </div>
    </div>
  );
};

export default Alert;
