import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NAV_LINKS_TITLES, NAV_LINKS } from "../../utils/constants";
import { useAuth } from "../auth/useAuth";
import LinkContainer from "../general/LinkContainer";
import "../../styles/general/landing.css";

const Landing = () => {
  const isAuthenticated = useAuth();
  const user = useSelector((state) => state.auth.user);
  let authUserLandingLinks = [...NAV_LINKS.authUser];
  authUserLandingLinks.shift();
  authUserLandingLinks.pop();

  const authUserLinks = (
    <Fragment>
      {authUserLandingLinks.map((linkPath, i) => {
        return (
          <LinkContainer
            key={i}
            path={`/${linkPath}`}
            text={NAV_LINKS_TITLES[linkPath]}
          ></LinkContainer>
        );
      })}
    </Fragment>
  );

  const guestUserLinks = (
    <Fragment>
      {NAV_LINKS.guestUser.map((linkPath, i) => {
        return (
          <LinkContainer
            key={i}
            path={`/${linkPath}`}
            text={NAV_LINKS_TITLES[linkPath]}
          ></LinkContainer>
        );
      })}
    </Fragment>
  );

  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>CRM - manage your success</span>
      </div>

      {isAuthenticated && <p>Welcome {user.name}</p>}
      <div className="landing-links-wrapper">
        {isAuthenticated ? authUserLinks : guestUserLinks}
      </div>
    </div>
  );
};

export default Landing;
