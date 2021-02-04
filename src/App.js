import React, { Component } from 'react';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Schedule from './Components/Schedule';
import About from './Components/About';
import Radio from './Components/Radio';
import Chat from './Components/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './reset.css';
import './css/livebar.css';

class App extends Component {


  render() {

    return (
      <Router>
        <div>
          <Nav />
          <div className='live-content'>
            <Radio />
            <Chat />
          </div>
        </div>
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
      </Router>
    )
  }
}

export default App
