import React from "react";
import AudioWaveform from "../../components/AudioWaveForm/index";
import UploadAudio from "../../components/UploadAudio/index";
import "./style.css";

const Body = () => {
  return (
    <div className="audioComponent">
      <AudioWaveform />
    </div>
  );
};

export default Body;
