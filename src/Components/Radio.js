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

  // check for stream availability every 10 seconds unless it is already live
  const loader = async () => {
    if (status != "yay" && audio.networkState === 3) {
      audio.load();
      console.log("called");
      await new Promise(r => setTimeout(r, 10000));
      loader();
    }
    else {
      setStatus("yay");
    }
  }

  // first check of stream for fastest load possible
  audio.oncanplay = () => {
    playable = true;
    setStatus("yay");
  }

  // call loader if stream not live (status not changed)
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
