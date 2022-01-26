import React, { useEffect, useState } from "react";
import Loading from "../general/Loading";
import ClientData from "./ClientData";
import ColumnsHeader from "./ColumnsHeader";
import "../../styles/clients/clientRow.css";

const ClientRow = ({ clients, toggleEditClient }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (clients.length > 1) {
      setLoading(false);
    }
  }, [clients]);

  const clientsTable = (
    <>
      {clients.map((c) => {
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
    </>
  );

  const noResults = (
    <tr>
      <th className="no-results">Sorry, no results found</th>
    </tr>
  );

  return (
    <>
      {isLoading ? (
        <Loading className="table-loader-position" />
      ) : (
        <table>
          <ColumnsHeader />
          <tbody>{clients.length ? clientsTable : noResults}</tbody>
        </table>
      )}
    </>
  );
};

export default ClientRow;
