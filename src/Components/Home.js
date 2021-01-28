import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Radio from './Radio';
import '../css/home.css';

const Home = () => {
  return(
    <div>
    <div className="h-content">
      <div className="main">
        Welcome to SOCK Radio.
        <div className="BHH-submit">
        <h6> <a href="https://drive.google.com/open?id=1tp4Qbi2ShxkhSHkMdFH3DbZnuaG_hilBu1MRFgES0H8"> {'\uD83D\uDC94'} Submit ur relationship problems HERE {'\uD83D\uDC94'} </a></h6>
        </div>
      </div>
      <div className="footer">
        <p>contact us: hello@sock.rocks</p>
      </div>
    </div>

    </div>
  )
}

export default Home
