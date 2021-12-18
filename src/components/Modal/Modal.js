import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Button from '../Button/Button';

import './Modal.css';

const Modal = ({ children, open, onClose, onConfirm }) => {
  const [input, setInput] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleOnConfirm = () => {
    onConfirm(input, purpose);
    setInput('');
    setPurpose('');
    onClose();
  }

  const handleOnClose = () => {
    setInput('');
    setPurpose('');
    onClose();
  }

  if (!open) return null;

  return ReactDom.createPortal(<div className="modal-background">
    <div className="modal-container">
      <h1>{children}</h1>
      <br />
      <label htmlFor='child-index'>Child index</label>
      <input
        id='child-index'
        type="tel"
        onChange={event => setInput(event.target.value)}
        value={input}
      />
      <label htmlFor='purpose'>Purpose</label>
      <input
        id='purpose'
        type="tel"
        onChange={event => setPurpose(event.target.value)}
        value={purpose}
      />

      <div className="modal-btns">
        <Button className='btn'
          buttonStyle='btn--outline'
          buttonSize='btn--medium'
          onClick={handleOnClose}
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

export default Modal;
