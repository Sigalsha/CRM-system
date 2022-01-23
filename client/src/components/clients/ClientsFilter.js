import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilteredClients } from "../../actions/clientsActions";
import { EMAIL_TYPES, IS_SOLD, CLIENTS_HEADERS } from "../../utils/constants";
import "../../styles/clients/clientsFilter.css";
import Select from "../general/Select";

const ClientsFilter = ({ countries, names, owners }) => {
  const [owner, setOwner] = useState("");
  const [sold, setSold] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  // const [countries, setCountries] = useState([]);
  const [emailType, setEmailType] = useState("");
  const [currentFilters, setCurrentFilters] = useState({
    name: "",
    owner: "",
    country: "",
    emailType: "",
    sold: ""
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("currentFilters from ClientsFilter ", currentFilters);
    dispatch(getFilteredClients(currentFilters));
    // currentFilters should be sent to redux searchClients
  }, [currentFilters, dispatch]);

  const updateSelectedFilter = (e) => {
    const { value, name } = e.target;
    let filters = {};

    if (name && value) {
      if (value === "All") {
        filters[name] = "";
      } else if (name === "sold") {
        if (value === "Sold") {
          filters[name] = true;
        } else {
          filters[name] = false;
        }
      } else if (name === "emailType" && value === "No Type") {
        filters[name] = null;
      } else {
        filters[name] = value;
      }
    }

    setCurrentFilters({ ...currentFilters, ...filters });
  };

  const handleChange = (event) => {
    updateSelectedFilter(event);
    const {
      target: { name, value }
    } = event;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "country":
        setCountry(value);
        console.log(countries);

        break;
      case "emailType":
        setEmailType(value);
        break;
      case "owner":
        setOwner(value);
        break;
      case "sold":
        setSold(value);
        break;
    }
    // TODO - fix it
    // setState({ [event.target.name]: event.target.value });
  };

  return (
    <div className="clients-filter-wrapper">
      <Select
        labelName="Name"
        placeholder="Name"
        optionlistProp={names}
        value={name}
        onChange={handleChange}
        name="name"
        isFilterSelect
      />
      <Select
        labelName="Country"
        placeholder="Country"
        optionlistProp={countries}
        value={country}
        onChange={handleChange}
        name="country"
      />
      <Select
        labelName="Email Type"
        placeholder="Email Type"
        optionlistProp={EMAIL_TYPES}
        onChange={handleChange}
        value={emailType}
        name="emailType"
      />
      <Select
        labelName="Sold"
        placeholder="Sold"
        optionlistProp={IS_SOLD}
        onChange={handleChange}
        value={sold}
        name="sold"
      />
      <Select
        labelName="Owner"
        placeholder="Owner"
        optionlistProp={owners}
        value={owner}
        name="owner"
        onChange={handleChange}
      />
    </div>
  );
};

/* const Filter = ({
  labelName,
  optionlist,
  placeholder,
  onChange,
  value,
  name
}) => {
  console.log(optionlist);

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
}; */

export default ClientsFilter;
