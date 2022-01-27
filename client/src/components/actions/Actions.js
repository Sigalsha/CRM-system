import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import utils from "../../utils/utils";
import {
  CLIENTS_HEADERS,
  ACTION_HEADERS,
  EMAIL_TYPES,
  ACTIONS_ALERTS
} from "../../utils/constants";
import { useError } from "../../hooks/errorHooks";
import Loading from "../general/Loading";
import Alert from "../general/Alert";
import {
  getClients,
  updateClient,
  addClient
} from "../../actions/clientsActions";
import { clearErrors } from "../../actions/errorActions";
import ClientInput from "./ClientInput";
import UpdateClient from "./UpdateClient.js";
import AddClient from "./AddClient";
import "../../styles/actions/actions.css";

const Actions = () => {
  const { clients, loading } = useSelector((state) => state.clients);
  const [isLoading, setIsLoading] = useState(true);
  const [currentClient, setCurrentClient] = useState({});
  const [updatedClient, setUpdatedClient] = useState({});
  const [newClient, setNewClient] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const dispatch = useDispatch();
  const error = useError();

  useEffect(() => {
    dispatch(getClients());
    if (!loading) {
      setIsLoading(false);
    }
    console.log("clients from Actions, after update");
  }, [dispatch, updatedClient, newClient]);

  useEffect(() => {
    if (error) {
      setAlert(true);
      setAlertText(error);
    }
  }, [error]);

  const toggleAlert = () => {
    setAlert(!alert);
    setSuccessAlert(false);
  };

  const getCurrentClient = (event) => {
    const { value } = event.target;

    let chosenClient = clients.filter((c) => value === c.name);

    if (chosenClient.length && chosenClient[0] !== currentClient) {
      setCurrentClient(chosenClient[0]);
    } else if (value === "") {
      setCurrentClient(value);
    }
  };

  const changeClient = (updatedClientData, actionTypeToUpdate) => {
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
    if (!error) {
      setAlertText(ACTIONS_ALERTS["success"]["update"][actionTypeToUpdate]);
      setAlert(true);
      setSuccessAlert(true);
      dispatch(clearErrors());
      setUpdatedClient(updatedClient);
    }
    setCurrentClient("");
  };

  const addNewClient = (newClient) => {
    dispatch(addClient(newClient));
    if (!error) {
      setAlertText(ACTIONS_ALERTS["success"]["addClient"]);
      setAlert(true);
      setSuccessAlert(true);
      dispatch(clearErrors());
      setNewClient(newClient);
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div id="actions-container">
          {alert && (
            <Alert
              text={alertText}
              toggleAlert={toggleAlert}
              isSuccess={successAlert}
            />
          )}
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
              emailTypes={EMAIL_TYPES.slice(0, 4)}
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
