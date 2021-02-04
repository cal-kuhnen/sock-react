import React, { Component, useState } from 'react'

var audio = new Audio("https://stream.sock.rocks/drive");

const Radio = () => {

  const [status, setStatus] = useState("loading...");

  var playable = false;

  const start = () => {
    if (status === '\u25BA') {
      console.log("playing audio");
      audio.load();
      audio.play();
      setStatus('I I');
    }
    else if (status === 'I I') {
      console.log("pausing audio");
      audio.pause();
      setStatus('\u25BA');
    }
  }

  // check for stream availability every 10 seconds unless it is already live
  const loader = async () => {
    console.log("called");
    await new Promise(r => setTimeout(r, 10000));
    if (status !== '\u25BA' && status !== 'I I') {
      audio.load();
      loader();
      }
  }

  console.log(audio.networkState);

  audio.onerror = () => {
    if (status === "loading..." || status ==='I I') {
      document.querySelector(".audio").className = "audio";
      setStatus("offline");
    }
  }

  // first check of stream for fastest load possible
  audio.oncanplay = () => {
    playable = true;
    console.log("playable");
    if (status !== '\u25BA' && status !== 'I I') {
      document.querySelector(".audio").className = "audio live";
      setStatus('\u25BA');
    }
  }

  // handle end of stream to keep audio from looping, change status to offline
  audio.onended = () => {
    setStatus("offline");
    document.querySelector(".audio").className = "audio";
  }

  // call loader if stream not live (status not changed)
  if (status === "offline") {
    loader();
  }

  return (
    <div className="audio" onClick={start}>
      <div className='notification'>
        • LIVE
      </div>
      {status}
    </div>
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
