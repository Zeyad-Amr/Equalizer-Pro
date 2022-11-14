import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import {
  musicModeSliders,
  freqModeSliders,
  vowelsModeSliders,
} from "../../globals/constants/modesSlider";
import RangeSlider from "../Rangeslider/index";
import { AppContext } from "../../contexts/index";
const SlidersBar = () => {
  // init context value
  const { currentMode, currentSlidersList, setCurrentSlidersList } = useContext(
    AppContext
  );

  // init sliders list
  // according to the current mode
  useEffect(() => {
    if (currentMode === 0) {
      const values = [];
      freqModeSliders.map((e) => {
        e.value = 0;
        values.push(e);
      });
      setCurrentSlidersList(values);
    } else if (currentMode === 1) {
      const values = [];
      vowelsModeSliders.map((e) => {
        e.value = 0;
        values.push(e);
      });
      setCurrentSlidersList([...vowelsModeSliders]);
    } else if (currentMode === 2) {
      const values = [];
      musicModeSliders.map((e) => {
        e.value = 0;
        values.push(e);
      });
      setCurrentSlidersList([...musicModeSliders]);
    }
  }, [currentMode]);

  // onchange slider values handling
  const handle_on_change_slider = (event, index) => {
    // cloning tbe slider list
    const newSliderList = [...currentSlidersList];

    // changing slider value by index
    newSliderList[index].value = event.target.value;

    // // setting the new  value to local state
    // setCurrentSlidersList(newSliderList);

    //setting the new value to global state
    setCurrentSlidersList([...newSliderList]);
  };

  return (
    <div className="sliders-bar">
      {currentSlidersList.map((element, index) => {
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
