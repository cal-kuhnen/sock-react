import React from 'react';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Schedule from './Components/Schedule';
import About from './Components/About';
import Radio from './Components/Radio';
import Chat from './Components/Chat';
import { PortalDiv } from './Components/Portal/Portal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import './reset.css';
import './css/livebar.css';
import { Location } from "history";
import Container from './Components/Container/Container';


const App = () => {
    return (
      <Router>
        <PortalDiv />
        <Container />
      </Router>
    )
}

export default App
