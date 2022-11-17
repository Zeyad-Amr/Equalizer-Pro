import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/index";
import { Row, Col } from "react-bootstrap";
function Spectrogram() {
  const { inputFile } = useContext(AppContext);
  const getImage = () => {
    if (inputFile !== "") {
      return (
        <img
          src={`http://localhost:5000/api/spectrogram/${inputFile}`}
          alt="specto"
          width={"600px"}
        />
      );
    }
  };
  return (
    <Row>
      <Col>
        <div>{getImage()}</div>
      </Col>
      <Col>
        <div>{getImage()}</div>
      </Col>
    </Row>
  );
}

export default Spectrogram;
