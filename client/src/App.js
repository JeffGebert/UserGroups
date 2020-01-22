import React from 'react';
import LandingPage from "./components/LandingPage";
import UsersPage from "./components/UsersPage";
import GroupsPage from "./components/UsersPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/users">
          <UsersPage />
        </Route>
        <Route exact path="/groups">
          <GroupsPage />
        </Route>
      </Switch>  
    </Router>

  );
}

export default App;
