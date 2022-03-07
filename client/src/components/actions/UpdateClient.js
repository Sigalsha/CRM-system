import React, { useState } from "react";
import {
  ACTIONS_ALERTS,
  ACTION_HEADERS,
  ACTIONS_BUTTONS
} from "../../utils/constants";
import { resetInputs } from "../../utils/helpers";
import Alert from "../general/Alert";
import SubHeader from "../general/SubHeader";
import Datalist from "./Datalist";
import "../../styles/actions/updateClient.css";

const UpdateClient = ({ currentClient, changeClient, emailTypes, owners }) => {
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [inputValues, setInputValues] = useState({
    owner: "",
    emailType: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const toggleAlert = () => setAlert(!alert);

  const actionClicked = (
    actionType,
    validationErr,
    actionValue,
    resetState
  ) => {
    if (!currentClient || !currentClient.hasOwnProperty("name")) {
      setAlertText(ACTIONS_ALERTS["update"]["currentClient"]);
      setAlert(true);

      resetState && setInputValues({ ...inputValues, actionType: "" });
      resetInputs();
      return;
    }
    if (validationErr) {
      setAlertText(ACTIONS_ALERTS["update"][actionType]);
      setAlert(true);
      return;
    }
    changeClient({ [actionType]: actionValue }, actionType);
    resetInputs();
  };

  return (
    <div className="update-client-container">
      {alert && <Alert text={alertText} toggleAlert={toggleAlert} />}
      <SubHeader
        text={ACTION_HEADERS["update"]["transferOwnership"]}
        htmlFor="owner"
      />
      <Datalist
        list={owners}
        placeholder="Owner"
        id={owners}
        mapList={owners}
        name="owner"
        onChange={handleInputChange}
      />
      <UpdateButton
        onClick={() =>
          actionClicked("owner", !inputValues.owner, inputValues.owner, true)
        }
        text={ACTIONS_BUTTONS["update"]["transfer"]}
      />

      <SubHeader
        text={ACTION_HEADERS["update"]["sendEmail"]}
        htmlFor="email type"
      />
      <Datalist
        list={emailTypes}
        placeholder="Email Type"
        id={emailTypes}
        mapList={emailTypes}
        name="emailType"
        onChange={handleInputChange}
      />
      <UpdateButton
        onClick={() =>
          actionClicked(
            "emailType",
            !inputValues.emailType,
            inputValues.emailType,
            true
          )
        }
        text={ACTIONS_BUTTONS["update"]["send"]}
      />

      <SubHeader
        text={ACTION_HEADERS["update"]["declareSale"]}
        htmlFor="is sold"
      />
      <div className="empty-div" />
      <UpdateButton
        onClick={() =>
          actionClicked("sold", currentClient && currentClient.sold, true)
        }
        text={ACTIONS_BUTTONS["update"]["declare"]}
      />
    </div>
  );
};

const UpdateButton = ({ onClick, text }) => {
  return (
    <button className="light-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default UpdateClient;
