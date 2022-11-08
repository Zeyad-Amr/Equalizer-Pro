import React from "react";
import "./style.css";

const RangeSlider = ({ element, index, handle_on_change_slider }) => {
  return (
    <div className="middle">
      <div className="slider-container">
        <span className="bar">
          <span className="fill"></span>
        </span>
        <input
          type={"range"}
          id="{element.id}"
          className="range-slider"
          name
          min={element.min}
          max={element.max}
          step={element.step}
          value={element.value}
          onChange={(event) => handle_on_change_slider(event, index)}
        ></input>
      </div>
    </div>
  );
};

export default RangeSlider;
