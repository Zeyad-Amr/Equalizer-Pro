import React, { createContext, useState } from "react";
import { freqModeSliders } from "../globals/constants/modesSlider";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [inputFile, setInputFile] = useState("");
  const [inputFileUrl, setInputFileUrl] = useState("");
  const [processedFileUrl, setProcessedFileUrl] = useState("");
  const [currentSlidersList, setCurrentSlidersList] = useState(freqModeSliders);
  const [currentMode, setcurrentMode] = useState(0);
  return (
    <AppContext.Provider
      value={{
        processedFileUrl,
        setProcessedFileUrl,
        inputFileUrl,
        setInputFileUrl,
        inputFile,
        setInputFile,
        currentSlidersList,
        setCurrentSlidersList,
        currentMode,
        setcurrentMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
