import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/index";
import { Row, Col } from "react-bootstrap";
function Spectrogram() {
  const { inputFile } = useContext(AppContext);
  const getImage = (props) => {
    if (inputFile !== "") {
      if (props.mod !== true) {
        return (
          <img
            src={`http://localhost:5000/api/spectrogram/${inputFile}`}
            alt="specto"
            height="250px"
          />
        );
      } else {
        return (
          <img
            src={`http://localhost:5000/api/spectrogram/mod`}
            alt="specto"
            height="250px"
          />
        );
      }
    }
  };
  return (
    <Col>
      <div>{getImage({ mod: "false" })}</div>

      <div>{getImage({ mod: "true" })}</div>
    </Col>
  );
}

export default Spectrogram;
