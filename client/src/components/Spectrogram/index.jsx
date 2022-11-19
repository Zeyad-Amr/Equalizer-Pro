import React, { useContext } from "react";
import { AppContext } from "../../contexts/index";
import { Col } from "react-bootstrap";

function Spectrogram() {
  const { modifiedSpectrogram, originalSpectrogram } = useContext(AppContext);
  const getImage = (props) => {
    if (originalSpectrogram && modifiedSpectrogram) {
      if (props.mod !== true) {
        return (
          <img
            src={originalSpectrogram}
            alt="Original Audio Spectrogram"
            height="220px"
          />
        );
      } else {
        return (
          <img
            src={modifiedSpectrogram}
            alt="Modified Audio Spectrogram"
            height="220px"
          />
        );
      }
    }
  };
  return (
    <Col>
      <div>{getImage({ mod: false })}</div>

      <div>{getImage({ mod: true })}</div>
    </Col>
  );
}

export default Spectrogram;
