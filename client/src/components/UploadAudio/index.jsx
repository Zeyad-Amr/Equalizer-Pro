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
    }
  }, [file]);

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    console.log(formData);
    // console.log(e.target.files[0]);

    const response = await axios
      .post("/upload", formData)
      .then((response) => {
        console.log("Success");
        console.log(response);
        setFile(e.target.files[0]);
        setProcessedFileUrl(response.data.file_url);

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
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadAudio;
