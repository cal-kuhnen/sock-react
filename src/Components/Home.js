import React, { Component } from 'react'
import '../index0.css';

const Home = () => {
  return(
    <div>
    <div className="content">
      <div className="main">
        Welcome to SOCK Radio.
        <div className="BHH-submit">
        <h6> <a href="https://drive.google.com/open?id=1tp4Qbi2ShxkhSHkMdFH3DbZnuaG_hilBu1MRFgES0H8"> {'\uD83D\uDC94'} Submit ur relationship problems HERE {'\uD83D\uDC94'} </a></h6>
        </div>
      </div>
      <div id="audio">
        <audio id="media" preload="none">
          <source src="https://stream.sock.rocks/kenny-test" type="audio/mpeg">
          </source>
        </audio>
        <button id="play">{'\u25BA'}</button>
        <p id="load">loading...</p>
        <button id="pause">| |</button>
      </div>
    </div>
    <div className="footer">
      <p>contact us: hello@sock.rocks</p>
    </div>
    </div>
  )
}

export default Home
