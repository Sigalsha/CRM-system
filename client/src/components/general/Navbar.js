import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS_TITLES, NAV_LINKS } from "../../utils/constants";
import "../../styles/general/navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();
  const isLinkActive = (linkPath, pathname) => {
    return `${pathname === linkPath ? "nav-link nav-link-active" : "nav-link"}`;
  };

  return (
    <div id="navbar-container">
      {NAV_LINKS.map((linkPath, i) => {
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
    </div>
  );
};

export default Navbar;
