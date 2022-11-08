import React from "react";
import "./style.css";

const RangeSlider = ({ element, index, handle_on_change_slider }) => {
  return (
    <input
      type={"range"}
      id={element.id}
      name
      className={"rangeSlider"}
      min={element.min}
      max={element.max}
      step={element.step}
      value={element.value}
      onChange={(event) => handle_on_change_slider(event, index)}
    ></input>
  );
};

export default RangeSlider;
