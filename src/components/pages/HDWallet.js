import React from 'react';
import '../../App.css';
import '../HeroSection/HeroSection.css';
import * as hdcore from 'hdcore-ts';

const HDWallet = (props) => {
  const mnemonic = props.location.mnemonic;
  const seed = hdcore.account.createSeed(mnemonic);
  const master = hdcore.account.createMasterAccount('501', seed);
  // const path = hdcore.account.getPath(0, 501, 1);
  //("m/44'/501'/0'/0'/1'")
  // const acc1 = hdcore.account.createChildAccount('501', seed, path);
  const transaction = hdcore.account.getTransaction('501');

  console.log(hdcore.account.getAddress(master.pub, '501'));
  transaction.get_balance(master.pub).then(result => console.log(result))

  return <div className='hd-wallet'>
    <div className='hero-container'>
      <h6>Your wallet</h6>
      <ul>
        <li>Account 1
          <ul>
            <li>Child 1</li>
            <li>Child 2</li>
          </ul>
        </li>
        <li>Account 2</li>
      </ul>
    </div>
  </div>;
}

export default HDWallet;