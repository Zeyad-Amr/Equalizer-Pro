import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/index";
import { Container, Row, Col } from "react-bootstrap";

function ControlsBar() {
  const {
    playing,
    setPlaying,
    volume,
    setVolume,
    zoom,
    setZoom,
    wavesurferObj,
    setWavesurferObj,
    wavesurferProcessedObj,
    setWavesurferProcessedObj,
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

  // set zoom value to local state
  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  };

  ////////////////////////////////// End Handling Mehtods //////////////////////////////////

  return (
    <Container>
      <Row>
        <Col>
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
        <Col>
          <button title="reload" className="controls" onClick={handleReload}>
            <i className="material-symbols-rounded">stop_circle</i>
          </button>
        </Col>
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
        <Col>
          {volume > 0 ? (
            <i className="material-symbols-rounded">volume_up</i>
          ) : (
            <i className="material-symbols-rounded">volume_off</i>
          )}
        </Col>
        <Col>
          {" "}
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
    </Container>
  );
}

export default ControlsBar;
