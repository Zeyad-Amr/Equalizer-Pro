import React from "react";
import AudioWaveform from "../../components/AudioWaveForm/index";
import SlidersBar from "../../components/SlidersBar";
import "./style.css";

const Body = () => {
  return (
    <div className="audioComponent">
      <AudioWaveform />
      <SlidersBar />
    </div>
  );
};

export default Body;
