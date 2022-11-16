import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/index";

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
    } else {
      return <p>Null</p>;
    }
  };
  return <div>{getImage()}</div>;
}

export default Spectrogram;
