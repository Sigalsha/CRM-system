import React, { useState } from "react";
import {
  ACTION_HEADERS,
  ACTIONS_BUTTONS,
  ACTIONS_ALERTS
} from "../../utils/constants";
import Alert from "../general/Alert";
import Required from "../general/Required";
import Datalist from "./Datalist";
import SubHeader from "../general/SubHeader";
import "../../styles/actions/addClient.css";

const AddClient = ({ owners, addNewClient }) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [owner, setOwner] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

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

  const toggleAlert = () => setAlert(!alert);

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

    if (checkNewClientDetails(newClient) === false) {
      alert("please add all the client's details!");
    }

    addNewClient(newClient);
    setFirstName("");
    setSurname("");
    setCountry("");
    setOwner("");
    resetInputs();
  };

  return (
    <div className="add-client-container">
      {alert && <Alert text={alertText} toggleAlert={toggleAlert} />}
      <InputClientWrapper
        inputType={firstName}
        inputTypeString="firstName"
        handleInputChange={(e) => setFirstName(e.target.value)}
      />
      <InputClientWrapper
        inputType={surname}
        inputTypeString="surname"
        handleInputChange={(e) => setSurname(e.target.value)}
      />
      <InputClientWrapper
        inputType={country}
        inputTypeString="country"
        handleInputChange={(e) => setCountry(e.target.value)}
      />
      <InputClientWrapper
        inputTypeString="owner"
        mapList={owners}
        id={owners}
        list={owners}
        handleInputChange={(e) => setOwner(e.target.value)}
      />
      <AddNewClientBtn
        onClick={handleAddClient}
        text={ACTIONS_BUTTONS["add"]["addNew"]}
      />
    </div>
  );
};

const InputClientWrapper = ({
  inputType,
  inputTypeString,
  handleInputChange,
  mapList,
  list,
  id
}) => {
  return (
    <div className="input-wrapper">
      <Required />
      <SubHeader text={ACTION_HEADERS["add"][inputTypeString]} />
      {inputTypeString !== "owner" ? (
        <Input
          name={inputTypeString}
          value={inputType}
          onChange={handleInputChange}
        />
      ) : (
        <Datalist
          isAddClient="true"
          list={list}
          id={id}
          mapList={mapList}
          name={inputTypeString}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

const Input = ({ name, value, onChange }) => {
  return (
    <input
      className="input-add-client"
      type="text"
      name={name}
      value={value ? value : ""}
      onChange={onChange}
    />
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
