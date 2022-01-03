import React from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../utils/consts";
// import { clearErrors } from "../../actions/errorActions";
import "../../styles/general/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>CRM - manage your success</span>
      </div>
      <div className="landing-links-wrapper">
        {/*       <LinkContainer path={"/clients"} text={NAV_LINKS["clients"]} />
          <LinkContainer path={"/actions"} text={NAV_LINKS["actions"]} />
          <LinkContainer path={"/analytics"} text={NAV_LINKS["analytics"]} /> */}
        <LinkContainer path={"/register"} text={NAV_LINKS["register"]} />
        <LinkContainer path={"/login"} text={NAV_LINKS["login"]} />
      </div>
    </div>
  );
};

const LinkContainer = ({ path, text }) => {
  return (
    <Link to={path} className="link-square">
      <span className="single-link">{text}</span>
    </Link>
  );
};

export default Landing;
