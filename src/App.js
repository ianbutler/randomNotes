import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Display from "./Display";

class App extends Component {
  state = {
    interval: 1,
    includeMajor: true,
    includeMinor: false,
    includeOctave0: true,
    includeOctave1: true,
    includeOctave2: true,
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onChangeCheck = (e) => {
    const { name, checked } = e.target;

    this.setState({ [name]: checked });
  };

  render() {
    const {
      interval,
      includeMajor,
      includeMinor,
      includeOctave1,
      includeOctave2,
      includeOctave0,
    } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Interval"
                aria-label="Set the interval"
                aria-describedby="basic-addon2"
                type="number"
                value={interval}
                onChange={this.onChange}
                name="interval"
              />
            </InputGroup>
          </Col>
          <Col>Current interval: {interval} seconds</Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              onChange={(e) => {
                this.setState({ includeMajor: e.target.checked });
              }}
              type={"checkbox"}
              label={`Include major`}
              checked={includeMajor === true}
            />
            <Form.Check
              onChange={(e) => {
                this.setState({ includeMinor: e.target.checked });
              }}
              type="checkbox"
              label={`Include minor`}
              checked={includeMinor === true}
            />
          </Col>
          <Col>
            <Form.Check
              onChange={(e) => {
                this.setState({ includeOctave0: e.target.checked });
              }}
              type={"checkbox"}
              label={`Include octave1`}
              checked={includeOctave0 === true}
            />
            <Form.Check
              onChange={(e) => {
                this.setState({ includeOctave1: e.target.checked });
              }}
              type="checkbox"
              label={`Include octave 2`}
              checked={includeOctave1 === true}
            />
            <Form.Check
              onChange={(e) => {
                this.setState({ includeOctave2: e.target.checked });
              }}
              type="checkbox"
              label={`Include octave 3`}
              checked={includeOctave2 === true}
            />
          </Col>
        </Row>
        <Display
          interval={interval}
          includeMajor={includeMajor}
          includeMinor={includeMinor}
          includeOctave0={includeOctave0}
          includeOctave1={includeOctave1}
          includeOctave2={includeOctave2}
        />
      </Container>
    );
  }
}

export default App;
