import Loader from "react-loader-spinner";
import { COLORS } from "../../utils/constants";

const Loading = ({ className }) => {
  return (
    <div className={className ? className : "loader-position"}>
      <Loader
        type="Puff"
        color={COLORS["primaryBlue"]}
        height={200}
        width={200}
      />
    </div>
  );
};

export default Loading;
