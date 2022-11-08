import React from "react";
import AudioWaveform from "../../components/AudioWaveForm/index";
import SlidersBar from "../../components/SlidersBar";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";

const Body = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <AudioWaveform />
        </Col>
        <Col>
          <SlidersBar />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
