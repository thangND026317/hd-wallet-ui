import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from './../Button/Button';
import DeleteModal from '../Modal/DeleteModal';

import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);

  const onDelete = () => {
    setDeletePopup(true);
    localStorage.clear();
    setDeletePopup(false);
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

        {/* Mobile interface */}
        <div className="menu-icon" onClick={() => setClick(!click)}>
          <Button
            className="menu-icon"
            buttonStyle='btn--outline'
            onClick={() => setDeletePopup(true)}
          >
            Delete Wallet
          </Button>
        </div>

        {/* Web interface */}
        {button && <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Button
              className="menu-icon"
              buttonStyle='btn--outline'
              onClick={() => setDeletePopup(true)}
            >
              Delete</Button>
          </li>
        </ul>
        }

      </div>
    </nav>

    <DeleteModal
      open={deletePopup}
      onClose={() => setDeletePopup(false)}
      onConfirm={onDelete}>
      Delete Mnemonic & Log Out
    </DeleteModal>
  </Fragment>
}

export default Navbar;
