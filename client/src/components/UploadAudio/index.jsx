import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../../contexts/index";
import "./style.css";

const UploadAudio = () => {
  const inputFile = useRef(null);
  const { fileURL, setFileURL } = useContext(FileContext);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      setFileURL(file);
    }
  }, [file, setFileURL]);

  const handleButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileUpload = (e) => {
    // console.log(file);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="upload-audio">
      <button className="upload-btn" onClick={handleButtonClick}>
        Upload
      </button>

      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept="audio/*"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadAudio;
