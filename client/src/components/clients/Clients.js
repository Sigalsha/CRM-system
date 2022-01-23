import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { getClients, updateClient } from "../../actions/clientsActions";
import utils from "../../utils/utils";
import { COLORS } from "../../utils/constants";
import "../../styles/clients/clients.css";
import ClientsFilter from "./ClientsFilter";
import ClientsPagination from "./ClientsPagination";
import ClientRow from "./ClientRow";
import EditClientPopUp from "./EditClientPopUp";
import { CLIENTS_HEADERS } from "../../utils/constants";

const itemsPerPage = 20;

const Clients = () => {
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.clients);
  const [owners, setOwners] = useState([]);
  const [names, setNames] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [isPageReset, setIsPageReset] = useState(false);
  const [currentClients, setCurrentClients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [clientToEdit, setClientToEdit] = useState({});
  const [updatedClient, setUpdatedClient] = useState(false);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    try {
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

      setCurrentClients([...clients].slice(0, itemsPerPage));
      setIsPageReset(true);
      setPageLimit(20);
      setPageCount(updatePageCount(clients.length));

      console.log("useEffect of Clients");

      if (
        loading &&
        currentClients.length > 1 &&
        countries.length > 2 &&
        owners.length > 2 &&
        names.length > 2
      ) {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [clients]);

  const updateCurrentPage = (pageIndex) => {
    return [...clients].slice(pageIndex - itemsPerPage, pageIndex);
  };

  const updatePageCount = (clientsLength) => {
    if (Math.ceil(clientsLength / itemsPerPage) <= 1) {
      return 1;
    } else {
      return Math.ceil(clientsLength / itemsPerPage);
    }
  };

  const displayByPage = (pageDirection, pageNum) => {
    let currentPageDisplay = [];
    let currentPageLimit = pageLimit;
    let pageIndex = pageNum * itemsPerPage;

    // if specific page =>
    // if prev page?
    if (pageDirection === -1) {
      if (pageNum === 1) {
        currentPageDisplay = [...clients].slice(0, itemsPerPage);
        currentPageLimit = 20;
      } else {
        currentPageDisplay = updateCurrentPage(pageIndex);
        currentPageLimit -= itemsPerPage;
      }

      // if next page?
    } else {
      if (pageNum >= pageCount) {
        currentPageLimit = pageCount * itemsPerPage;
      } else {
        currentPageLimit += itemsPerPage;
      }
      currentPageDisplay = updateCurrentPage(pageIndex);
    }

    setCurrentClients(currentPageDisplay);
    setPageLimit(pageIndex);
    setIsPageReset(false);
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

  const editClientChange = (updatedClient) => {
    dispatch(
      updateClient(clientToEdit.id, { ...clientToEdit, ...updatedClient })
    );

    setUpdatedClient(updatedClient);
    setShowPopup(!showPopup);
    setClientToEdit({
      id: null,
      name: "",
      country: "",
      owner: "",
      sold: false,
      emailType: null
    });
  };

  return (
    <>
      {isLoading ? (
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
              countries={countries}
              owners={owners}
              names={names}
            />
          </div>
          <div className="clients-child">
            <ClientsPagination
              displayByPage={displayByPage}
              pageLimit={pageLimit}
              pageCount={pageCount}
              isPageReset={isPageReset}
            />
          </div>
          <div className="clients-child">
            <ClientRow
              clients={currentClients.length ? currentClients : clients}
              toggleEditClient={toggleEditClient}
              itemsPerPage={itemsPerPage}
            />
          </div>
          <div className="clients-child">
            {showPopup && (
              <EditClientPopUp
                clientToEdit={clientToEdit}
                toggleEditClient={toggleEditClient}
                submitInputChange={editClientChange}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Clients;
