import React, { useState, useEffect } from "react";
import "./style.css";
import { musicModeSliders } from "../../globals/constants/modesSlider";
import RangeSlider from "../RangeSlider/index";
const SlidersBar = () => {
  // use state for sliders list
  const [slidersList, setSlidersList] = useState([]);

  // init sliders list
  useEffect(() => {
    setSlidersList(musicModeSliders);
  }, []);

  // onchange slider values handling
  const handle_on_change_slider = (event, index) => {
    // cloning tbe slider list
    const newSliderList = [...slidersList];
    // changing slider value by index
    newSliderList[index].value = event.target.value;
    // setting the new  value to local state
    setSlidersList(newSliderList);
  };
  return (
    <div>
      {slidersList.map((element, index) => {
        return (
          <RangeSlider
            element={element}
            index={index}
            handle_on_change_slider={handle_on_change_slider}
          />
        );
      })}
    </div>
  );
};

export default SlidersBar;
