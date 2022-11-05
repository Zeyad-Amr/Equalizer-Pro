import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../../contexts/index";
import "./style.css";
import axios from "../../globals/API/axios";

const UploadAudio = () => {
  const inputFileRef = useRef(null);
  const { setInputFileUrl, setProcessedFileUrl } = useContext(FileContext);

  const [file, setFile] = useState();

  useEffect(() => {
    if (file) {
      setInputFileUrl(URL.createObjectURL(file));
      // setProcessedFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  const handleFileUpload = async (e) => {
    setFile(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const response = await axios
      .post("/upload", formData)
      .then((response) => {
        console.log("Success");
        console.log(response);
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
        ref={inputFileRef}
        style={{ display: "none" }}
        accept="audio/*"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadAudio;
