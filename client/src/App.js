import React, { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuth } from "./hooks/authHooks";
import { loadUser } from "./actions/authActions";
import Loading from "./components/general/Loading";
import Landing from "./components/general/Landing";
import Navbar from "./components/general/Navbar";
import Register from "./components/auth/Register";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Login from "./components/auth/Login";
import Clients from "./components/clients/Clients.js";
import Actions from "./components/actions/Actions.js";
import Analytics from "./components/analytics/Analytics";
import store from "./store";
import "./styles/app.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [errorMsg, setError] = useState(false);
  const isAuthenticated = useAuth();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      {errorMsg && <p>{errorMsg}</p>}
      {loading ? (
        <Loading className="general-loader" />
      ) : (
        <div className="app">
          <Router>
            <Navbar />
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Landing />} />
                <Route path="/actions" element={<Actions />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </div>
      )}
    </Fragment>
  );
}

export default App;
