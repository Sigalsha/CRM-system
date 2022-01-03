import React from "react";
import { NAV_LINKS_TITLES } from "../../utils/constants";
import LinkContainer from "../general/LinkContainer";
// import { clearErrors } from "../../actions/errorActions";
import "../../styles/general/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>CRM - manage your success</span>
      </div>
      <div className="landing-links-wrapper">
        {/*       <LinkContainer path={"/clients"} text={NAV_LINKS_TITLES["clients"]} />
          <LinkContainer path={"/actions"} text={NAV_LINKS_TITLES["actions"]} />
          <LinkContainer path={"/analytics"} text={NAV_LINKS_TITLES["analytics"]} /> */}
        <LinkContainer path={"/register"} text={NAV_LINKS_TITLES["register"]} />
        <LinkContainer path={"/login"} text={NAV_LINKS_TITLES["login"]} />
      </div>
    </div>
  );
};

export default Landing;
