import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NAV_LINKS_TITLES, NAV_LINKS } from "../../utils/constants";
import "../../styles/general/navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();
  const isLinkActive = (linkPath, pathname) => {
    return `${pathname === linkPath ? "nav-link nav-link-active" : "nav-link"}`;
  };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  console.log(isAuthenticated, user, "from NAvbar");

  const authUserLink = (
    <Fragment>
      {NAV_LINKS.authUser.map((linkPath, i) => {
        return (
          <Link
            key={i}
            to={linkPath === "home" ? "/" : `/${linkPath}`}
            className={isLinkActive(linkPath, pathname)}
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
      {isAuthenticated ? authUserLink : guestLinks}
    </div>
  );
};

export default Navbar;
