import React, { Fragment, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import utils from "../../utils/utils";
import {
  URL,
  CLIENTS_HEADERS,
  COLORS,
  ACTION_HEADERS
} from "../../utils/constants";
import "../../styles/actions/actions.css";
import clientsData from "../../data.json";
import ClientInput from "./ClientInput";
import UpdateClient from "./UpdateClient.js";
import AddClient from "./AddClient";

const Actions = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [owners, setOwners] = useState([]);
  const [currentClient, setCurrentClient] = useState("");
  const [updatedClient, setUpdatedClient] = useState("");
  const [emailType, setEmailType] = useState(["A", "B", "C", "D"]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // setHasError(false);
      try {
        const res = await axios.get(URL);
        const { data } = res.data;
        // console.log("res from clients backend: ", data);
        setClients(data);
        setOwners(
          utils.reduceDuplications(
            utils.getClientProperty(CLIENTS_HEADERS["owner"], data)
          )
        );
        setCurrentClient("");
      } catch (err) {
        // setHasError(true);
        console.log(err);
      }
    };
    fetchData();
    setLoading(false);
  }, [setClients, updatedClient]);

  useEffect(() => {}, [setCurrentClient]);

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
    debugger;
    let chosenClient = clients.filter((c) => value === c.name);

    if (chosenClient.length && chosenClient[0] !== currentClient) {
      setCurrentClient(chosenClient[0]);
    } else if (value === "") {
      setCurrentClient(value);
    }
  };

  const updateClient = (updatedClientData) => {
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

    axios
      .put(`${URL}${currentClient._id}`, {
        ...currentClient,
        ...updatedClient
      })
      .then((res) => {
        console.log("res from update client (put) backend ", res);
      })
      .catch((err) =>
        console.log("err from update client (put) backend ", err)
      );

    // TODO - implement the rest with axios and redux
    setUpdatedClient(updatedClient);
    setCurrentClient("");
  };

  const addNewClient = (newClient) => {
    console.log(clients);
    // TODO - implement it
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
              owners={owners}
              emailTypes={emailType}
              updateClient={updateClient}
              currentClient={currentClient}
            />
          </div>
          <div id="section" />
          <div className="actions-child">
            <ActionHeader text={ACTION_HEADERS["main"]["addClient"]} />
          </div>
          <div className="actions-child">
            <AddClient addNewClient={addNewClient} owners={owners} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const ActionHeader = ({ text }) => <h1 className="actions-header">{text}</h1>;

export default Actions;

// TODO - implement it with hooks and redux
/*  getClientsFromServer() {
    axios
      .get(URL)
      .then((res) => {
        console.log("res from clients backend: ", res.data.data);
        if (res.data.data.length) {
          const { data } = res.data;
          this.setState({
            loading: false,
            clients: data,
            owners: utils.reduceDuplications(
              utils.getClientProperty(CLIENTS_HEADERS["owner"], data)
            ),
            currentClient: "",
          });
        }
      })
      .catch((err) => {
        console.log("err from clients backend: ", err);
      });
  }*/

/*updateClient = (updatedClientData) => {
  const { currentClient } = this.state;

  const updatedClient = {
    emailType: updatedClientData.emailType
      ? updatedClientData.emailType
      : currentClient.emailType,
    sold: updatedClientData.sold ? updatedClientData.sold : currentClient.sold,
    owner: updatedClientData.owner
      ? updatedClientData.owner
      : currentClient.owner
  };

  axios
    .put(`${URL}${currentClient._id}`, {
      ...currentClient,
      ...updatedClient
    })
    .then((res) => {
      console.log("res from update client (put) backend ", res);
    })
    .catch((err) => console.log("err from update client (put) backend ", err));

  this.setState({ currentClient: "" }, this.getClientsFromServer);

  // this.sendUpdatedClient(client, updatedClient)
};*/

/*addNewClient = (newClient) => {
   const { clients } = this.state;
   axios
     .post(`${URL}add`, newClient)
     .then((res) => {
       console.log("res from add new client (post) backend ", res);
     })
     .catch((err) => {
       console.log("err from add new client (post) backend ", err);
     });

   this.setState(
     {
       clients: [...clients, newClient]
     },
     this.getClientsFromServer
   );
   //should get the client from the server with an Id, then update it in the state?
   //Or get all the clients including the new client
 };*/
