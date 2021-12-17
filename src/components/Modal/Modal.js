import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Button from '../Button/Button';

import './Modal.css';

const Modal = ({ children, open, onClose, onConfirm }) => {
  const [input, setInput] = useState('');

  const handleOnChange = event => setInput(event.target.value);

  const handleOnConfirm = (index) => {
    onConfirm(index);
    onClose();
  }

  if (!open) return null;

  return ReactDom.createPortal(<div className="modal-background">
    <div className="modal-container">
      <h1>{children}</h1>
      <br />
      <label htmlFor='child-index'>Input child index</label>
      <input
        id='child-index'
        type="tel"
        onChange={handleOnChange}
        value={input}
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
          onClick={() => handleOnConfirm(input)}
        >
          Confirm
        </Button>
      </div>

    </div>
  </div>, document.getElementById("portal-root"))
}

export default Modal;
