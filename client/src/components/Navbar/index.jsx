import React from "react";
import "./style.css";

const Navbar = () => {
  return (
    <nav>
      <div className="brand">
        <i className="material-symbols-rounded logo">equalizer</i>
        <a href="/">Equalizer Pro</a>
      </div>
    </nav>
  );
};

export default Navbar;
