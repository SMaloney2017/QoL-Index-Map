import React from "react";
import './App.css';
import Toolbar from './components/toolbar/Toolbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <>
        <Router>
          <Toolbar onClick/>
            <header>
              <h1>React Map.</h1>
            </header>

            <Switch>
              <Route path='#' />
          </Switch>
        </Router>
    </>
  );
}

export default App;
