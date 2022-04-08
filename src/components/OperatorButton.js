import Button from "react-bootstrap/Button";
import "./OperatorButton.css";

const OperatorButton = ({ value, onPress }) => {
  return (
    <Button
      className="rounded-circle"
      style={{
        color: "black",
        borderColor: "#e4c54c",
        backgroundColor: "#e4c54c",
      }}
      variant="operator"
      onClick={onPress}
    >
      {value}
    </Button>
  );
};

export default OperatorButton;
