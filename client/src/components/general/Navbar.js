import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../utils/constants";
import "../../styles/general/navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();
  const isLinkActive = (linkPath, pathname) => {
    return `${pathname === linkPath ? "nav-link nav-link-active" : "nav-link"}`;
  };

  return (
    <div id="navbar-container">
      <Link to="/" className={isLinkActive("/", pathname)}>
        {NAV_LINKS["home"]}
      </Link>
      <Link to="/clients" className={isLinkActive("/clients", pathname)}>
        {NAV_LINKS["clients"]}
      </Link>
      <Link to="/actions" className={isLinkActive("/actions", pathname)}>
        {NAV_LINKS["actions"]}
      </Link>
      <Link to="/analytics" className={isLinkActive("/analytics", pathname)}>
        {NAV_LINKS["analytics"]}
      </Link>
      <Link to="/logout" className={isLinkActive("/logout", pathname)}>
        {NAV_LINKS["logout"]}
      </Link>
    </div>
  );
};

export default Navbar;
