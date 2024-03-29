import React, { useEffect, useContext, useRef } from "react";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import { AppContext } from "../../contexts/index";
import wavesurfer from "wavesurfer.js";
import "./style.css";
import {
  color_cyan,
  color_black,
  color_white,
} from "../../globals/constants/colors";
const AudioWaveform = () => {
  ////////////////////////////////// Start Initialization //////////////////////////////////

  // wavesurfer reference
  const wavesurferRef = useRef(null);

  // timeline reference
  const timelineRef = useRef(null);

  // fetch files from the context
  const {
    inputFileUrl,
    processedFileUrl,
    setPlaying,
    muteOriginal,
    zoom,
    volume,
    speed,
    wavesurferObj,
    setWavesurferObj,
    wavesurferProcessedObj,
    setWavesurferProcessedObj,
  } = useContext(AppContext);

  ////////////////////////////////// End Initialization //////////////////////////////////

  ////////////////////////////////// Start State Methods //////////////////////////////////

  // create the waveform of input file inside the component
  useEffect(() => {
    if (wavesurferRef.current && !wavesurferObj) {
      setWavesurferObj(
        wavesurfer.create({
          container: "#waveform",
          scrollParent: true,
          autoCenter: true,
          hideScrollbar: true,
          cursorColor: color_black,
          loopSelection: true,
          waveColor: color_white,
          progressColor: color_cyan,
          responsive: true,
          interact: false,
          height: 220,

          plugins: [
            TimelinePlugin.create({
              container: "#wave-timeline",
              primaryFontColor: "#fff",
              primaryColor: "#fff",
              secondaryColor: "#fff",
              secondaryFontColor: "#fff",
            }),
          ],
        })
      );
    }
  }, [wavesurferRef, wavesurferObj]);

  // create the waveform of processed file inside the component
  useEffect(() => {
    if (wavesurferRef.current && !wavesurferProcessedObj) {
      setWavesurferProcessedObj(
        wavesurfer.create({
          container: "#waveform",
          scrollParent: true,
          autoCenter: true,
          hideScrollbar: true,
          cursorColor: color_black,
          loopSelection: true,
          waveColor: color_white,
          progressColor: color_cyan,
          responsive: true,
          interact: false,
          height: 220,

          plugins: [
            TimelinePlugin.create({
              container: "#wave-timeline",
              primaryFontColor: "#fff",
              primaryColor: "#fff",
              secondaryColor: "#fff",
              secondaryFontColor: "#fff",
            }),
          ],
        })
      );
    }
  }, [wavesurferRef, wavesurferProcessedObj]);

  // once the input file URL is ready
  // load the input file to produce the waveform
  useEffect(() => {
    if (inputFileUrl && wavesurferObj) {
      wavesurferObj.load(inputFileUrl);
      setPlaying(false);
    }
  }, [inputFileUrl, wavesurferObj]);

  // once the Processed file URL is ready
  // load the input Processed to produce the waveform
  useEffect(() => {
    if (inputFileUrl && wavesurferObj) {
      wavesurferObj.load(inputFileUrl);
      setPlaying(false);
    }
    if (processedFileUrl && wavesurferProcessedObj) {
      wavesurferProcessedObj.load(processedFileUrl);
      setPlaying(false);
    }
  }, [processedFileUrl, wavesurferProcessedObj]);

  useEffect(() => {
    if (wavesurferObj) {
      // once audio starts playing, set the state variable to true
      wavesurferObj.on("play", () => {
        setPlaying(true);
      });

      // once audio starts playing, set the state variable to false
      wavesurferObj.on("finish", () => {
        setPlaying(false);
      });
    }
  }, [wavesurferObj]);

  useEffect(() => {
    if (wavesurferProcessedObj) {
      // once audio starts playing, set the state variable to true
      wavesurferProcessedObj.on("play", () => {
        setPlaying(true);
      });

      // once audio starts playing, set the state variable to false
      wavesurferProcessedObj.on("finish", () => {
        setPlaying(false);
      });
    }
  }, [wavesurferProcessedObj]);

  // set volume of the wavesurfer object
  // whenever volume variable in state is changed
  useEffect(() => {
    if (wavesurferObj && wavesurferProcessedObj) {
      if (muteOriginal === false) {
        wavesurferObj.setVolume(0);
        wavesurferProcessedObj.setVolume(volume);
      } else {
        wavesurferObj.setVolume(volume);
        wavesurferProcessedObj.setVolume(0);
      }
    }
  }, [muteOriginal, volume, wavesurferObj, wavesurferProcessedObj]);

  // set zoom level of the wavesurfer object
  //whenever the zoom variable in state is changed
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.zoom(zoom);
    }
  }, [zoom, wavesurferObj]);

  // set zoom level of the wavesurfer object
  //whenever the zoom variable in state is changed
  useEffect(() => {
    if (wavesurferProcessedObj) {
      wavesurferProcessedObj.zoom(zoom);
    }
  }, [zoom, wavesurferProcessedObj]);

  // set speed level of the wavesurfer object
  //whenever the zoom variable in state is changed
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.setPlaybackRate(speed);
    }
  }, [speed, wavesurferObj]);

  // set zoom level of the wavesurfer object
  //whenever the zoom variable in state is changed
  useEffect(() => {
    if (wavesurferProcessedObj) {
      wavesurferProcessedObj.setPlaybackRate(speed);
    }
  }, [speed, wavesurferProcessedObj]);

  ////////////////////////////////// End State Methods //////////////////////////////////

  return (
    <section className="waveform-container">
      <div ref={wavesurferRef} id="waveform" />
      <div ref={timelineRef} id="wave-timeline" />
    </section>
  );
};

export default AudioWaveform;
