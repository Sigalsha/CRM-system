import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
        <div className="popup-row">
          <span>Name:</span>
          <input
            className="popup-input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="popup-row">
          <span>surname:</span>
          <input
            className="popup-input"
            type="text"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="popup-row">
          <span>Country</span>
          <input
            className="popup-input"
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="update-btn" onClick={handleSubmit}>
          Update
        </div>
      </div>
    </div>
  );
};

export default EditClientPopUp;
