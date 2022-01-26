import React, { useState } from "react";
import utils from "../../utils/utils";
import {
  ACTION_HEADERS,
  ACTIONS_BUTTONS,
  ACTIONS_ALERTS
} from "../../utils/constants";
import { resetInputs, validateInput } from "../../utils/helpers";
import Alert from "../general/Alert";
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

  const toggleAlert = () => {
    setAlert(!alert);
    setSuccessAlert(false);
  };

  const checkNewClientDetails = (inputValues) => {
    for (let val in inputValues) {
      if (!utils.isMinLength(inputValues[val])) {
        setAlert(true);
        setAlertText(`${val} ${ACTIONS_ALERTS["addClient"]["minChar"]}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateInput(
        firstName,
        "firstName",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      ) ||
      !validateInput(
        surname,
        "surname",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      ) ||
      !validateInput(
        country,
        "country",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      ) ||
      !validateInput(
        owner,
        "owner",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      )
    ) {
      return;
    }

    if (!checkNewClientDetails({ firstName, surname, country, owner })) return;

    const newClient = {
      name: `${firstName} ${surname}`,
      country: country,
      owner: owner
    };

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
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="add-new-client-btn">
          {ACTIONS_BUTTONS["add"]["addNew"]}
        </button>
      </form>
    </div>
  );
};

export default AddClient;
