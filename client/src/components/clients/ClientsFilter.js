import React, { useState, useEffect } from "react";
import utils from "../../utils/utils";
import { EMAIL_TYPES, IS_SOLD, CLIENTS_HEADERS } from "../../utils/constants";
import "../../styles/clients/clientsFilter.css";
import Select from "../general/Select";

const ClientsFilter = ({ clients, selectValue, updateSelectedFilter }) => {
  const [owners, setOwners] = useState([]);
  const [names, setNames] = useState([]);
  const [countries, setCountries] = useState([]);
  const [owner, setOwner] = useState("");
  const [sold, setSold] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [emailType, setEmailType] = useState("");

  useEffect(() => {
    // change it to getClientsFromServer

    setCountries(
      utils.reduceDuplications(
        utils.getClientProperty(CLIENTS_HEADERS["country"], clients)
      )
    );
    setNames(utils.getClientProperty(CLIENTS_HEADERS["name"], clients));
    setOwners(
      utils.reduceDuplications(
        utils.getClientProperty(CLIENTS_HEADERS["owner"], clients)
      )
    );
  }, [clients]);

  const handleChange = (event) => {
    const {
      target: { value, name }
    } = event;
    console.log(name, value);

    updateSelectedFilter(event);
    switch (name) {
      case "name":
        return setName(value);
      case "country":
        return setCountry(value);
      case "emailType":
        return setEmailType(value);
      case "sold":
        return setSold(value);
      case "owner":
        return setOwner(value);
      default:
        return;
    }
    // TODO - fix it
    // setState({ [event.target.name]: event.target.value });
  };

  return (
    <div className="clients-filter-wrapper">
      <Filter
        labelName="Name"
        placeholder="Name"
        optionlist={names}
        value={name}
        onChange={handleChange}
        name="name"
        isFilterSelect
      />
      <Filter
        labelName="Country"
        placeholder="Country"
        optionlist={countries}
        value={country}
        onChange={handleChange}
        name="country"
      />
      <Filter
        labelName="Email Type"
        placeholder="Email Type"
        optionlist={EMAIL_TYPES}
        onChange={handleChange}
        value={emailType}
        name="emailType"
      />
      <Filter
        labelName="Sold"
        placeholder="Sold"
        optionlist={IS_SOLD}
        onChange={handleChange}
        value={sold}
        name="sold"
      />
      <Filter
        labelName="Owner"
        placeholder="Owner"
        optionlist={owners}
        value={owner}
        name="owner"
        onChange={handleChange}
      />
    </div>
  );
};

const Filter = ({
  labelName,
  optionlist,
  placeholder,
  onChange,
  value,
  name
}) => {
  return (
    <div className="filter-group">
      <label>{labelName}: </label>
      <Select
        optionlist={optionlist}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        defaultValue="All"
      />
    </div>
  );
};

export default ClientsFilter;
