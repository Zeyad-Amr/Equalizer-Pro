import React, { useContext } from "react";
import AudioWaveform from "../../components/AudioWaveForm/index";
import Spectrogram from "../../components/Spectrogram/index";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import ModesTabs from "../../components/ModesTabs";
import ControlsBar from "../../components/controlsBar";
import { AppContext } from "../../contexts/index";
import UploadAudio from "../../components/UploadAudio/index";
const Body = () => {
  const { showSpectro } = useContext(AppContext);
  return (
    <Container fluid>
      <Row>
        <Col xs={1}>
          <div className="uploadBtn">
            <UploadAudio />
          </div>
        </Col>
        <Col xs={!showSpectro ? 7 : 11}>
          <AudioWaveform />
        </Col>
        <Col
          xs={!showSpectro ? 0 : 3}
          style={{ display: !showSpectro ? "block" : "none" }}
        >
          <Spectrogram />
        </Col>
      </Row>
      <br />
      <Row>
        <ControlsBar />
      </Row>
      <br />
      <Row>
        <Col>
          <ModesTabs />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
