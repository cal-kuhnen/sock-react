import React, { Component } from 'react'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Schedule from './Components/Schedule'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './reset.css';
import './index0.css';

class App extends Component {


  render() {

    return (
      <Router>
        <div>
          <Nav />
        </div>
        <Switch>
          <Route path='/schedule'>
            <Schedule />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
