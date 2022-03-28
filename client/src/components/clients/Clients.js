import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClients, updateClient } from "../../actions/clientsActions";
import { clearErrors } from "../../actions/errorActions";
import { useError } from "../../hooks/errorHooks";
import utils from "../../utils/utils";
import { CLIENTS_HEADERS, ACTIONS_ALERTS } from "../../utils/constants";
import Loading from "../general/Loading";
import Alert from "../general/Alert";
import ClientsFilter from "./ClientsFilter";
import ClientsPagination from "./ClientsPagination";
import ClientRow from "./ClientRow";
import EditClientPopUp from "./EditClientPopUp";
import "../../styles/clients/clients.css";

const itemsPerPage = 20;

const Clients = () => {
  const { clients, loading } = useSelector((state) => state.clients);
  const [owners, setOwners] = useState([]);
  const [names, setNames] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [isPageReset, setIsPageReset] = useState(false);
  const [currentClients, setCurrentClients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [clientToEdit, setClientToEdit] = useState({});
  const [updatedClient, setUpdatedClient] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [isResetFilters, setResetFilters] = useState(false);
  const dispatch = useDispatch();
  const error = useError();

  useEffect(() => {
    console.log("useEffect1 of Clients");
    dispatch(getClients());
    if (!loading) {
      setIsLoading(false);
    }
  }, [dispatch, updatedClient]);

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

      if (
        !loading &&
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
  }, [clients, updatedClient, isResetFilters]);

  const toggleAlert = () => {
    setAlert(!alert);
    setSuccessAlert(false);
  };

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
    // if prev page
    if (pageDirection === -1) {
      if (pageNum === 1) {
        currentPageDisplay = [...clients].slice(0, itemsPerPage);
        currentPageLimit = 20;
      } else {
        currentPageDisplay = updateCurrentPage(pageIndex);
        currentPageLimit -= itemsPerPage;
      }

      // if next page
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
    if (!error) {
      setAlertText(ACTIONS_ALERTS["success"]["update"]["general"]);
      setAlert(true);
      setSuccessAlert(true);
      dispatch(clearErrors());
      setUpdatedClient(updatedClient);
      setResetFilters(true);
    }

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
        <Loading />
      ) : (
        <div id="clients-container">
          {alert && (
            <Alert
              text={alertText}
              toggleAlert={toggleAlert}
              isSuccess={successAlert}
            />
          )}
          <div className="clients-child">
            <ClientsFilter
              clients={clients}
              countries={countries}
              owners={owners}
              names={names}
              isResetFilters={isResetFilters}
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
