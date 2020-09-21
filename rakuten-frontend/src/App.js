import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from '../src/components/Main'
import Login from '../src/components/Login'
import viewProfile from '../src/components/ViewProfile'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/main" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/viewProfile" component={viewProfile} />
          <Route><h1>Not Found</h1></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
