import React, { Component, useState, useEffect } from 'react'

var audio = new Audio("https://stream.sock.rocks/drive");

const Radio = () => {

  const [status, setStatus] = useState("loading...");

  /* play/pause function. load() is called to catch stream live, otherwise if
     the stream loads, clicking play starts the audio from when it loaded not
     at the current time */
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

  /* check for stream availability every 10 seconds unless it is already live
     checking the state does not work within here, hence using networkState to
     check if it should run */
  const loader = async () => {
    await new Promise(r => setTimeout(r, 10000));
    if (audio.networkState === 3 || audio.networkState === 0) {
      audio.load();
      loader();
      }
  }

  audio.onerror = () => {
    if (status === "loading..." || status ==='I I') {
      document.querySelector(".audio").className = "audio";
      setStatus("offline");
    }
  }

  // first check of stream for fastest load possible
  audio.onloadedmetadata = () => {
    if (status !== '\u25BA' && status !== 'I I') {
      document.querySelector(".audio").className = "audio live";
      setStatus('\u25BA');
    }
  }

  // handle end of stream to keep audio from looping, call load() to force error
  // which ensures loader() fails to run because of networkState being 3 (so dumb)
  audio.onended = () => {
    document.querySelector(".audio").className = "audio";
    audio.load();
  }

  // call loader if stream not live
  useEffect(() => {
    if (status === "offline") {
      loader();
    }
  });

  return (
    <div className="audio" onClick={start}>
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
