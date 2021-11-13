import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components';

import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
