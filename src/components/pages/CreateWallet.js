import React, { useState } from 'react';
import '../../App.css';
import '../HeroSection/HeroSection.css';
import Button from './../Button/Button';
import * as hdcore from 'hdcore-ts';

const CreateWallet = () => {
  const [mnemonic, setMnemonic] = useState(hdcore.account.createMnemonic());

  const onClick = () => {
    const newMnemonic = hdcore.account.createMnemonic();
    setMnemonic(newMnemonic);
  }

  // const saveMnemonic = (mnemonic) => { localStorage.setItem('mnemonic', mnemonic) }


  return <div className='create-wallet'>
    <div className='hero-container'>
      <h1>YOUR MNEMONIC CODE</h1>
      <p>Copy and save the mnemonic code to backup your wallet</p>

      <br />
      <textarea className="textarea" value={mnemonic} readOnly />
      <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large' onClick={onClick}>Refresh</Button>

      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--larger'
          to='/hd-wallet'
          mnemonic={mnemonic}>
          CREATE WALLET
        </Button>
      </div>

    </div>
  </div>;
}

export default CreateWallet;