import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilteredClients } from "../../actions/clientsActions";
import { EMAIL_TYPES, IS_SOLD } from "../../utils/constants";
import Select from "../general/Select";
import "../../styles/clients/clientsFilter.css";

const ClientsFilter = ({ countries, names, owners, isResetFilters }) => {
  const [owner, setOwner] = useState("");
  const [sold, setSold] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
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
    dispatch(getFilteredClients(currentFilters));
  }, [currentFilters, dispatch]);

  useEffect(() => {
    if (isResetFilters) {
      resetFilters();
    }
  }, [isResetFilters]);

  const resetFilters = () => {
    setName("");
    setCountry("");
    setEmailType("");
    setOwner("");
    setSold("");
  };

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
        htmlFor="name"
      />
      <Select
        labelName="Country"
        placeholder="Country"
        optionlistProp={countries}
        value={country}
        onChange={handleChange}
        name="country"
        htmlFor="country"
      />
      <Select
        labelName="Email Type"
        placeholder="Email Type"
        optionlistProp={EMAIL_TYPES}
        onChange={handleChange}
        value={emailType}
        name="emailType"
        htmlFor="emailType"
      />
      <Select
        labelName="Sold"
        placeholder="Sold"
        optionlistProp={IS_SOLD}
        onChange={handleChange}
        value={sold}
        name="sold"
        htmlFor="is sold"
      />
      <Select
        labelName="Owner"
        placeholder="Owner"
        optionlistProp={owners}
        value={owner}
        name="owner"
        htmlFor="owner"
        onChange={handleChange}
      />
    </div>
  );
};

export default ClientsFilter;
