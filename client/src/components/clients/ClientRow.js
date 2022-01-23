import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { COLORS } from "../../utils/constants";
import ClientData from "./ClientData";
import ColumnsHeader from "./ColumnsHeader";
import "../../styles/clients/clientRow.css";

const ClientRow = ({ clients, toggleEditClient, itemsPerPage }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (clients.length > 1) {
      setLoading(false);
    }
  }, [clients]);

  return (
    <>
      {isLoading ? (
        <div className="table-loader-position">
          <Loader
            type="Puff"
            color={COLORS["yellow"]}
            height={200}
            width={200}
          />
        </div>
      ) : (
        <table>
          <ColumnsHeader />
          <tbody>
            {clients.length ? (
              clients.map((c) => {
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
              })
            ) : (
              <h1>Sorry, no results found</h1>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ClientRow;
