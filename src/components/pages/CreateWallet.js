import React, { useState } from 'react';
import '../../App.css';
import '../HeroSection/HeroSection.css';
import Button from './../Button/Button';
import * as hdcore from 'hdcore-ts';

const CreateWallet = () => {
  const [mnemonic, setMnemonic] = useState(hdcore.account.createMnemonic())

  const onClick = () => {
    // const newMnemonic = hdcore.account.createMnemonic();
    const newMnemonic = 'suspect science dry empty high remain envelope motion employ nature hover trophy average age skirt blanket prize cry couch power employ circle vague bitter';
    setMnemonic(newMnemonic);
  }
  return <div className='new-wallet'>
    <div className='hero-container'>
      <h1>YOUR MNEMONIC CODE</h1>
      <p>Copy and save the mnemonic code to backup your wallet</p>
      <br />
      <textarea className="textarea" value={mnemonic}/>
      <br />
      <button className='btns btn--primary btn--medium' onClick={onClick}>Refresh</button>
      <div className='hero-btns'>
        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--larger' to='/hd-wallet' mnemonic={mnemonic}>
          CREATE WALLET
        </Button>
      </div>
    </div>
  </div>;
}

export default CreateWallet;