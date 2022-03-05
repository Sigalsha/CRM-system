import { Link } from "react-router-dom";

const LinkContainer = ({ path, text, isLanding }) => {
  return (
    <Link
      to={path}
      className={`link-square ${isLanding ? "landing-link" : "auth-link"}`}
    >
      <span className="single-link">{text}</span>
    </Link>
  );
};

export default LinkContainer;
