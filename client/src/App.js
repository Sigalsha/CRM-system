import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import clientsData from "./data.json";
// import { Provider } from "react-redux";
import { COLORS } from "./utils/constants";
// import store from "./store";
// import { loadUser } from "./actions/authActions";
// import { getClients } from "./actions/clientsActions";
// import Navbar from "./components/general/Navbar.js";
import Landing from "./components/general/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/general/Navbar";
// import Clients from "./components/clients/Clients.js";
// import Actions from "./components/actions/Actions.js";
// import Analytics from "./components/analytics/Analytics";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setClients(clientsData);
    }, 1000);
  });

  return (
    <Fragment>
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
              {/*   <Route path="/clients" exact component={Clients} />
              <Route path="/actions" exact component={Actions} />
              <Route path="/analytics" exact component={Analytics} /> */}
            </Routes>
          </Router>
        </div>
      )}
    </Fragment>
  );
}

export default App;
