import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  NavLink
} from "react-router-dom";
import YellowLogo from "../pics/sockLogo01_yellow_med.png";
import SockLogo from "../pics/sockLogo01.png";
import '../css/nav.css';

const Nav = () => {
  return(
      <nav>
        <div className="home">
          <NavLink to="/" className="home-link" exact={true}><img src={SockLogo} alt="logo saying sock radio"/></NavLink>
        </div>
        <div className="buttons">
          <div className="drop navButtons">
            shows
            <div className="dropContent">
              <div className="shows"><a href="./bhh" target="_blank" rel="noopener noreferrer" className="navLink">hearts</a></div>
              <div className="shows"><a href="./garden" target="_blank" rel="noopener noreferrer" className="navLink">garden</a></div>
    					<div className="shows"><a href="./ration" target="_blank" rel="noopener noreferrer" className="navLink">ration</a></div>
    					<div className="shows"><a href="./CTA" target="_blank" rel="noopener noreferrer" className="navLink">C.T.A.</a></div>
            </div>
          </div>
          <NavLink className="navButtons sched" activeClassName="sched-select" to="/schedule">schedule</NavLink>
    			<NavLink to="/about" className="navButtons about" activeClassName="about-select">about</NavLink>
        </div>
      </nav>
  )
}

export default Nav
