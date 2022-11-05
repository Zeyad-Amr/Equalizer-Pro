import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../../contexts/index";
import "./style.css";
import axios from "axios";

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

  const handleFileUpload = async (e) => {
    // console.log(file);
    setFile(URL.createObjectURL(e.target.files[0]));

    const response = await axios
      .post("/upload", file)
      .then((e) => {
        console.log("Success");
      })
      .catch((e) => {
        console.log("Error", e);
      });
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
