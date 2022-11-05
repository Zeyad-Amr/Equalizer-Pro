import React, { useState, useEffect, useContext, useRef } from "react";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import { FileContext } from "../../contexts/index";
import wavesurfer from "wavesurfer.js";
import "./style.css";
import {
  color_cyan,
  color_black,
  color_white,
} from "../../globals/constants/constants";

const AudioWaveform = () => {
  // wavesurfer reference
  const wavesurferRef = useRef(null);

  // timeline reference
  const timelineRef = useRef(null);

  // fetch files from the context
  const { inputFileUrl, processedFileUrl } = useContext(FileContext);

  // create an instance of the wavesurfer
  const [wavesurferObj, setWavesurferObj] = useState();

  // to keep track whether audio is currently playing or not
  const [playing, setPlaying] = useState(true);

  // to control volume level of the audio. 0-mute, 1-max
  const [volume, setVolume] = useState(1);

  // to control the zoom level of the waveform
  const [zoom, setZoom] = useState(1);

  // create the waveform of input file inside the component
  useEffect(() => {
    if (wavesurferRef.current && !wavesurferObj) {
      setWavesurferObj(
        wavesurfer.create({
          container: "#waveform",
          scrollParent: true,
          autoCenter: true,
          cursorColor: color_black,
          loopSelection: true,
          waveColor: color_white,
          progressColor: color_cyan,
          responsive: true,
          interact: false,
          height: 200,
          plugins: [
            // timeline below the waveform
            TimelinePlugin.create({
              container: "#wave-timeline",
            }),
          ],
        })
      );
    }
  }, [wavesurferRef, wavesurferObj]);

  // once the input file URL is ready
  // load the input file to produce the waveform
  useEffect(() => {
    if (inputFileUrl && wavesurferObj) {
      wavesurferObj.load(inputFileUrl);
    }
  }, [inputFileUrl, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) {
      // once the waveform is ready
      // play the audio
      wavesurferObj.on("ready", () => {
        // play the waveform
        wavesurferObj.play();
      });

      // once audio starts playing, set the state variable to true
      wavesurferObj.on("play", () => {
        setPlaying(true);
      });

      // once audio starts playing, set the state variable to false
      wavesurferObj.on("finish", () => {
        setPlaying(false);
      });

      // if multiple regions are created
      // then remove all the previous regions
      // so that only 1 is present at any given time
      wavesurferObj.on("region-updated", (region) => {
        const regions = region.wavesurfer.regions.list;
        const keys = Object.keys(regions);
        if (keys.length > 1) {
          regions[keys[0]].remove();
        }
      });
    }
  }, [wavesurferObj]);

  // set volume of the wavesurfer object
  // whenever volume variable in state is changed
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setVolume(volume);
  }, [volume, wavesurferObj]);

  // set zoom level of the wavesurfer object
  //whenever the zoom variable in state is changed
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.zoom(zoom);
  }, [zoom, wavesurferObj]);

  // play/pause waveform on pressing play/pause button
  const handlePlayPause = (e) => {
    wavesurferObj.playPause();
    setPlaying(!playing);
  };

  // reload waveform on pressing reload button
  const handleReload = (e) => {
    // stop will return the audio to 0s
    wavesurferObj.stop();

    //then play it again
    wavesurferObj.play();

    // to toggle the play/pause button icon
    setPlaying(true);
  };

  // set volume value to local state
  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  };

  // set zoom value to local state
  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  };

  return (
    <section className="waveform-container">
      <div ref={wavesurferRef} id="waveform" />
      <div ref={timelineRef} id="wave-timeline" />
      <div className="all-controls">
        <div className="left-container">
          <button
            title="play/pause"
            className="controls"
            onClick={handlePlayPause}
          >
            {playing ? (
              <i className="material-symbols-rounded">pause_circle</i>
            ) : (
              <i className="material-symbols-rounded">play_circle</i>
            )}
          </button>
          <button title="reload" className="controls" onClick={handleReload}>
            <i className="material-symbols-rounded">stop_circle</i>
          </button>
        </div>

        <div className="right-container">
          <div className="volume-slide-container">
            <i className="material-symbols-rounded  zoom-icon">remove_circle</i>
            <input
              type="range"
              min="1"
              max="1000"
              value={zoom}
              onChange={handleZoomSlider}
              class="slider zoom-slider"
            />
            <i className="material-symbols-rounded  zoom-icon">add_circle</i>
          </div>

          <div className="volume-slide-container">
            {volume > 0 ? (
              <i className="material-symbols-rounded">volume_up</i>
            ) : (
              <i className="material-symbols-rounded">volume_off</i>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeSlider}
              className="slider volume-slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioWaveform;
