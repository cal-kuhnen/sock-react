import React, { Component, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';

const Radio = () => {

  const [status, setStatus] = useState("loading...");

  let audio = new Audio("https://stream.sock.rocks/drive");
  var playable = false;

  const start = () => {
    setStatus("yay");
    audio.play();
  }

  const loader = async () => {
    await new Promise(r => setTimeout(r, 5000));
    if (!playable && status != "yay") {
      audio.load();
      await new Promise(r => setTimeout(r, 10000));
      setStatus("loading...");
      loader();
      console.log("called");
    }
    else {
      setStatus("yay");
    }
  }

  audio.oncanplay = () => {
    playable = true;
    setStatus("yay");
  }

  if (status === "loading...") {
    loader();
  }

  return (
    <button className="audio" onClick={start}>
      {status}
    </button>
  )
}

export default Radio

/*
<audio id="media" preload="none">
  <source src="https://stream.sock.rocks/kenny-test" type="audio/mpeg"></source>
</audio>
<button id="play">{'\u25BA'}</button>
<p id="load">loading...</p>
*/
