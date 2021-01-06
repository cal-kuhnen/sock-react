import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import YellowLogo from "../pics/sockLogo01_yellow_med.png";
import SockLogo from "../pics/sockLogo01.png";

const Nav = () => {
  return(
      <nav>
        <div className="home">
          <img src={SockLogo} alt="logo saying sock radio"/>
        </div>
        <div className="buttons">
          <div className="drop navButtons">
            shows
            <div className="dropContent">
              <a href="./bhh">hearts</a>
              <a href="./garden">garden</a>
    					<a href="./ration">ration</a>
    					<a href="./CTA">C.T.A.</a>
            </div>
          </div>
          <div className="navButtons schedule">
            <Link to="./schedule">schedule</Link>
          </div>
    			<div className="navButtons about">
    				<Link to="/about">about</Link>
    			</div>
        </div>
      </nav>
  )
}

export default Nav
