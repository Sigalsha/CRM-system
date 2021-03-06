import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/general/alert.css";

const Alert = ({ isSuccess, text, toggleAlert, isAuth }) => {
  return (
    <div className="alert-container">
      <div
        className={`alert-wrapper ${isSuccess && "alert-success"} ${
          isAuth && "auth-wrap"
        }`}
      >
        <button
          className={`close-btn ${isSuccess && "alert-text-success"}`}
          onClick={toggleAlert}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <p
          className={`alert-text ${isSuccess && "alert-text-success"} ${
            isAuth && "auth-text"
          }`}
        >
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>{text}</span>
        </p>
      </div>
    </div>
  );
};

export default Alert;
