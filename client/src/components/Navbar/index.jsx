import React from "react";
import "./style.css";
import UploadAudio from "../UploadAudio/index";
const Navbar = () => {
  return (
    <nav>
      <div className="brand">
        <i className="material-symbols-rounded logo">equalizer</i>
        <a href="/">Equalizer Pro</a>
      </div>
      <div className="uploadBtn">
        <UploadAudio />
      </div>
    </nav>
  );
};

export default Navbar;
