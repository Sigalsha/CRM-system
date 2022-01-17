import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NAV_LINKS_TITLES, NAV_LINKS } from "../../utils/constants";
import { logout } from "../../actions/authActions";
import { useAuth } from "../auth/useAuth";
import "../../styles/general/navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();
  const isLinkActive = (linkPath, pathname) => {
    return `${pathname === linkPath ? "nav-link nav-link-active" : "nav-link"}`;
  };
  const isAuthenticated = useAuth();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(isAuthenticated, user, "from NAvbar");

  const logoutClicked = () => {
    dispatch(logout());
    navigate("/login");
  };

  const authUserLinks = (
    <Fragment>
      {NAV_LINKS.authUser.map((linkPath, i) => {
        return (
          <Link
            key={i}
            to={linkPath === "home" ? "/" : `/${linkPath}`}
            className={isLinkActive(linkPath, pathname)}
            onClick={linkPath === "logout" ? logoutClicked : null}
          >
            {NAV_LINKS_TITLES[linkPath]}
          </Link>
        );
      })}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {NAV_LINKS.guestUser.map((linkPath, i) => {
        return (
          <Link
            key={i}
            to={`/${linkPath}`}
            className={isLinkActive(linkPath, pathname)}
          >
            {NAV_LINKS_TITLES[linkPath]}
          </Link>
        );
      })}
    </Fragment>
  );

  return (
    <div id="navbar-container">
      {isAuthenticated && <p>Welcome {user.name}</p>}
      {isAuthenticated ? authUserLinks : guestLinks}
    </div>
  );
};

export default Navbar;
