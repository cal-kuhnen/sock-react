import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Schedule = () => {
  return(
    <div class="content">
      <div class="schedule">
  			<p class="bold">All shows at 8PM EST unless otherwise specified.</p>
        <ul class="day">
  				<li><span class="contrast">Sunday</span>
  					<ul class="show">
  						<li><a href="../ration">Ration Radio w/DJ Rumsey (alternating)</a></li>
  					</ul>
  				</li>
  				<li><span class="contrast">Wednesday</span>
  					<ul class="show">
  						<li><a href="../CTA">Cracking the Algorithm w/Asif, John Henry, and Matt</a></li>
  					</ul>
  				</li>
  				<li><span class="contrast">Thursday</span>
  					<ul class="show">
  						<li><a href="../bhh">Broken Hearts Hotline</a></li>
  					</ul>
  				</li>
  				<li><span class="contrast">Saturday</span>
  					<ul class="show">
  						<li><a href="../garden">Garden Time (3PM, alternating)</a></li>
  					</ul>
  				</li>
  			</ul>
      </div>
      <div id="audio">
        <audio id="media" preload="none">
          <source src="https://stream.sock.rocks/kenny-test" type="audio/mpeg"></source>
        </audio>
        <button id="play">&#9654&#xFE0E</button>
        <p id="load">loading...</p>
        <button id="pause">| |</button>
      </div>
    </div>
  )
}

export default Schedule
