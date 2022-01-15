import React, { Fragment, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getClients,
  updateClient,
  addClient
} from "../../actions/clientsActions";
import utils from "../../utils/utils";
import {
  URL,
  CLIENTS_HEADERS,
  COLORS,
  ACTION_HEADERS
} from "../../utils/constants";
import "../../styles/actions/actions.css";
import ClientInput from "./ClientInput";
import UpdateClient from "./UpdateClient.js";
import AddClient from "./AddClient";

const Actions = () => {
  const [loading, setLoading] = useState(true);
  const clients = useSelector((state) => state.clients.clients);
  const [owners, setOwners] = useState([]);
  const [currentClient, setCurrentClient] = useState({});
  const [updatedClient, setUpdatedClient] = useState({});
  const [newClient, setNewClient] = useState({});
  const [emailType, setEmailType] = useState(["A", "B", "C", "D"]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      // setHasError(false);
      try {
        dispatch(getClients());
        console.log("useEffect of setClients/updatedClient");
      } catch (err) {
        // setHasError(true);
        console.log(err);
      }
    };
    fetchData();
    setLoading(false);
  }, [updatedClient, newClient, getClients, updateClient]);

  /*   useEffect(() => {
    // change it to getClientsFromServer
    setTimeout(() => {
      setLoading(false);
      setClients(clientsData);
      setOwners(
        utils.reduceDuplications(
          utils.getClientProperty(CLIENTS_HEADERS["owner"], clientsData)
        )
      );
      setCurrentClient("");
    }, 1000);
  }, []); */

  // TODO - implement sendUpdatedClient to server and back

  const getCurrentClient = (event) => {
    const { value } = event.target;

    let chosenClient = clients.filter((c) => value === c.name);

    if (chosenClient.length && chosenClient[0] !== currentClient) {
      setCurrentClient(chosenClient[0]);
    } else if (value === "") {
      setCurrentClient(value);
    }
  };

  const changeClient = (updatedClientData) => {
    const updatedClient = {
      emailType: updatedClientData.emailType
        ? updatedClientData.emailType
        : currentClient.emailType,
      sold: updatedClientData.sold
        ? updatedClientData.sold
        : currentClient.sold,
      owner: updatedClientData.owner
        ? updatedClientData.owner
        : currentClient.owner
    };

    dispatch(
      updateClient(currentClient._id, { ...currentClient, ...updatedClient })
    );

    setUpdatedClient(updatedClient);
    setCurrentClient("");
  };

  const addNewClient = (newClient) => {
    dispatch(addClient(newClient));
    setNewClient(newClient);
  };

  return (
    <Fragment>
      {loading ? (
        <div id="loader-position">
          <Loader
            type="Puff"
            color={COLORS["yellow"]}
            height={200}
            width={200}
          />
        </div>
      ) : (
        <div id="actions-container">
          <div className="actions-child">
            <ActionHeader text={ACTION_HEADERS["main"]["update"]} />
          </div>
          <div className="actions-child">
            <ClientInput
              clients={clients}
              getCurrentClient={getCurrentClient}
            />
          </div>
          <div className="actions-child">
            <UpdateClient
              owners={utils.reduceDuplications(
                utils.getClientProperty(CLIENTS_HEADERS["owner"], clients)
              )}
              emailTypes={emailType}
              changeClient={changeClient}
              currentClient={currentClient}
            />
          </div>
          <div id="section" />
          <div className="actions-child">
            <ActionHeader text={ACTION_HEADERS["main"]["addClient"]} />
          </div>
          <div className="actions-child">
            <AddClient
              addNewClient={addNewClient}
              owners={utils.reduceDuplications(
                utils.getClientProperty(CLIENTS_HEADERS["owner"], clients)
              )}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const ActionHeader = ({ text }) => <h1 className="actions-header">{text}</h1>;

export default Actions;
