import React, { useState, useEffect } from 'react';
import * as hdcore from 'hdcore-ts';
import { Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AccountList from '../AccountList/AccountList';

import '../../App.css';
import Modal from '../Modal/Modal';
import { getAddress } from './../helpers/utils';
import { createDefault } from './../helpers/api';

const DEFAULT_CHILD = 2021;

const HDWallet = () => {
  const [openModal, setOpenModal] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const fetchFromLocalStorage = () => {
    const mnem = localStorage.getItem('mnemonic');
    const seeds = hdcore.account.createSeed(mnem);

    // const seed = localStorage.getItem('seed');
    const arr = localStorage.getItem('childWallets');
    if (!arr) return;

    const childWallets = JSON.parse(arr);
    let children = [];
    for (let child of childWallets) {
      const newPath = hdcore.account.getPath(501, child.index);
      const newChild = hdcore.account.createChildAccount('501', seeds, newPath);
      children.push({ pub: newChild.pub, prv: newChild.prv, purpose: child.purpose, index: child.index });
    }
    setAccounts(children);
  }

  const saveToLocalStorage = () => {
    let children = [];
    for (let account of accounts) {
      children.push({ purpose: account.purpose, index: account.index });
    }

    const childWallets = JSON.stringify(children);
    localStorage.setItem('childWallets', childWallets);
  }

  const createChild = (index, purpose) => {
    const newPath = hdcore.account.getPath(501, index);
    const newChild = hdcore.account.createChildAccount('501', seed, newPath);
    accounts.push({ pub: newChild.pub, prv: newChild.prv, purpose, index });
    setAccounts(accounts);
    saveToLocalStorage();
  }

  // Fetch from localStorage
  const mnemonic = localStorage.getItem('mnemonic');

  // Default wallets
  const seed = hdcore.account.createSeed(mnemonic);
  const master = hdcore.account.createMasterAccount('501', seed);
  localStorage.setItem('masterAddress', getAddress(master.pub));

  const path = hdcore.account.getPath(501, DEFAULT_CHILD); // ("m/44'/501'/0'/0'/2021'")
  const default_child = hdcore.account.createChildAccount('501', seed, path);

  useEffect(() => {
    fetchFromLocalStorage();

    /***  SERVER  ***/
    createDefault(getAddress(default_child.pub));
  }, [])

  return <div className='hd-wallet'>
    <div className="hero-container">
      {/* Create by default */}
      <AccountList pub={master.pub} prv={master.prv} purpose="Master wallet" />
      <AccountList pub={default_child.pub} prv={default_child.prv} purpose="default" childIndex={DEFAULT_CHILD} />

      {accounts.map((account) =>
        <AccountList
          key={account.index}
          pub={account.pub}
          prv={account.prv}
          purpose={account.purpose}
          childIndex={account.index}
        />)
      }

      <Tooltip title="Add a child wallet" arrow>
        <IconButton
          size="large"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={createChild}
      >
        Add a child wallet</Modal>
    </div>
  </div>;
}

export default HDWallet;