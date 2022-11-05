import React, { createContext, useState } from "react";

export const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [inputFileUrl, setInputFileUrl] = useState("");
  const [processedFileUrl, setProcessedFileUrl] = useState("");
  return (
    <FileContext.Provider
      value={{
        processedFileUrl,
        setProcessedFileUrl,
        inputFileUrl,
        setInputFileUrl,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
