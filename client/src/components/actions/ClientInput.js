import React, { useState, useEffect } from "react";
import { ACTION_HEADERS } from "../../utils/constants";
import Required from "../general/Required";
import SubHeader from "../general/SubHeader";
import Datalist from "./Datalist";
import "../../styles/actions/clientInput.css";

const ClientInput = (props) => {
  const [clients, setClients] = useState(props.clients);

  // check if working
  useEffect(() => {
    setClients(props.clients);
  }, [props.clients]);

  const handleChange = (event) => {
    const { value } = event.target;
    props.getCurrentClient(event);
  };

  return (
    <div className="client-input-container">
      <div className="client-input-header">
        <Required isClient="true" />
        <SubHeader
          text={ACTION_HEADERS["update"]["client"]}
          htmlFor="client name"
        />
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
