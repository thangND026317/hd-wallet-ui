import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large', 'btn--larger'];

const Button = ({ children, type, onClick, buttonStyle, buttonSize, to, mnemonic }) => {
  const checkBtnStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkBtnSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  if (mnemonic) localStorage.setItem('mnemonic', mnemonic);

  return <>
    {to ?
      <Link
        // to={{
        //   pathname: to,
        //   mnemonic: mnemonic
        // }}
        to={to}
        className='btn-mobile'>
        <button
          className={`btn ${checkBtnStyle} ${checkBtnSize}`}
          onClick={onClick}
          type={type}
        >{children}</button>
      </Link>
      : <button
        className={`btn ${checkBtnStyle} ${checkBtnSize}`}
        onClick={onClick}
        type={type}
      >{children}</button>
    }
  </>
}

export default Button;
