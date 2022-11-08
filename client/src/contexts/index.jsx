import React, { createContext, useState } from "react";

export const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [inputFileUrl, setInputFileUrl] = useState("");
  const [processedFileUrl, setProcessedFileUrl] = useState("");
  const [currentSlidersList, setCurrentSlidersList] = useState([]);
  const [currentMode, setcurrentMode] = useState(0);
  return (
    <FileContext.Provider
      value={{
        processedFileUrl,
        setProcessedFileUrl,
        inputFileUrl,
        setInputFileUrl,
        currentSlidersList,
        setCurrentSlidersList,
        currentMode,
        setcurrentMode,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
