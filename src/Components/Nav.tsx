import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  NavLink
} from "react-router-dom";
import SockLogo from '../pics/sockLogo01.png';
import '../css/nav.css';

const Nav = () => {
  return(
      <nav>
        <div className="home">
          <NavLink to="/" className="home-link" activeClassName='selected' exact={true}>
            <img src={SockLogo} alt="logo saying sock radio"/>
            <div className='black hover-bar'></div>
          </NavLink>
        </div>
        <div className="buttons">
          <div className="drop navButtons">
            <div>shows</div>
            <div className='yellow hover-bar'></div>
          </div>
          <NavLink className="navButtons" activeClassName="selected" to="/schedule">
            <div>schedule</div>
            <div className='red hover-bar'></div>
          </NavLink>
    			<NavLink to="/about" className="navButtons right-button" activeClassName="selected">
            <div>about</div>
            <div className='blue hover-bar'></div>
          </NavLink>
        </div>
      </nav>
  )
}

export default Nav
