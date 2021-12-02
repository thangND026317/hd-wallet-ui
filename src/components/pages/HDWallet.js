import React, { useEffect, useState } from 'react';
import '../../App.css';
import AccountList from '../AccountList/AccountList';
import { List, ListItem, ListItemButton, ListItemText, AppBar, Toolbar, IconButton, Typography, Paper, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import * as hdcore from 'hdcore-ts';
import Grid from '@material-ui/core/Grid';
// import DebugButtons from '../components/DebugButtons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down(theme.ext)]: {
      padding: 0,
    },
    [theme.breakpoints.up(theme.ext)]: {
      maxWidth: 'md',
    },
  },
  balancesContainer: {
    [theme.breakpoints.down(theme.ext)]: {
      marginBottom: 24,
    },
  },
}));

const DEFAULT_CHILD = 2021;

const HDWallet = (props) => {
  const chain_solana = '501'
  const [balance, setBalance] = useState('');
  const accounts = [];
  const mnemonic = props.location.mnemonic;
  const seed = hdcore.account.createSeed(mnemonic);
  const master = hdcore.account.createMasterAccount(chain_solana, seed);
  // const path = hdcore.account.getPath(0, 501, DEFAULT_CHILD);
  
  //("m/44'/501'/0'/0'/2021'")
  // const child1 = hdcore.account.createChildAccount('501', seed, path);
  const transaction = hdcore.account.getTransaction(chain_solana);

  accounts.push(hdcore.account.getAddress(master.pub, chain_solana));
  // accounts.push(hdcore.account.getAddress(child1.pub, '501'));

  // console.log('Master address: ', hdcore.account.getAddress(master.pub, '501'));
  // console.log('Child address: ', hdcore.account.getAddress(child1.pub, '501'));

  useEffect(() => {
    const getBalance = async () => {
      setBalance(await transaction.get_balance(master.pub));
    };
    getBalance();
  }, []);


  // transaction.get_balance(child1.pub).then(result => console.log('Default child balance: ', result));

  return <div className='hd-wallet'>
    <Paper style={{ width: '80%', marginTop: '20px' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Main account
          </Typography>

          <Tooltip title="Refresh" arrow>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ marginRight: -12 }}
              onClick={() => {
                const getBalance = async () => {
                  setBalance(await transaction.get_balance(master.pub));
                };
                getBalance();
                console.log('refresh')
                }}
            >
            <RefreshIcon />
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>
      <AccountList account={accounts[0]} balance={balance} chainid={chain_solana}/>
    </Paper>
  </div>;
}

export default HDWallet;