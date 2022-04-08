import "./Result.css";
import { Textfit } from "react-textfit";

const Result = ({ value }) => {
  return (
    <div>
      <Textfit className="result" mode="single" max={70}>
        {value}
      </Textfit>
      <div className="bottomBorder"></div>
    </div>
  );
};

export default Result;
