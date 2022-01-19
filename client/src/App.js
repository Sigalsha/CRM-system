import React, { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import store from "./store";
import Loader from "react-loader-spinner";
import { COLORS } from "./utils/constants";
import { loadUser } from "./actions/authActions";
import Landing from "./components/general/Landing";
import Register from "./components/auth/Register";
import { useAuth } from "./components/auth/AuthHooks";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Login from "./components/auth/Login";
import Navbar from "./components/general/Navbar";
import Clients from "./components/clients/Clients.js";
import Actions from "./components/actions/Actions.js";
import Analytics from "./components/analytics/Analytics";
import "./styles/app.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [errorMsg, setError] = useState(false);
  const isAuthenticated = useAuth();
  // const dispatch = useDispatch();
  // const error = useSelector((state) => state.error);
  // const isAuthenticated = useSelector((state) => state.isAuthenticated);

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
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Landing />} />
                <Route path="/actions" element={<Actions />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
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
