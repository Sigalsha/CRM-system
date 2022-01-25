import React, { useState } from "react";
import {
  ACTION_HEADERS,
  ACTIONS_BUTTONS,
  ACTIONS_ALERTS
} from "../../utils/constants";
import Alert from "../general/Alert";
import Required from "../general/Required";
import SubHeader from "../general/SubHeader";
import Datalist from "./Datalist";
import InputWrapper from "../general/InputWrapper";
import Input from "../general/Input";
import "../../styles/actions/addClient.css";

const AddClient = ({ owners, addNewClient }) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [owner, setOwner] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  // TODO - implement it
  /*       handleInputChange = (event) => {
        const {
          target: { value, name }
        } = event;

        this.setState({
          [name]: value
        });
      }; */

  const checkNewClientDetails = (obj) => {
    for (let key in obj) {
      if (obj[key] === "") {
        return false;
      }
    }
    return;
  };

  const validateAction = (clientAction, alertType) => {
    if (!clientAction) {
      setAlert(true);
      setAlertText(ACTIONS_ALERTS["addClient"][alertType]);
      return false;
    }
    return true;
  };

  const toggleAlert = () => {
    setAlert(!alert);
    setSuccessAlert(false);
  };

  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleAddClient = () => {
    if (
      !validateAction(firstName, "firstName") ||
      !validateAction(surname, "surname") ||
      !validateAction(country, "country") ||
      !validateAction(owner, "owner")
    ) {
      return;
    }

    const newClient = {
      name: `${firstName} ${surname}`,
      country: country,
      owner: owner
    };

    // check it
    if (checkNewClientDetails(newClient) === false) {
      alert("please add all the client's details!");
    }

    addNewClient(newClient);
    setAlertText(ACTIONS_ALERTS["success"]["update"]["addClient"]);
    setAlert(true);
    setSuccessAlert(true);
    setFirstName("");
    setSurname("");
    setCountry("");
    setOwner("");
    resetInputs();
  };

  return (
    <div className="add-client-container">
      {alert && (
        <Alert
          text={alertText}
          toggleAlert={toggleAlert}
          isSuccess={successAlert}
        />
      )}
      <InputWrapper
        inputHeader={ACTION_HEADERS["add"]["firstName"]}
        htmlFor="first name"
        Input={
          <Input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        }
      />
      <InputWrapper
        inputHeader={ACTION_HEADERS["add"]["surname"]}
        htmlFor="surname"
        Input={
          <Input
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        }
      />
      <InputWrapper
        inputHeader={ACTION_HEADERS["add"]["country"]}
        htmlFor="country"
        Input={
          <Input
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        }
      />
      <InputWrapper
        inputHeader={ACTION_HEADERS["add"]["owner"]}
        htmlFor="owner"
        isDatalist={true}
        Datalist={
          <Datalist
            name="owner"
            list={owners}
            mapList={owners}
            id={owners}
            placeholder="owner"
            isAddClient={true}
            onChange={(e) => setOwner(e.target.value)}
          />
        }
      />
      <AddNewClientBtn
        onClick={handleAddClient}
        text={ACTIONS_BUTTONS["add"]["addNew"]}
      />
    </div>
  );
};

const AddNewClientBtn = ({ onClick, text }) => {
  return (
    <div className="add-new-client-btn" onClick={onClick}>
      {text}
    </div>
  );
};

export default AddClient;
