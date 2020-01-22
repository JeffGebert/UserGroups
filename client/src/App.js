import React from 'react';
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>  
    </Router>

  );
}

export default App;
