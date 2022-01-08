import React, { useState, Fragment } from "react";
import "../../styles/clients/clientData.css";

const ClientData = () => { 
    generateClientToEdit = () => {
      const { id, name, country, owner, emailType, sold, toggleEditClient } =
        this.props;
      let clientToEdit = {
        id,
        name,
        country,
        owner,
        emailType,
        sold
      };
      toggleEditClient(clientToEdit);
    };

    return (
        let fixedName = name.split(" ")[0];
        let surname = name.split(" ")[1];
        let formatFirstContact = firstContact.split("T")[0];

    <Fragment>
        <tr
          className="row-container"
          id={id}
          onClick={generateClientToEdit}
        >
          <td className="rowItem">{fixedName}</td>
          <td className="rowItem">{surname}</td>
          <td className="rowItem">{country}</td>
          <td className="rowItem">{formatFirstContact}</td>
          <td className="rowItem">{emailType}</td>
          <td className="rowItem">
            {sold ? (
              <span>
                <strong>V</strong>
              </span>
            ) : (
              "-"
            )}
          </td>
          <td className="rowItem">{owner}</td>
        </tr>
    </Fragment>
    )
};
export default ClientData;
