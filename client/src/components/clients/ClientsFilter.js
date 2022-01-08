import React, { useState } from "react";
import utils from "../../utils/utils";
import { EMAIL_TYPES, IS_SOLD, CLIENTS_HEADERS } from "../../utils/constants";
import "../../styles/clients/clientsFilter.css";
import Select from "../general/Select";

const ClientsFilter = ({ clients, selectValue, updateSelectedFilter }) => {
  const [owners, setOwners] = useState(
    utils.reduceDuplications(
      utils.getClientProperty(CLIENTS_HEADERS["owner"], clients)
    )
  );
  const [names, setNames] = useState(
    utils.getClientProperty(CLIENTS_HEADERS["name"], clients)
  );
  const [countries, setCountries] = useState(
    utils.reduceDuplications(
      utils.getClientProperty(CLIENTS_HEADERS["country"], clients)
    )
  );
  const [owner, setOwner] = useState("");
  const [sold, setSold] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [emailType, setEmailType] = useState("");

  const handleChange = (event) => {
    updateSelectedFilter(event);
    // TODO - fix it
    // setState({ [event.target.name]: event.target.value });
  };

  return (
    <div className="clients-filter-wrapper">
      <Filter
        labelName="Name"
        placeholder="Name"
        optionList={names}
        value={name}
        onChange={handleChange}
        name="name"
        isFilterSelect
      />
      <Filter
        labelName="Country"
        placeholder="Country"
        optionList={countries}
        value={country}
        onChange={handleChange}
        name="country"
      />
      <Filter
        labelName="Email Type"
        placeholder="Email Type"
        optionList={EMAIL_TYPES}
        onChange={handleChange}
        value={emailType}
        name="emailType"
      />
      <Filter
        labelName="Sold"
        placeholder="Sold"
        optionList={IS_SOLD}
        onChange={handleChange}
        value={sold}
        name="sold"
      />
      <Filter
        labelName="Owner"
        placeholder="Owner"
        optionList={owners}
        value={owner}
        name="owner"
        onChange={handleChange}
      />
    </div>
  );
};

const Filter = ({
  labelName,
  optionList,
  placeholder,
  onChange,
  value,
  name
}) => {
  return (
    <div className="filter-group">
      <label>{labelName}: </label>
      <Select
        optionList={optionList}
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
