import React, { Fragment } from "react";
import "../../styles/clients/clientData.css";

const ClientData = ({
  _id,
  name,
  country,
  owner,
  emailType,
  sold,
  firstContact,
  toggleEditClient
}) => {
  const generateClientToEdit = () => {
    toggleEditClient({
      id: _id,
      name: name,
      country: country,
      owner: owner,
      emailType: emailType,
      sold: sold
    });
  };

  const formatRowItemInfo = (itemType, rowItemInfo) => {
    switch (itemType) {
      case "firstName":
        return rowItemInfo.split(" ")[0];
      case "surname":
        return rowItemInfo.split(" ")[1];
      case "firstContact":
        return rowItemInfo.split("T")[0];
      default:
        return;
    }
  };

  return (
    <Fragment>
      <tr className="row-container" id={_id} onClick={generateClientToEdit}>
        <td className="rowItem">{formatRowItemInfo("firstName", name)}</td>
        <td className="rowItem">{formatRowItemInfo("surname", name)}</td>
        <td className="rowItem">{country}</td>
        <td className="rowItem">
          {formatRowItemInfo("firstContact", firstContact)}
        </td>
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
  );
};
export default ClientData;
