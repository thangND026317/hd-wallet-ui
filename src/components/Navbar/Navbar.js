import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from './../Button/Button';

import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <Fragment>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            HD WALLET
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/new-wallet" className="nav-links" onClick={closeMobileMenu}>Create wallet</Link>
            </li>
            <li className="nav-item">
              <Link to="/import-wallet" className="nav-links" onClick={closeMobileMenu}>Import Wallet</Link>
            </li>
            <li className="nav-item">
              <Link to="/hd-wallet" className="nav-links-mobile" onClick={closeMobileMenu}>HD Wallet</Link>
            </li>
          </ul>

          {button && <Button buttonStyle='btn--outline' to='/hd-wallet'>HD Wallet</Button>}
        </div>
      </nav>
    </Fragment>
  )
}

export default Navbar;
