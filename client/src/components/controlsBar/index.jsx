import React, { useContext } from "react";
import { AppContext } from "../../contexts/index";
import { Container, Row, Col } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "../../globals/API/axios";
import "./style.css";

function ControlsBar() {
  const {
    playing,
    setPlaying,
    volume,
    setVolume,
    setMuteOriginal,
    setShowSpectro,
    showSpectro,
    currentSlidersList,
    currentMode,
    zoom,
    setSpeed,
    setZoom,
    wavesurferObj,
    wavesurferProcessedObj,
    setProcessedFileUrl,
    inputFile,
    modifiedSpectrogram,
    setModifiedSpectrogram,
    originalSpectrogram,
    setOriginalSpectrogram,
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
  const handleSkipNext = (e) => {
    wavesurferObj.skipForward();
    wavesurferProcessedObj.skipForward();
  };

  // set volume value to local state
  const handleSkipPrevious = (e) => {
    wavesurferObj.skipBackward();
    wavesurferProcessedObj.skipBackward();
  };

  // set volume value to local state
  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  };

  // set speed value to local state
  const handleSpeedSlider = (e) => {
    setSpeed(e.target.value);
  };

  // set zoom value to local state
  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  };

  const toggleMuteOriginal = (checked) => {
    setMuteOriginal(!checked);
  };

  const toggleSpectroShow = async (checked) => {
    setModifiedSpectrogram("");
    setShowSpectro(checked);
    await axios
      .get(`/spectrogram/${inputFile.split(".")[0]}`)
      .then((res) => {
        setOriginalSpectrogram(
          `http://localhost:5000/api/spectrogram/${inputFile.split(".")[0]}`
        );
      })
      .catch((e) => {});

    await axios
      .get("/spectrogram/mod")
      .then((res) => {
        setModifiedSpectrogram(`http://localhost:5000/api/spectrogram/mod`);
      })
      .catch((e) => {});
  };

  const handleButtonClick = async (e) => {
    const formData = new FormData();
    const values = get_values();

    formData.append("values", values);

    console.log(currentMode);
    console.log(values);

    await axios
      .post(`/file/${inputFile}`, { mode: currentMode, values: values })
      .then((res) => {
        console.log(res.data);
        setProcessedFileUrl("");
        setProcessedFileUrl(res.data.file_url);
      })
      .then((res) => {});

    setModifiedSpectrogram("");
    await axios
      .get(`/spectrogram/${inputFile.split(".")[0]}`)
      .then((res) => {
        setOriginalSpectrogram(
          `http://localhost:5000/api/spectrogram/${inputFile.split(".")[0]}`
        );
      })
      .catch((e) => {});

    await axios
      .get("/spectrogram/mod")
      .then((res) => {
        setModifiedSpectrogram(`http://localhost:5000/api/spectrogram/mod`);
      })
      .catch((e) => {});
  };

  // normalizing the sliders values
  function get_values() {
    const values = [];
    currentSlidersList.forEach((e) => {
      values.push(e.value);
    });
    console.log(values);
    return values;
  }

  ////////////////////////////////// End Handling Mehtods //////////////////////////////////

  return (
    <Container fluid className="p-12">
      <Row
        className={"align-items-center"}
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <Col></Col>
        <Row>
          <Col>
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
        </Row>
        <Row>
          <Col>
            <button
              title="skip_previous"
              className="controls"
              onClick={handleSkipPrevious}
            >
              <i className="material-symbols-rounded">skip_previous</i>
            </button>
          </Col>
          <Col>
            <button
              title="skip_next"
              className="controls"
              onClick={handleSkipNext}
            >
              <i className="material-symbols-rounded">skip_next</i>
            </button>
          </Col>
        </Row>
        <Col></Col>
        <Row>
          <Col>
            <i className="material-symbols-rounded  zoom-icon">remove_circle</i>
          </Col>
          <Col>
            <input
              type="range"
              min="1"
              max="4000"
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

        <Col></Col>

        <Row className={"align-items-center"}>
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
          <Col>
            <BootstrapSwitchButton
              onstyle="outline-primary"
              offstyle="outline-secondary"
              offlabel="Original"
              onlabel="Modified"
              width="100"
              onChange={toggleMuteOriginal}
            />
          </Col>
        </Row>

        <Col></Col>
        <Row>
          <Col>
            <select name="speed" id="speed" onChange={handleSpeedSlider}>
              <option value="0.25">x0.25</option>
              <option value="0.5">x0.5</option>
              <option value="0.75">x0.75</option>
              <option value="1" selected={true}>
                x1
              </option>
              <option value="1.25">x1.25</option>
              <option value="1.5">x1.5</option>
              <option value="1.75">x1.75</option>
              <option value="2">x2</option>
            </select>
          </Col>
        </Row>
        <Col></Col>

        <button className="upload-btn upload" onClick={handleButtonClick}>
          Process
        </button>
        <Col></Col>

        <Col>
          <BootstrapSwitchButton
            onstyle="outline-primary"
            offstyle="outline-secondary"
            offlabel="Hide Spectrogram"
            onlabel="Show Spectrogram"
            width="200"
            checked={showSpectro}
            onChange={toggleSpectroShow}
          />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default ControlsBar;
