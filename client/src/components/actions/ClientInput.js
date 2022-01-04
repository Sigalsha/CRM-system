import React, { useState, useEffect } from "react";
import { ACTION_HEADERS } from "../../utils/constants";
import Required from "../general/Required";
import SubHeader from "../general/SubHeader";
import Datalist from "./Datalist";
import "../../styles/actions/clientInput.css";

// clients, getCurrentClient, currentClient
const ClientInput = (props) => {
  const [clients, setClients] = useState(props.clients);
  const [currentClient, setCurrentClient] = useState(props.currentClient || "");

  // check if working
  useEffect(() => {
    setClients(props.clients);
  }, [props.clients]);
  /*     static getDerivedStateFromProps(props, state) {
    if (props.clients !== state.clients) {
      return { clients: props.clients };
    }

    // Return null if the state hasn't changed
    return null;
} */

  const handleChange = (event) => {
    const { value } = event.target;
    if (value !== currentClient) {
      setCurrentClient(value);
      props.getCurrentClient(event);
    }
  };

  return (
    <div className="client-input-container">
      <div className="client-input-header">
        <Required isClient="true" />
        <SubHeader text={ACTION_HEADERS["update"]["client"]} />
      </div>
      <Datalist
        list={clients}
        placeholder="Client Name"
        onChange={handleChange}
        id={clients}
        mapList={clients}
        name="clientName"
      />
    </div>
  );
};

export default ClientInput;
