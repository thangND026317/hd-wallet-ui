import React, { Fragment, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navbar, Home, CreateWallet, ImportWallet, HDWallet, Footer } from './components';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <Fragment>
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* Main page: Home -> import/new wallet -> main wallet -> logout/delete -> Home */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create-wallet" exact component={CreateWallet} />
        <Route path="/import-wallet" exact component={ImportWallet} />
        <Route path="/hd-wallet" exact>
          <HDWallet setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  </Fragment>
}

export default App;
