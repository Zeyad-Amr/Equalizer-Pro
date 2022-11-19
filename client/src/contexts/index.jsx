import React, { createContext, useState } from "react";
import { freqModeSliders } from "../globals/constants/modesSlider";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [inputFile, setInputFile] = useState("");
  const [inputFileUrl, setInputFileUrl] = useState("");
  const [processedFileUrl, setProcessedFileUrl] = useState("");
  const [currentSlidersList, setCurrentSlidersList] = useState(freqModeSliders);
  const [currentMode, setcurrentMode] = useState(0);

  // to keep track whether audio is currently playing or not
  const [playing, setPlaying] = useState(false);

  // to control volume level of the audio. 0-mute, 1-max
  const [volume, setVolume] = useState(1);

  // to control volume level of the audio. 0-mute, 1-max
  const [muteOriginal, setMuteOriginal] = useState(true);

  // to control volume level of the audio. 0-mute, 1-max
  const [showSpectro, setShowSpectro] = useState(true);

  // to control the zoom level of the waveform
  const [zoom, setZoom] = useState(1000);

  // to control the speed level of the waveform
  const [speed, setSpeed] = useState(1);
  // create an instance of the wavesurfer
  const [wavesurferObj, setWavesurferObj] = useState();

  // create an instance of the wavesurfer Processed
  const [wavesurferProcessedObj, setWavesurferProcessedObj] = useState();

  // create an instance of the wavesurfer Processed
  const [originalSpectrogram, setOriginalSpectrogram] = useState();

  // create an instance of the wavesurfer Processed
  const [modifiedSpectrogram, setModifiedSpectrogram] = useState();
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
        playing,
        setPlaying,
        volume,
        setVolume,
        muteOriginal,
        setMuteOriginal,
        showSpectro,
        setShowSpectro,
        originalSpectrogram,
        setOriginalSpectrogram,
        modifiedSpectrogram,
        setModifiedSpectrogram,
        zoom,
        setZoom,
        speed,
        setSpeed,
        wavesurferObj,
        setWavesurferObj,
        wavesurferProcessedObj,
        setWavesurferProcessedObj,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
