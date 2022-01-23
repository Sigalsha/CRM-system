import React, { useEffect, useState } from "react";
import ClientData from "./ClientData";
import ColumnsHeader from "./ColumnsHeader";

const ClientRow = ({
  clients,
  clientsToDisplay,
  toggleEditClient,
  itemsPerPage
}) => {
  const [updatedClients, setUpdatedClients] = useState(clientsToDisplay);

  /*   useEffect(() => {
    console.log("clientsToDisplay from ClientRow ", clientsToDisplay);
    setUpdatedClients(clientsToDisplay);
  }, [clientsToDisplay, clients]); */

  return (
    <table>
      <ColumnsHeader />
      <tbody>
        {clients.map((c) => {
          // console.log(c.name);
          return (
            <ClientData
              key={c._id}
              _id={c._id}
              name={c.name}
              country={c.country}
              firstContact={c.firstContact}
              emailType={c.emailType}
              sold={c.sold}
              owner={c.owner}
              toggleEditClient={toggleEditClient}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default ClientRow;
