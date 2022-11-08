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
  } = useContext(AppContext);

  const [file, setFile] = useState();

  useEffect(() => {
    if (file) {
      setInputFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  // normalizing the sliders values
  function get_values() {
    const values = [];
    currentSlidersList.map((e) => {
      if (parseInt(e.value) <= 50 && parseInt(e.value) >= 1) {
        values.push(0.98 * parseInt(e.value) + 1);
      } else {
        values.push(0.02 * parseInt(e.value) + 1);
      }
    });
    return values;
  }
  // force input clicking
  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  // handle on upload file
  const handleFileUpload = async (e) => {
    const formData = new FormData();

    const values = get_values();
    console.log(values);

    formData.append("file", e.target.files[0]);
    formData.append("values", values);

    const response = await axios
      .post("/upload", formData)
      .then((res) => {
        console.log("Success");
        setFile(e.target.files[0]);
        setProcessedFileUrl(res.data.file_url);
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
