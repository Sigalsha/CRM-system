import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputWrapper from "../general/InputWrapper";
import Input from "../general/Input";
import "../../styles/clients/editClientPopUp.css";

const EditClientPopUp = ({
  clientToEdit,
  toggleEditClient,
  submitInputChange
}) => {
  const [firstName, setFirstName] = useState(clientToEdit.name.split(" ")[0]);
  const [surname, setSurname] = useState(clientToEdit.name.split(" ")[1]);
  const [country, setCountry] = useState(clientToEdit.country);

  const handleSubmit = () => {
    const clientToUpdate = {
      name:
        firstName && surname ? `${firstName} ${surname}` : clientToEdit.name,
      country: country ? country : clientToEdit.country
    };

    submitInputChange({ ...clientToEdit, ...clientToUpdate });
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-container" id={clientToEdit.id}>
        <div className="exit-btn" onClick={toggleEditClient}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <form onSubmit={handleSubmit}>
          <InputWrapper
            inputHeader="Name:"
            htmlFor="first name"
            isPopupInput={true}
            Input={
              <Input
                name="firstName"
                value={firstName}
                isPopupInput={true}
                onChange={(e) => setFirstName(e.target.value)}
              />
            }
          />
          <InputWrapper
            inputHeader="Surname:"
            htmlFor="surname"
            isPopupInput={true}
            Input={
              <Input
                name="surname"
                value={surname}
                isPopupInput={true}
                onChange={(e) => setSurname(e.target.value)}
              />
            }
          />
          <InputWrapper
            inputHeader="Country:"
            htmlFor="country"
            isPopupInput={true}
            Input={
              <Input
                name="country"
                value={country}
                isPopupInput={true}
                onChange={(e) => setCountry(e.target.value)}
              />
            }
          />
          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClientPopUp;
