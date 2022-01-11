import React, { useEffect, useState } from "react";
import ClientData from "./ClientData";

const ClientRow = ({ clients, toggleEditClient }) => {
  // const [updatedClients, setUpdatedClients] = useState(clients);
  return (
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
  );
};

export default ClientRow;
//  {updatedClients &&}
