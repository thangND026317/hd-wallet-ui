import React from 'react';
import Button from '../Button/Button';

const Modal = ({ children, onClose }) => {
  return <>
    <div className="overlay" />
    <div className="modal">
      {children}
      <Button className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--medium'
        onClick={onClose}
      >
        Cancel
      </Button>
    </div>
  </>
}

export default Modal;
