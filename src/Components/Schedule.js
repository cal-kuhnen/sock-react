import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../css/schedule.css';

const Schedule = () => {
  return(
    <div className="content">
      <div className="schedule">
        <div className="s-main">
  			  <p className="bold">All shows at 8PM EST unless otherwise specified.</p>
        </div>
        <ul className="day">
  				<li><span className="contrast">Sunday</span>
  					<ul className="show">
  						<li><a className="schedLink" href="../ration">Ration Radio w/DJ Rumsey (alternating)</a></li>
  					</ul>
  				</li>
  				<li><span className="contrast">Wednesday</span>
  					<ul className="show">
              <li><a className="schedLink" href="../CTA">Cracking the Algorithm w/Asif, John Henry, and Matt</a></li>
  					</ul>
  				</li>
  				<li><span className="contrast">Thursday</span>
  					<ul className="show">
  						<li><a className="schedLink" href="../bhh">Broken Hearts Hotline</a></li>
  					</ul>
  				</li>
  				<li><span className="contrast">Saturday</span>
  					<ul className="show">
  						<li><a className="schedLink" href="../garden">Fatal Exception</a></li>
  					</ul>
  				</li>
  			</ul>
      </div>
    </div>
  )
}

export default Schedule
