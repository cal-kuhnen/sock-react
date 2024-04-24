import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './container.css';
import About from '../About';
import Chat from '../Chat';
import Home from '../Home';
import Radio from '../Radio';
import Schedule from '../Schedule';
import Nav from '../Nav';

const Container = () => {
  return(
    <div className='container'>
      <div className='static-content'>
        <Nav />
        <Switch>
          <Route path='/schedule'>
            <Schedule />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
      <div className='live-content'>
        <Radio />
        <Chat />
      </div>
    </div>
  )
}

export default Container
