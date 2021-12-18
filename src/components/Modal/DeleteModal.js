import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Button from '../Button/Button';

import './Modal.css';

const DeleteModal = ({ children, open, onClose, onConfirm }) => {
  if (!open) return null;

  return ReactDom.createPortal(<div className="modal-background">
    <div className="modal-container">
      <h1>{children}</h1>
      <br />
      <p>You will not be able to recover the current accounts without the seed phrase, and the account private key. This action will delete all current accounts from your browser. Are you sure?</p>
      <div className="modal-btns">
        <Button className='btn'
          buttonStyle='btn--outline'
          buttonSize='btn--medium'
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button className='btn'
          buttonStyle='btn--primary'
          buttonSize='btn--medium'
          onClick={onConfirm}
          to='/'
        >
          Confirm
        </Button>
      </div>

    </div>
  </div>, document.getElementById("portal-root"))
}

export default DeleteModal;
