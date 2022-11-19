import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../../contexts/index";
import "./style.css";
import axios from "../../globals/API/axios";

const UploadAudio = () => {
  const inputFileRef = useRef(null);
  const {
    setInputFileUrl,
    setProcessedFileUrl,
    currentSlidersList,
    setInputFile,
    setLoading,
  } = useContext(AppContext);

  const [file, setFile] = useState();

  useEffect(() => {
    if (file) {
      setInputFileUrl(URL.createObjectURL(file));
      setProcessedFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  // normalizing the sliders values
  function get_values() {
    const values = [];
    currentSlidersList.forEach((e) => {
      values.push(e.value);
    });
    return values;
  }
  // force input clicking
  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  // handle on upload file
  const handleFileUpload = async (e) => {
    let inputFile = e.target.files[0];
    if (inputFile) {
      setLoading(true);
      let inputFile = e.target.files[0];
      const formData = new FormData();
      const values = get_values();

      formData.append("file", inputFile);
      formData.append("values", values);
      setInputFile(inputFile.name);

      await axios
        .post("/upload", formData)
        .then((res) => {
          setFile(inputFile);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="upload-audio">
      <button
        variant="primary"
        className="upload-btn upload"
        onClick={handleButtonClick}
      >
        Upload
      </button>

      <input
        type="file"
        accept="audio/*"
        id="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadAudio;
