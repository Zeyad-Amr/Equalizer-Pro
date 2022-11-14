import React from "react";
import AudioWaveform from "../../components/AudioWaveForm/index";
import SlidersBar from "../../components/SlidersBar";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import ModesTabs from "../../components/ModesTabs";
const Body = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <AudioWaveform />
        </Col>
        <Col>
          <ModesTabs />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
