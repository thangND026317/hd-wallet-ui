import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Home, CreateWallet, ImportWallet, HDWallet } from './components';

import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />

        {/* Main page: Home -> restore/new wallet -> main wallet -> logout/delete -> Home */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/new-wallet" exact component={CreateWallet} />
          <Route path="/restore-wallet" exact component={ImportWallet} />
          <Route path="/sign-up" exact component={HDWallet} />
        </Switch>

      </Router>
    </Fragment>
  );
}

export default App;
