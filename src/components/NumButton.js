import Button from "react-bootstrap/Button";
import "./NumButton.css";

const CalcButton = ({ value, onPress, type }) => {
  if (!type) {
    type = "rounded-circle";
  }
  return (
    <Button
      className={type}
      style={{ color: "white", borderColor: "white" }}
      variant={type}
      onClick={onPress}
    >
      {value}
    </Button>
  );
};

export default CalcButton;
