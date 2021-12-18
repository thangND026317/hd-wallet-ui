import React, { useState } from 'react';
import * as hdcore from 'hdcore-ts';
import { Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AccountList from '../AccountList/AccountList';

import '../../App.css';
import Modal from '../Modal/Modal';

const DEFAULT_CHILD = 2021;

const HDWallet = () => {
  const [openModal, setOpenModal] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const fetchFromLocalStorage = () => {
    const seed = localStorage.getItem('seed');
    const childWallets = localStorage.getItem('childWallets');
    let children = [];
    for (let child of childWallets) {
      const newPath = hdcore.account.getPath(501, child.index);
      const newChild = hdcore.account.createChildAccount('501', seed, newPath);
      children.push({ pub: newChild.pub, prv: newChild.prv, purpose: child.purpose, index: child.index });
    }
    setAccounts(children);
  }

  const saveToLocalStorage = () => {
    let children = [];
    for (let account of accounts) {
      children.push({ purpose: account.purpose, index: account.index });
    }
    localStorage.setItem('childWallets', children);
  }

  const createChild = (index, purpose) => {
    const newPath = hdcore.account.getPath(501, index);
    const newChild = hdcore.account.createChildAccount('501', seed, newPath);
    accounts.push({ pub: newChild.pub, prv: newChild.prv, purpose, index });
    setAccounts(accounts);
  }

  // Fetch from localStorage
  const mnemonic = localStorage.getItem('mnemonic');

  // Default wallets
  const seed = hdcore.account.createSeed(mnemonic);
  const master = hdcore.account.createMasterAccount('501', seed);

  const path = hdcore.account.getPath(501, DEFAULT_CHILD); // ("m/44'/501'/0'/0'/2021'")
  const default_child = hdcore.account.createChildAccount('501', seed, path);

  return <div className='hd-wallet'>
    <div className="hero-container">
      {/* Create by default */}
      <AccountList pub={master.pub} prv={master.prv} purpose="Master wallet" />
      <AccountList pub={default_child.pub} prv={default_child.prv} purpose="Default child wallet" childIndex={DEFAULT_CHILD} />

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