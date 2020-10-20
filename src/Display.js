import React, { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

const majorPosition = {
  0: [1, 2, 3, 4, 5, 6, 7, 8],
  1: [1, 2, 3, 4, 5, 6, 7, 8],
  2: [1, 2],
};

const minorPosition = {
  0: [6, 7, 8],
  1: [1, 2, 3, 4, 5, 6, 7, 8],
  2: [1, 2, 3, 4, 5, 6, 7, 8],
};

class Display extends Component {
  state = {
    position0: { name: "major", position: majorPosition },
    position1: { name: "major", position: majorPosition },
    position2: { name: "major", position: majorPosition },
    display0: null,
    display1: null,
    display2: null,
    visible1: true,
    visible2: true,
    visible3: true,
  };

  noteInterval = null;

  start = () => {
    const { interval } = this.props;
    // kill current interval
    clearInterval(this.noteInterval);
    // create new one
    this.noteInterval = setInterval(() => {
      this.displayValues(0);
      this.displayValues(1);
      this.displayValues(2);
    }, interval * 1000);
  };

  findPosition = () => {
    const { includeMajor, includeMinor } = this.props;

    if (includeMajor && !includeMinor) {
      return { position: majorPosition, name: "major" };
    } else if (includeMinor && !includeMajor) {
      return { position: minorPosition, name: "minor" };
    }

    if (Math.random() >= 0.5) {
      return { position: majorPosition, name: "major" };
    } else {
      return { position: minorPosition, name: "minor" };
    }
  };

  findOctave = () => {
    const { includeOctave0, includeOctave1, includeOctave2 } = this.props;

    if (includeOctave0 && !includeOctave1 && !includeOctave2) {
      return 0;
    } else if (!includeOctave0 && includeOctave1 && !includeOctave2) {
      return 1;
    } else if (!includeOctave0 && !includeOctave1 && includeOctave2) {
      return 2;
    } else if (includeOctave0 && includeOctave1 && !includeOctave2) {
      return Math.random() >= 0.5 ? 0 : 1;
    } else if (includeOctave0 && !includeOctave1 && includeOctave2) {
      return Math.random() >= 0.5 ? 0 : 2;
    } else if (!includeOctave0 && includeOctave1 && includeOctave2) {
      return Math.random() >= 0.5 ? 1 : 2;
    } else {
      return Math.floor(Math.random() * 3);
    }
  };

  displayValues = (index) => {
    const positionObj = this.findPosition(index);
    const octaveIndex = this.findOctave();
    const noteLength = positionObj.position[octaveIndex].length;

    const display = {
      position: positionObj.name,
      octave: octaveIndex,
      note:
        positionObj.position[octaveIndex][
          Math.floor(Math.random() * noteLength)
        ],
    };

    this.setState({ ["display" + index]: display });
  };

  render() {
    const {
      display0,
      display1,
      display2,
      visible1,
      visible2,
      visible3,
    } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <Button onClick={this.start}>Start</Button>
          </Col>
        </Row>
        <Row>
          {display0 && (
            <Col>
              {visible1 && (
                <>
                  <h3>position: {display0.position}</h3>
                  <h3>octave: {display0.octave + 1}</h3>
                  <h3>note: {display0.note}</h3>
                </>
              )}
              <Form.Check
                onChange={(e) => {
                  this.setState({ visible1: e.target.checked });
                }}
                type="checkbox"
                label={`Show Display 1`}
                checked={visible1 === true}
              />
            </Col>
          )}
          {display1 && (
            <Col>
              {visible2 && (
                <>
                  <h3>position: {display1.position}</h3>
                  <h3>octave: {display1.octave + 1}</h3>
                  <h3>note: {display1.note}</h3>
                </>
              )}
              <Form.Check
                onChange={(e) => {
                  this.setState({ visible2: e.target.checked });
                }}
                type="checkbox"
                label={`Show Display 2`}
                checked={visible2 === true}
              />
            </Col>
          )}
          {display2 && (
            <Col>
              {visible3 && (
                <>
                  <h3>position: {display2.position}</h3>
                  <h3>octave: {display2.octave + 1}</h3>
                  <h3>note: {display2.note}</h3>
                </>
              )}
              <Form.Check
                onChange={(e) => {
                  this.setState({ visible3: e.target.checked });
                }}
                type="checkbox"
                label={`Show Display 3`}
                checked={visible3 === true}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Display;
