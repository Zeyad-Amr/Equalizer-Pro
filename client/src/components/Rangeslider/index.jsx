import React from "react";
import "./style.css";

const RangeSlider = ({ element, index, handle_on_change_slider }) => {
  return (
    <div className="middle">
      <div className="slider-container">
        <p className="slider-value">{element.value}</p>
        <input
          type={"range"}
          id="{element.id}"
          className="range-slider"
          min={element.min}
          max={element.max}
          step={element.step}
          value={element.value}
          list="tickmarks"
          onChange={(event) => handle_on_change_slider(event, index)}
        ></input>
        <p className="label">{element.label}</p>
      </div>
    </div>
  );
};

export default RangeSlider;
