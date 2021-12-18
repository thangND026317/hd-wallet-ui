import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from './../Button/Button';

import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);

  const onDelete = () => {
    setDeletePopup(true);

    localStorage.clear();
  }

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

  return <Fragment>
    <nav className="navbar">
      <div className="navbar-container">
        <h1>HD WALLET</h1>
        <div className="menu-icon" onClick={() => setClick(!click)}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links-mobile" onClick={() => setClick(false)}>Delete Wallet</Link>
          </li>
        </ul>

        {button && <Button buttonStyle='btn--outline' to='/' onClick={() => setDeletePopup(true)}>Delete Wallet</Button>}

      </div>
    </nav>

    {/* <DeleteModal open={popup} onClose={() => setPopup(false)} onConfirm={onConfirm} /> */}
  </Fragment>
}

export default Navbar;
