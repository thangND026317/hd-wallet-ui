import React, { useEffect, useState } from 'react';
import * as hdcore from 'hdcore-ts';
import { Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AccountList from '../AccountList/AccountList';

import '../../App.css';

const DEFAULT_CHILD = 2021;

const HDWallet = (props) => {
  // const accounts = [];
  const mnemonic = props.location.mnemonic ? props.location.mnemonic : localStorage.getItem('mnemonic');

  const seed = hdcore.account.createSeed(mnemonic);
  const master = hdcore.account.createMasterAccount('501', seed);
  const path = hdcore.account.getPath(0, 501, DEFAULT_CHILD);

  //("m/44'/501'/0'/0'/2021'")
  const default_child = hdcore.account.createChildAccount('501', seed, path);

  // accounts.push(master);
  // accounts.push(default_child);

  return <div className='hd-wallet'>
    <div className="hero-container-other">
      <AccountList account={master} />
      {/* <AccountList account={default_child} /> */}

      <Tooltip title="Add a child wallet" arrow>
        <IconButton
          size="large"
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  </div>;
}

export default HDWallet;