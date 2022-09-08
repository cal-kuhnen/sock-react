import React, { Component } from 'react';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Schedule from './Components/Schedule';
import About from './Components/About';
import Radio from './Components/Radio';
import Chat from './Components/Chat';
import Visualizer from './Components/Visualizer/Visualizer';
import { PortalDiv } from './Components/Portal/Portal';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './reset.css';
import './css/livebar.css';

class App extends Component {


  render() {

    return (
      <Router>
        <PortalDiv />
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
      </Router>
    )
  }
}

export default App
