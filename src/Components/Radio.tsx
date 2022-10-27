import React, { useState, useEffect } from 'react'
import Visualizer from './Visualizer/Visualizer';
import { Portal } from './Portal/Portal';
import { AudioControls } from '../Constants/constants';

let audio = new Audio("https://stream.sock.rocks/test");
//var audio = new Audio(song2);
audio.crossOrigin = "anonymous";
const audioContext = new AudioContext();



const Radio = () => {

  const [status, setStatus] = useState(AudioControls.loading);
  const [visualize, setVisualize] = useState(false);
  const [analyser, setAnalyser] = useState(null as AnalyserNode | null);

  /* play/pause function. load() is called to catch stream live, otherwise if
     the stream loads, clicking play starts the audio from when it loaded not
     at the current time */
  const start = () => {
    if (status === AudioControls.play && !analyser) {
      console.log("playing audio");
      audio.load();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const audioSrc = audioContext.createMediaElementSource(audio);
      audioSrc.connect(analyser);
      analyser.connect(audioContext.destination);
      audio.play();
      setAnalyser(analyser);
      setStatus(AudioControls.stop);
      setVisualize(true);
    } else if (status === AudioControls.play) {
      audio.load();
      audio.play();
      setStatus(AudioControls.stop);
    } else if (status === AudioControls.stop) {
      console.log("stopping audio");
      audio.pause();
      setStatus(AudioControls.play);
    }
  }

  /* check for stream availability every 10 seconds unless it is already live
     checking the state does not work within here, hence using networkState to
     check if it should run */
  const loader = async () => {
    await new Promise(r => setTimeout(r, 10000));
    if (audio.networkState === 3 || audio.networkState === 0) {
      audio.load();
      loader();
      }
    // audio.load();
    // setStatus('\u25BA');
  }

  audio.onerror = () => {
    if (status === "loading..." || status === AudioControls.stop) {
      let audioEl = document.querySelector(".audio");
      if (audioEl != null) {
        audioEl.className = "audio";
      }
      setStatus("offline");
      setVisualize(false);
    }
  }

  // first check of stream for fastest load possible
  audio.onloadedmetadata = () => {
    if (status !== AudioControls.play && status !== AudioControls.stop) {
      let audioEl = document.querySelector(".audio");
      if (audioEl != null) {
        audioEl.className = "audio live";
      }
      setStatus(AudioControls.play);
    }
  }

  // handle end of stream to keep audio from looping, call load() to force error
  // which ensures loader() fails to run because of networkState being 3 (so dumb)
  audio.onended = () => {
    let audioEl = document.querySelector(".audio");
      if (audioEl != null) {
        audioEl.className = "audio";
      }
    audio.load();
  }

  // call loader if stream not live
  useEffect(() => {
    if (status === "offline") {
      loader();
    }
  });

  return (
    <div>
      <div className="audio" onClick={start}>
        {status}
      </div>
      <Portal>
        <Visualizer begin={visualize} audio={analyser}/>
      </Portal>
    </div>
  )
}

export default Radio
