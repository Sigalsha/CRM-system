import React, { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import store from "./store";
import Loader from "react-loader-spinner";
import clientsData from "./data.json";
// import { Provider } from "react-redux";
import { COLORS } from "./utils/constants";
import { loadUser } from "./actions/authActions";
// import { getClients } from "./actions/clientsActions";
// import Navbar from "./components/general/Navbar.js";
import Landing from "./components/general/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/general/Navbar";
import Clients from "./components/clients/Clients.js";
import Actions from "./components/actions/Actions.js";
import Analytics from "./components/analytics/Analytics";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [errorMsg, setError] = useState(false);
  // const dispatch = useDispatch();
  // const error = useSelector((state) => state.error);
  // const isAuthenticated = useSelector((state) => state.isAuthenticated);

  /*   useEffect(() => {
    store.dispatch(loadUser());
  }, []); */
  /*   useEffect(() => {
    // change it to server and auth redux
    setTimeout(() => {
      setLoading(false);
      setClients(clientsData);
    }, 1000);
  }, []); */

  useEffect(() => {
    store.dispatch(loadUser());

    /*  if (error) {
      setError(error.msg.msg);
      console.log(error.msg.msg);
    }
    if (!isAuthenticated) {
      alert("user load fail");
    } else {
      alert("user is logged in");
    } */
  }, []);

  return (
    <Fragment>
      {errorMsg && <p>{errorMsg}</p>}
      {loading ? (
        <div id="general-loader">
          <Loader
            type="Puff"
            color={COLORS["yellow"]}
            height={200}
            width={200}
          />
        </div>
      ) : (
        <div className="app">
          <Router>
            <div className="general">
              <Navbar />
            </div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/actions" element={<Actions />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </div>
      )}
    </Fragment>
  );
}

export default App;
