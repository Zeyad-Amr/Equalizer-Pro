import axios from "../../globals/API/axios";
import React, { useState } from "react";
import "./style.css";

export const FileUploader = ({}) => {
  const [file, setFile] = useState(null);
  // on upload audio
  // TODO: send audio to backend for processing
  const onInputChange = async (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);

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
    <div className="form-group files">
      <input type="file" onChange={onInputChange} />
    </div>
  );
};
