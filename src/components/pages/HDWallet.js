import React, { useEffect, useState } from 'react';
import '../../App.css';
import AccountList from '../AccountList/AccountList';
import * as hdcore from 'hdcore-ts';

const DEFAULT_CHILD = 2021;

const HDWallet = (props) => {
  const [balance, setBalance] = useState('');
  const [balance1, setBalance1] = useState('');
  const accounts = [];
  const mnemonic = props.location.mnemonic;
  const seed = hdcore.account.createSeed(mnemonic);
  const master = hdcore.account.createMasterAccount('501', seed);
  const path = hdcore.account.getPath(0, 501, DEFAULT_CHILD);

  //("m/44'/501'/0'/0'/2021'")
  const default_child = hdcore.account.createChildAccount('501', seed, path);
  const transaction = hdcore.account.getTransaction('501');

  accounts.push(hdcore.account.getAddress(master.pub, '501'));
  accounts.push(hdcore.account.getAddress(default_child.pub, '501'));

  // console.log('Master address: ', hdcore.account.getAddress(master.pub, '501'));
  // console.log('Child address: ', hdcore.account.getAddress(child1.pub, '501'));

  useEffect(() => {
    const getBalance = async () => {
      setBalance(await transaction.get_balance(master.pub));
      setBalance1(await transaction.get_balance(default_child.pub));
    };
    getBalance();
  }, []);


  // transaction.get_balance(child1.pub).then(result => console.log('Default child balance: ', result));

  return <div className='hd-wallet'>
    <AccountList account={accounts[0]} balance={balance} />
    <AccountList account={accounts[1]} balance={balance1} />
  </div>;
}

export default HDWallet;