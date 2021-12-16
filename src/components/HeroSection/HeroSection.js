import React from 'react'

import Button from './../Button/Button';

import './HeroSection.css'

const HeroSection = () => {
  return (
    <div className='hero-container hero--home'>
      <h1>GET STARTED</h1>
      <p>Create new wallet or import your wallet</p>
      <div className='hero-btns'>
        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--larger' to='/create-wallet'>
          CREATE WALLET
        </Button>

        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--larger' to='/import-wallet'>
          IMPORT WALLET
        </Button>
      </div>
    </div>
  )
}

export default HeroSection;
