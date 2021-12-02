import React, { useState } from 'react';
import '../../App.css';
import '../HeroSection/HeroSection.css';
import Button from './../Button/Button';


const ImportWallet = () => {
  const [mnemonic, setMnemonic] = useState('');

  const handleOnChange = event => setMnemonic(event.target.value);

  return <div className='import-wallet'>
    <div className='hero-container'>
      <h1>IMPORT YOUR WALLET</h1>
      <p>Copy and paste your mnemonic code to import your wallet</p>
      <br />
      <textarea className="textarea" onChange={handleOnChange} value={mnemonic} />
      <br />

      <div className='hero-btns'>
        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--larger' to='/hd-wallet' mnemonic={mnemonic}>
          IMPORT WALLET
        </Button>
      </div>
    </div>
  </div>;
}

export default ImportWallet;