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
            alt="Original Audio Spectrogram"
            height="220px"
          />
        );
      } else {
        return (
          <img
            src={`http://localhost:5000/api/spectrogram/mod`}
            alt="Modified Audio Spectrogram"
            height="220px"
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
