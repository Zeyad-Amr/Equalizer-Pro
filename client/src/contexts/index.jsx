import React, { createContext, useState } from "react";

export const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [fileURL, setFileURL] = useState("");
  return (
    <FileContext.Provider value={{ fileURL, setFileURL }}>
      {children}
    </FileContext.Provider>
  );
};
