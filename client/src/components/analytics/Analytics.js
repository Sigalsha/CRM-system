import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  faUsers,
  faEnvelope,
  faUserPlus,
  faGlobeAmericas
} from "@fortawesome/free-solid-svg-icons";
import utils from "../../utils/utils";
import { getClients } from "../../actions/clientsActions";
import Loading from "../general/Loading";
import TopEmployees from "./charts/TopEmployees";
import SalesByMonth from "./charts/SalesByMonth";
import ClientAcquisition from "./charts/ClientAcquisition";
import SalesByCategory from "./charts/SalesByCategory";
import Badges from "./Badges";
import "../../styles/analytics/analytics.css";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const clients = useSelector((state) => state.clients.clients);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setHasError(false);
      try {
        dispatch(getClients());
        console.log("useEffect of getClient in Analytics");
      } catch (err) {
        setHasError(true);
        console.log(err);
      }
    };
    fetchData();
    setLoading(false);
  }, [getClients]);

  const getBadges = () => {
    console.log(clients);
    return [
      {
        id: 1,
        name: "longTimeClients",
        icon: faUsers,
        header: "Long-time Clients",
        description: "Clients who joined before 2018",
        result: clients.filter((c) => utils.isFrom2018(c.firstContact, true))
          .length
      },
      {
        id: 2,
        name: "emailsSent",
        icon: faEnvelope,
        header: "Emails Sent",
        description: "Number of emails sent in total",
        result: clients.filter((c) => c.emailType !== null).length
      },
      {
        id: 3,
        name: "targetClients",
        icon: faUserPlus,
        header: "Target Clients",
        description: "Clients without acquisition",
        result: utils.getSales(clients, false).length
      },
      {
        id: 4,
        name: "hottestCountry",
        icon: faGlobeAmericas,
        header: "Hottest Country",
        description: "Country with highest sales",
        result: utils.getTopSalesByKey(
          utils.getSalesByProperty("country", clients)
        )
      }
    ];
  };

  const getSalesOf2018 = () =>
    utils
      .getSales(clients, true)
      .filter((c) => utils.isFrom2018(c.firstContact, false));

  const getSalesByYear = () =>
    utils.getSales(clients, true).map((c) => c.firstContact.slice(0, 4));

  const getSalesByClientsCategory = (clientsByCategory) => {
    const data = [];
    for (const [key, value] of Object.entries(clientsByCategory)) {
      data.push({
        name: key,
        sales: value
      });
    }
    return data;
  };

  return (
    <>
      {hasError && <p>Something went wrong.</p>}
      {loading ? (
        <Loading />
      ) : (
        <div id="analytics-container">
          <Badges badges={getBadges()} />
          <div className="charts-container">
            <TopEmployees
              owners={utils.countSalesByKey(
                utils.getSalesByProperty("owner", clients)
              )}
              getOwners={getSalesByClientsCategory}
            />
            <SalesByMonth sales={getSalesOf2018()} />
            <SalesByCategory
              clients={clients}
              owners={utils.countSalesByKey(
                utils.getSalesByProperty("owner", clients)
              )}
              getSalesByCategory={getSalesByClientsCategory}
              countries={utils.countSalesByKey(
                utils.getSalesByProperty("country", clients)
              )}
              emailTypes={utils.countSalesByKey(
                utils.getSalesByProperty("emailType", clients)
              )}
              years={utils.countSalesByKey(getSalesByYear())}
            />
            <ClientAcquisition
              sales={utils.getSales(clients, true)}
              salesOf2018={getSalesOf2018}
              years={utils.countSalesByKey(getSalesByYear())}
              getSalesByCategory={getSalesByClientsCategory}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
