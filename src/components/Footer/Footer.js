import React from 'react';
// import Button from '../Button/Button';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              HD WALLET
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>HD WALLET © 2021</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;