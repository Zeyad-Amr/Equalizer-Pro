import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import {
  musicModeSliders,
  freqModeSliders,
  vowelsModeSliders,
} from "../../globals/constants/modesSlider";
import RangeSlider from "../RangeSlider/index";
import { AppContext } from "../../contexts/index";
const SlidersBar = () => {
  // init use state for sliders list
  const [slidersList, setSlidersList] = useState([]);

  // init context value
  const { currentMode, setCurrentSlidersList } = useContext(AppContext);

  // init sliders list
  // according to the current mode
  useEffect(() => {
    if (currentMode == 0) {
      setSlidersList(freqModeSliders);
    } else if (currentMode == 1) {
      setSlidersList(vowelsModeSliders);
    } else if (currentMode == 2) {
      setSlidersList(musicModeSliders);
    }
  }, []);

  // onchange slider values handling
  const handle_on_change_slider = (event, index) => {
    // cloning tbe slider list
    const newSliderList = [...slidersList];

    // changing slider value by index
    newSliderList[index].value = event.target.value;

    // setting the new  value to local state
    setSlidersList(newSliderList);

    //setting the new value to global state
    setCurrentSlidersList(newSliderList);
  };

  return (
    <div className="sliders-bar">
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
