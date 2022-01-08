import React, { useState, useEffect, Fragment } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
// import utils from "../../utils/utils";
import clientsData from "../../data.json";
import { URL, COLORS } from "../../utils/constants";
/* import { connect } from "react-redux"; */
// import { getClients } from "../../actions/clientsActions";
import "../../styles/clients/clients.css";
// import ColumnsHeader from "./ColumnsHeader";
import ClientsFilter from "./ClientsFilter";
// import ClientsPagination from "./ClientsPagination";
// import ClientRow from "./ClientRow";
// import EditClientPopUp from "./EditClientPopUp";

const itemsPerPage = 20;

const Clients = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [clientToEdit, setClientToEdit] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [selectValue, setSelectValue] = useState("");
  const [clientsToDisplay, setClientsToDisplay] = useState([]);
  const [currentClients, setCurrentClients] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [isPageReset, setIsPageReset] = useState(false);

  useEffect(() => {
    // change it to getClientsFromServer
    setTimeout(() => {
      setLoading(false);
      setClients(clientsData);
      updateClientsDisplay();
    }, 1000);
  }, []);

  const updateClientsDisplay = () => {
    let filtered = [];

    if (Object.entries(currentFilters).length === 0) {
      setClientsToDisplay([...clients]);
      setPageCount(this.updatePageCount([...clients]));
      setCurrentClients([...clients].slice(0, itemsPerPage));
    } else {
      filtered = this.filterByProperty();
    }

    setClientsToDisplay(filtered);
    setPageCount(this.updatePageCount(filtered));
    setCurrentClients(filtered.slice(0, itemsPerPage));
    setIsPageReset(true);
    setPageLimit(20);
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
    updateClientsDisplay();
  };

  const updateDisplayByPage = (pageDirection, pageNum) => {
    let currentPageDisplay = [];
    let currentPageLimit = pageLimit;
    let pageIndex = pageNum * itemsPerPage;

    // if specific page =>
    if (pageDirection === -1) {
      if (pageNum === 1) {
        currentPageDisplay = clientsToDisplay.slice(0, itemsPerPage);
        currentPageLimit = 20;
      } else {
        currentPageDisplay = updateCurrentPageDisplay(
          clientsToDisplay,
          itemsPerPage,
          pageIndex
        );
        currentPageLimit = currentPageLimit - itemsPerPage;
      }
    } else {
      if (pageNum >= pageCount) {
        currentPageLimit = pageCount * itemsPerPage;
      } else {
        currentPageLimit = currentPageLimit + itemsPerPage;
      }
      currentPageDisplay = updateCurrentPageDisplay(
        clientsToDisplay,
        itemsPerPage,
        pageIndex
      );
    }

    setCurrentClients(currentPageDisplay);
    setPageLimit(pageIndex);
    setIsPageReset(false);
  };

  const submitInputChange = (updatedClient) => {
    axios
      .put(`${URL}${clientToEdit.id}`, updatedClient)
      .then((res) => {
        console.log("res from update client (put) backend ", res);
      })
      .catch((err) =>
        console.log("err from update client (put) backend ", err)
      );

    setShowPopup(!showPopup);
    setClientToEdit({
      id: null,
      name: "",
      country: "",
      owner: "",
      sold: false,
      emailType: null
    });

    // TODO - make it work with useEffect
    // getClientsFromServer();
  };

  const toggleEditClient = (client = null) => {
    setShowPopup(!showPopup);
    setClientToEdit(
      client && {
        id: client.id ? client.id : "",
        name: client.name ? client.name : "",
        country: client.country ? client.country : "",
        owner: client.owner ? client.owner : "",
        emailType: client.emailType ? client.emailType : null,
        sold: client.sold ? client.sold : false
      }
    );
  };

  const updateCurrentPageDisplay = (
    clientsToDisplay,
    itemsPerPage,
    pageIndex
  ) => {
    return clientsToDisplay.slice(pageIndex - itemsPerPage, pageIndex);
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
        <div id="clients-container">
          <div className="clients-child">
            <ClientsFilter
              clients={clients}
              selectValue={selectValue}
              updateSelectedFilter={updateSelectedFilter}
            />
          </div>
          <div className="clients-child">
            {/*          <ClientsPagination
              updateDisplayByPage={updateDisplayByPage}
              pageLimit={pageLimit}
              pageCount={pageCount}
              isPageReset={isPageReset}
              clients={currentClients}
            /> */}
          </div>
          <div className="clients-child">
            <table>
              {/*       <ColumnsHeader />
              <ClientRow
                submitInputChange={submitInputChange}
                clients={currentClients}
                toggleEditClient={toggleEditClient}
              /> */}
            </table>
            {/*      {showPopup && (
              <EditClientPopUp
                clientToEdit={clientToEdit}
                toggleEditClient={toggleEditClient}
                submitInputChange={submitInputChange}
              />
            )} */}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Clients;
