import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/index";
import { Container, Row, Col } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import "./style.css";

function ControlsBar() {
  const {
    playing,
    setPlaying,
    volume,
    setVolume,
    volume2,
    setVolume2,
    zoom,
    speed,
    setSpeed,
    setZoom,
    wavesurferObj,
    wavesurferProcessedObj,
  } = useContext(AppContext);

  ////////////////////////////////// Start Handling Mehtods //////////////////////////////////

  // play/pause waveform on pressing play/pause button
  const handlePlayPause = (e) => {
    wavesurferObj.playPause();
    wavesurferProcessedObj.playPause();
    setPlaying(!playing);
  };

  // reload waveform on pressing reload button
  const handleReload = (e) => {
    // stop will return the audio to 0s
    wavesurferObj.stop();
    wavesurferProcessedObj.stop();

    // to toggle the play/pause button icon
    setPlaying(false);
  };

  // set volume value to local state
  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  };

  // set volume value to local state
  const handleVolume2Slider = (e) => {
    setVolume2(e.target.value);
  };

  // set speed value to local state
  const handleSpeedSlider = (e) => {
    setSpeed(e.target.value);
  };

  // set zoom value to local state
  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  };

  ////////////////////////////////// End Handling Mehtods //////////////////////////////////

  return (
    <Container fluid className="p-12">
      <Row>
        <Col xs={1}>
          {" "}
          <button
            title="play/pause"
            className="controls"
            onClick={handlePlayPause}
          >
            {playing ? (
              <i className="material-symbols-rounded">pause_circle</i>
            ) : (
              <i className="material-symbols-rounded">play_circle</i>
            )}
          </button>
        </Col>
        <Col xs={1}>
          <button title="reload" className="controls" onClick={handleReload}>
            <i className="material-symbols-rounded">stop_circle</i>
          </button>
        </Col>
        <Col xs={1}></Col>

        <Row xs={4}>
          <Col>
            <i className="material-symbols-rounded  zoom-icon">remove_circle</i>
          </Col>
          <Col>
            <input
              type="range"
              min="1"
              max="1000"
              value={zoom}
              step="10"
              onChange={handleZoomSlider}
              class="slider zoom-slider"
            />
          </Col>
          <Col>
            <i className="material-symbols-rounded  zoom-icon">add_circle</i>
          </Col>
        </Row>

        <Col xs={0.5}></Col>
        <Row>
          <Col>
            {volume > 0 ? (
              <i className="material-symbols-rounded">volume_up</i>
            ) : (
              <i className="material-symbols-rounded">volume_off</i>
            )}
          </Col>
          <Col>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeSlider}
              className="slider volume-slider"
            />
          </Col>
        </Row>

        <Col></Col>
        <Row>
          <Col>
            <select name="speed" id="speed" onChange={handleSpeedSlider}>
              <option value="x0.25">x0.25</option>
              <option value="x0.5">x0.5</option>
              <option value="x0.75">x0.75</option>
              <option value="x1" selected={true}>
                x1
              </option>
              <option value="x1.25">x1.25</option>
              <option value="x1.5">x1.5</option>
              <option value="x1.75">x1.75</option>
              <option value="x2">x2</option>
            </select>
          </Col>
        </Row>
        <Col>
          <BootstrapSwitchButton
            checked={true}
            onstyle="outline-primary"
            offstyle="outline-secondary"
            onlabel="Orignal"
            offlabel="Modified"
            width="100"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ControlsBar;
