import React, { Fragment, useState, useEffect } from 'react';

import Button from './../Button/Button';
import DeleteModal from '../Modal/DeleteModal';

import './Navbar.css';

const Navbar = () => {
  const [deletePopup, setDeletePopup] = useState(false);

  const onDelete = () => {
    setDeletePopup(true);
    localStorage.clear();
    setDeletePopup(false);
  }

  return <Fragment>
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-left">HD WALLET</h1>

        <div className="navbar-right">
          <Button
            buttonStyle='btn--outline'
            onClick={() => setDeletePopup(true)}
          >
            Delete
          </Button>
        </div>
      </div>
    </nav>

    <DeleteModal
      open={deletePopup}
      onClose={() => setDeletePopup(false)}
      onConfirm={onDelete}>
      Delete Mnemonic & Log Out
    </DeleteModal>
  </Fragment >
}

export default Navbar;
