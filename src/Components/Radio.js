import React, { Component, useState, useEffect } from 'react'

var audio = new Audio("https://stream.sock.rocks/drive");

const Radio = () => {

  const [status, setStatus] = useState("loading...");

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
    console.log(status);
  }

  // check for stream availability every 10 seconds unless it is already live
  const loader = async () => {
    await new Promise(r => setTimeout(r, 10000));
    console.log(status);
    if (audio.networkState === 3 || audio.networkState === 0) {
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
    console.log("playable");
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
      console.log("calling loader");
      loader();
    }
  });

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
