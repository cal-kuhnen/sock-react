import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import YellowLogo from "../pics/sockLogo01_yellow_med.png";
import SockLogo from "../pics/sockLogo01.png";
import '../css/nav.css';

const Nav = () => {
  return(
      <nav>
        <div className="home">
          <Link to="./"><img src={SockLogo} alt="logo saying sock radio"/></Link>
        </div>
        <div className="buttons">
          <div className="drop navButtons">
            shows
            <div className="dropContent">
              <div className="shows"><a href="./bhh" target="_blank" className="navLink">hearts</a></div>
              <div className="shows"><a href="./garden" target="_blank" className="navLink">garden</a></div>
    					<div className="shows"><a href="./ration" target="_blank" className="navLink">ration</a></div>
    					<div className="shows"><a href="./CTA" target="_blank" className="navLink">C.T.A.</a></div>
            </div>
          </div>
          <div className="navButtons sched">
            <Link to="./schedule" className="navLink">schedule</Link>
          </div>
    			<div className="navButtons about">
    				<Link to="/about" className="navLink">about</Link>
    			</div>
        </div>
      </nav>
  )
}

export default Nav
