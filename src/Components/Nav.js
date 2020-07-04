import React, { Component } from 'react'

import YellowLogo from "../pics/sockLogo01_yellow_med.png";

const Nav = () => {
  return(
    <nav>
      <div className="home">
        <img src={YellowLogo} alt="logo saying sock radio"/>
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
        <div className="navButtons">
          <a href="./schedule" className="navLink">schedule</a>
        </div>
  			<div className="navButtons">
  				<a href="./about" className="navLink">about</a>
  			</div>
      </div>
    </nav>
  )
}

export default Nav
