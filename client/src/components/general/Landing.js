import { NAV_LINKS_TITLES, NAV_LINKS, LANDING } from "../../utils/constants";
import { useAuth, useUsername } from "../../hooks/authHooks";
import LinkContainer from "../general/LinkContainer";
import "../../styles/general/landing.css";

const Landing = () => {
  const isAuthenticated = useAuth();
  const username = useUsername();
  let authUserLandingLinks = [...NAV_LINKS.authUser];
  authUserLandingLinks.shift();
  authUserLandingLinks.pop();

  const authUserLinks = (
    <>
      {authUserLandingLinks.map((linkPath, i) => {
        return <LinkWrapper linkPath={linkPath} key={i} />;
      })}
    </>
  );

  const guestUserLinks = (
    <>
      {NAV_LINKS.guestUser.map((linkPath, i) => {
        return <LinkWrapper linkPath={linkPath} key={i} />;
      })}
    </>
  );

  return (
    <div className="landing-container">
      <div className="landing-header">
        <span>{LANDING["header"]}</span>
      </div>
      {isAuthenticated && (
        <div className="landing-sub-header">
          {LANDING["subHeader"]} {username}
        </div>
      )}
      <div className="landing-links-wrapper">
        {isAuthenticated ? authUserLinks : guestUserLinks}
      </div>
    </div>
  );
};

const LinkWrapper = ({ linkPath }) => (
  <LinkContainer path={`/${linkPath}`} text={NAV_LINKS_TITLES[linkPath]} />
);

export default Landing;
