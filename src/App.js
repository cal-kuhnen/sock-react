import React, { Component } from 'react'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Schedule from './Components/Schedule'
import Radio from './Components/Radio'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './reset.css';

class App extends Component {


  render() {

    return (
      <Router>
        <div>
          <Nav />
          <Radio />
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
