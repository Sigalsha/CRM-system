import React, { useEffect, useState } from "react";
import ClientData from "./ClientData";
import ColumnsHeader from "./ColumnsHeader";

const ClientRow = ({ clients, toggleEditClient, itemsPerPage }) => {
  const [updatedClients, setUpdatedClients] = useState(clients);

  useEffect(() => {
    console.log(clients);

    setUpdatedClients(clients.slice(0, itemsPerPage));
  }, [clients]);

  return (
    <table>
      <ColumnsHeader />
      <tbody>
        {updatedClients.map((c) => {
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
