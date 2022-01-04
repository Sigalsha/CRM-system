import React, { useState } from "react";
import {
  ACTIONS_ALERTS,
  ACTION_HEADERS,
  ACTIONS_BUTTONS
} from "../../utils/constants";
import Alert from "../general/Alert";
import SubHeader from "../general/SubHeader";
import Datalist from "./Datalist";
import "../../styles/actions/updateClient.css";

const UpdateClient = ({ owners, emailTypes, currentClient, updateClient }) => {
  const [alert, setAlert] = useState(false);
  const [owners, setOwners] = useState(owners);
  const [emailTypes, setEmailTypes] = useState(emailTypes);
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [inputValues, setInputValues] = useState({
    owner: "",
    emailType: ""
  });

  const toggleAlert = () => setAlert(!alert);

  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
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
      console.log("current client", currentClient);
      return;
    }
    updateClient({ id: currentClient._id, owner }, resetInputs());
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

    updateClient({ id: currentClient._id, emailType }, resetInputs());
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
      updateClient({ id: currentClient._id, sold: true }, resetInputs());
    }
  };

  return (
    <div className="update-client-container">
      {alert && <Alert text={alertText} toggleAlert={toggleAlert} />}
      <SubHeader text={ACTION_HEADERS["update"]["transferOwnership"]} />
      <Datalist
        list={owners}
        placeholder="Owner"
        id={owners}
        mapList={owners}
        name="owner"
        onChange={handleInputChange}
        // check what is for
        /* onFocus={this.onFocus} */
      />
      <UpdateButton
        onClick={changeOwner}
        text={ACTIONS_BUTTONS["update"]["transfer"]}
      />

      <SubHeader text={ACTION_HEADERS["update"]["sendEmail"]} />
      <Datalist
        list={emailTypes}
        placeholder="Email Type"
        id={emailTypes}
        mapList={emailTypes}
        name="emailType"
        onChange={handleInputChange}
      />
      <UpdateButton
        onClick={changeEmailType}
        text={ACTIONS_BUTTONS["update"]["send"]}
      />

      <SubHeader text={ACTION_HEADERS["update"]["declareSale"]} />
      <div className="empty-div" />
      <UpdateButton
        onClick={declareSold}
        text={ACTIONS_BUTTONS["update"]["declare"]}
      />
    </div>
  );
};

export default UpdateClient;
