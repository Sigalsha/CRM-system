import React, { useState, useEffect } from "react";
import {
  ACTIONS_ALERTS,
  ACTION_HEADERS,
  ACTIONS_BUTTONS
} from "../../utils/constants";
import Alert from "../general/Alert";
import SubHeader from "../general/SubHeader";
import Datalist from "./Datalist";
import "../../styles/actions/updateClient.css";

const UpdateClient = ({ currentClient, changeClient, emailTypes, owners }) => {
  const [owner, setOwner] = useState("");
  const [emailType, setEmailType] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const toggleAlert = () => setAlert(!alert);

  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const changeOwner = () => {
    if (!currentClient) {
      setAlertText(ACTIONS_ALERTS["update"]["currentClient"]);
      setAlert(true);
      setOwner("");
      resetInputs();
      return;
    }
    if (!owner) {
      setAlertText(ACTIONS_ALERTS["update"]["owner"]);
      setAlert(true);
      return;
    }
    changeClient({ owner });
    resetInputs();
  };

  const changeEmailType = () => {
    if (!currentClient) {
      setAlertText(ACTIONS_ALERTS["update"]["currentClient"]);
      setAlert(true);
      resetInputs();
      return;
    }
    if (!emailType) {
      setAlertText(ACTIONS_ALERTS["update"]["emailType"]);
      setAlert(true);
      return;
    }

    changeClient({ emailType });
    resetInputs();
  };

  const declareSold = () => {
    if (currentClient && currentClient.sold) {
      setAlertText(ACTIONS_ALERTS["update"]["declareSale"]);
      setAlert(true);
      resetInputs();
      return;
    } else {
      if (!currentClient) {
        setAlertText(ACTIONS_ALERTS["update"]["currentClient"]);
        setAlert(true);
        resetInputs();
        return;
      }
      changeClient({ sold: true });
      resetInputs();
    }
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
        onChange={(e) => setOwner(e.target.value)}
        // check what is for
        /* onFocus={this.onFocus} */
      />
      <UpdateButton
        onClick={changeOwner}
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
        onChange={(e) => setEmailType(e.target.value)}
      />
      <UpdateButton
        onClick={changeEmailType}
        text={ACTIONS_BUTTONS["update"]["send"]}
      />

      <SubHeader
        text={ACTION_HEADERS["update"]["declareSale"]}
        htmlFor="is sold"
      />
      <div className="empty-div" />
      <UpdateButton
        onClick={declareSold}
        text={ACTIONS_BUTTONS["update"]["declare"]}
      />
    </div>
  );
};

const UpdateButton = ({ onClick, text }) => {
  return (
    <div className="light-btn" onClick={onClick}>
      {text}
    </div>
  );
};

export default UpdateClient;
