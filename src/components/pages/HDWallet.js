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
  const mnemonic = localStorage.getItem('mnemonic');

  // Default wallets
  const seed = hdcore.account.createSeed(mnemonic);
  const master = hdcore.account.createMasterAccount('501', seed);

  const path = hdcore.account.getPath(501, DEFAULT_CHILD); // ("m/44'/501'/0'/0'/2021'")
  const default_child = hdcore.account.createChildAccount('501', seed, path);

  const createChild = (index) => {
    const newPath = hdcore.account.getPath(501, 2020);

    const newChild = hdcore.account.createChildAccount('501', seed, newPath);
    accounts.push(newChild);
    setAccounts(accounts);
  }

  return <div className='hd-wallet'>
    <div className="hero-container">
      <AccountList pub={master.pub} />
      <AccountList pub={default_child.pub} />
      {accounts.map((account) => <AccountList key={account.pub + 1} pub={account.pub} />)}

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