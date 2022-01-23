import React, { useState, useEffect, Fragment } from "react";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { getClients, updateClient } from "../../actions/clientsActions";
import utils from "../../utils/utils";
import { URL, COLORS } from "../../utils/constants";
import "../../styles/clients/clients.css";
import ColumnsHeader from "./ColumnsHeader";
import ClientsFilter from "./ClientsFilter";
import ClientsPagination from "./ClientsPagination";
import ClientRow from "./ClientRow";
import EditClientPopUp from "./EditClientPopUp";
import UpdateClient from "../actions/UpdateClient";
import ClientData from "./ClientData";
import { EMAIL_TYPES, IS_SOLD, CLIENTS_HEADERS } from "../../utils/constants";

const itemsPerPage = 20;

const Clients2 = () => {
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

      setPageCount(updatePageCount(clients.length));
      // check this out
      // setIsPageReset(true);
      console.log("useEffect of Clients");

      if (
        loading &&
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
              /* clientsToDisplay={clientsToDisplay} */
              /* toggleEditClient={toggleEditClient}
                itemsPerPage={itemsPerPage} */
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Clients2;
