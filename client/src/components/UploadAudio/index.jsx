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
    console.log("new file" + file);
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
  // const handleEditButtonClick = async () => {
  //   const formData = new FormData();
  //   const values = get_values();
  //   console.log(values);
  //   formData.append("values", values);
  //   try {
  //     const response = await axios.post(`/file/${file.name}`, formData);
  //     setProcessedFileUrl(`http://localhost:5000/api/file/${file.name}`);
  //     console.log(response);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  // handle on upload file
  const handleFileUpload = async (e) => {
    const formData = new FormData();
<<<<<<< HEAD
    console.log(URL.createObjectURL(e.target.files[0]));
    
=======

>>>>>>> 4cb88b15f78992a49f11e29765a4be9ad08108a5
    const values = get_values();
    console.log(values);

    formData.append("file", e.target.files[0]);
    formData.append("values", values);

    const response = await axios
      .post("/upload", formData)
      .then((res) => {
        console.log("Success");
        console.log(e.target.files[0].name);
        setFile(e.target.files[0]);
        setProcessedFileUrl(res.data.file_url);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  return (
    <div className="upload-audio">
      <button className="upload-btn upload" onClick={handleButtonClick}>
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
