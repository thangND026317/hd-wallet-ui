import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Home, CreateWallet, ImportWallet, HDWallet, Footer } from './components';

// import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />

        {/* Main page: Home -> import/new wallet -> main wallet -> logout/delete -> Home */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/new-wallet" exact component={CreateWallet} />
          <Route path="/import-wallet" exact component={ImportWallet} />
          <Route path="/hd-wallet" exact component={HDWallet} />
        </Switch>

        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
