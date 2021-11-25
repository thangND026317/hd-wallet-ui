import React from 'react'

import Button from './../Button/Button';

import './HeroSection.css'

const HeroSection = () => {
  return (
    <div className='hero-container'>
      <div className='hero-btns'>
        <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
          CREATE WALLET
        </Button>

        <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
          RESTORE WALLET <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  )
}

export default HeroSection
