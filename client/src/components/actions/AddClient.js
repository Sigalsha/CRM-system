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
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [inputValues, setInputValues] = useState({
    firstName: "",
    surname: "",
    country: "",
    owner: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // TODO - implement it

  const toggleAlert = () => setAlert(!alert);

  const checkNewClientDetails = (inputValues) => {
    for (let val in inputValues) {
      if (!utils.isMinLength(inputValues[val])) {
        setAlert(true);
        if (val === "firstName") {
          setAlertText(`first name ${ACTIONS_ALERTS["addClient"]["minChar"]}`);
          return false;
        }
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
        inputValues.firstName,
        "firstName",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      ) ||
      !validateInput(
        inputValues.surname,
        "surname",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      ) ||
      !validateInput(
        inputValues.country,
        "country",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      ) ||
      !validateInput(
        inputValues.owner,
        "owner",
        setAlert,
        setAlertText,
        ACTIONS_ALERTS["addClient"]
      )
    ) {
      return;
    }

    const { firstName, surname, country, owner } = inputValues;

    if (!checkNewClientDetails({ firstName, surname, country, owner })) return;

    const newClient = {
      name: `${firstName} ${surname}`,
      country: country,
      owner: owner
    };

    addNewClient(newClient);
    setInputValues({
      ...inputValues,
      firstName: "",
      surname: "",
      country: "",
      owner: ""
    });
    resetInputs();
  };

  return (
    <div className="add-client-container">
      {alert && <Alert text={alertText} toggleAlert={toggleAlert} />}
      <form onSubmit={handleSubmit}>
        <InputWrapper
          inputHeader={ACTION_HEADERS["add"]["firstName"]}
          htmlFor="first name"
          Input={
            <Input
              name="firstName"
              value={inputValues.firstName}
              onChange={handleInputChange}
            />
          }
        />
        <InputWrapper
          inputHeader={ACTION_HEADERS["add"]["surname"]}
          htmlFor="surname"
          Input={
            <Input
              name="surname"
              value={inputValues.surname}
              onChange={handleInputChange}
            />
          }
        />
        <InputWrapper
          inputHeader={ACTION_HEADERS["add"]["country"]}
          htmlFor="country"
          Input={
            <Input
              name="country"
              value={inputValues.country}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
