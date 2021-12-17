import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Button from '../Button/Button';

import './Modal.css';

const SendModal = ({ children, open, onClose, onConfirm }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleOnConfirm = () => {
    onConfirm(address, amount);
    onClose();
  }

  if (!open) return null;

  return ReactDom.createPortal(<div className="modal-background">
    <div className="modal-container">
      <h1>{children}</h1>
      <br />
      <label htmlFor='address'>Receiver's address:</label>
      <input
        id='address'
        type="tel"
        onChange={event => setAddress(event.target.value)}
        value={address}
      />

      <label htmlFor='amount'>Amount:</label>
      <input
        id='amount'
        type="tel"
        onChange={event => setAmount(event.target.value)}
        value={amount}
      />

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
          onClick={handleOnConfirm}
        >
          Confirm
        </Button>
      </div>

    </div>
  </div>, document.getElementById("portal-root"))
}

export default SendModal;
