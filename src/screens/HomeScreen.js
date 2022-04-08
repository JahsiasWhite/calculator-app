import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col } from "react-grid-system";
import CalcButton from "../components/NumButton";
import OperatorButton from "../components/OperatorButton";
import Result from "../components/Result";
import Button from "react-bootstrap/Button";
import { List } from "react-bootstrap-icons";

export default function HomeScreen() {
  // Helps organize the different themes
  const [style, setStyle] = useState("light");
  const changeStyle = () => {
    console.log("you just clicked");
    const newTheme = style === "light" ? "dark" : "light";
    setStyle(newTheme);
  };

  // Keeps track of the current output displayed on screen
  let [result, setResult] = useState({
    value: 0,
  });

  // Keeps track of all previous entered expressions
  // Adds a new entry to the log when = is pressed
  let [log, setLog] = useState([]);

  // Used to handle the modal box that shows all logs
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Controls the styles for all components
  const styles = {
    row: {
      paddingTop: "2%",
    },
    col: {
      paddingLeft: "3%",
      paddingRight: 0,
    },
    middleCol: {
      paddingLeft: "1%",
      paddingRight: 0,
    },
  };

  // Runs when = is pressed
  const equalClick = (e) => {
    e.preventDefault();

    // Evaluates current expression
    const operation = result.value;
    const num = eval(result.value);

    // Sets the output to the answer of the entered expression
    setResult({
      value: num,
    });

    // Adds the equation to the log
    log.push(operation + "=" + num);
  };

  // Runs when a number or operator is clicked
  const numClick = (e) => {
    e.preventDefault();

    // Adds the value to the start if the current expression is nothing
    // Adds the value to the end of the expression if it isn't nothing
    var num;
    const input = e.target.innerHTML;
    if (result.value === 0) {
      num = input;
    } else {
      const r = result.value + "";
      if (r.includes(".") && input === ".") {
        console.log("Error: value already contains a decimal");
        return;
      }
      num = result.value + input;
    }

    // Adds the value pressed to the end of the expression
    setResult({
      value: num,
    });
  };

  // Runs when c is pressed
  const clearClick = (e) => {
    e.preventDefault();

    // Clears the current expression and resets it to 0
    setResult({
      value: 0,
    });
  };

  return (
    <div className="App">
      <div className="header" style={{ height: "11%" }}>
        <Dropdown>
          <Dropdown.Toggle>
            <List />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button">
              <div onClick={handleShow}>Logs</div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={changeStyle}>
                {style === "light" ? "Dark Theme" : "Light Theme"}
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Logs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ol>
              {log.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => setLog([])}>
              Clear
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div
        className={style}
        style={{
          height: "40%",
          position: "relative",
        }}
      >
        <Result value={result.value} />
      </div>
      <Container
        className={style}
        fluid
        style={{ paddingTop: "6%", paddingLeft: "2%" }}
      >
        <Row>
          <Col md={3} xs={3} style={{ paddingRight: "0%" }}>
            <CalcButton value="C" onPress={clearClick} />
          </Col>
          <Col
            offset={{ md: 6, xs: 3 }}
            md={3}
            xs={3}
            style={{ paddingLeft: "3%" }}
          >
            <OperatorButton value="*" onPress={numClick} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col md={3} xs={3} style={{ paddingRight: "0%" }}>
            <CalcButton value="7" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={styles.col}>
            <CalcButton value="8" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={styles.middleCol}>
            <CalcButton value="9" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={{ paddingLeft: "3%" }}>
            <OperatorButton value="-" onPress={numClick} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col md={3} xs={3} style={{ paddingRight: "0%" }}>
            <CalcButton value="4" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={styles.col}>
            <CalcButton value="5" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={styles.middleCol}>
            <CalcButton value="6" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={{ paddingLeft: "3%" }}>
            <OperatorButton value="+" onPress={numClick} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col md={3} xs={3} style={{ paddingRight: "0%" }}>
            <CalcButton value="1" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={styles.col}>
            <CalcButton value="2" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={styles.middleCol}>
            <CalcButton value="3" onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={{ paddingLeft: "3%" }}>
            <OperatorButton value="/" onPress={numClick} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col md={6} xs={6} style={{ paddingRight: "0%" }}>
            <CalcButton value="0" onPress={numClick} type="wide" />
          </Col>
          <Col md={3} xs={3} style={styles.middleCol}>
            <CalcButton value="." onPress={numClick} />
          </Col>
          <Col md={3} xs={3} style={{ paddingLeft: "3%" }}>
            <OperatorButton value="=" onPress={equalClick} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
