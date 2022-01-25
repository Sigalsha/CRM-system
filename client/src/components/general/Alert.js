import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/general/alert.css";

const Alert = ({ isSuccess, text, toggleAlert }) => {
  return (
    <div className="alert-container">
      <div className={`alert-wrapper ${isSuccess && "alert-success"}`}>
        <button
          className={`close-btn ${isSuccess && "alert-text-success"}`}
          onClick={toggleAlert}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <p className={`alert-text ${isSuccess && "alert-text-success"}`}>
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>{text}</span>
        </p>
      </div>
    </div>
  );
};

export default Alert;
