import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button, Paper, AppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import ReceiveIcon from '@mui/icons-material/WorkOutline';

import SendModal from '../Modal/SendModal';
import { getAddress, getBalance, getAirdrop, sendTransaction, getPath } from '../helpers/utils';
import { push, pull, search } from '../helpers/api';

import './AccountList.css';

const AccountList = ({ pub, prv, purpose, childIndex = 0 }) => {
  const [balance, setBalance] = useState(0);
  const [expanding, setExpanding] = useState(false);
  const [airdropping, setAirdropping] = useState(false);
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState(false);

  const refreshBalance = async () => {
    setBalance(await getBalance(pub));
  }

  const airdrop = async () => {
    setAirdropping(true);
    await getAirdrop(pub);
    setAirdropping(false);
    refreshBalance();
  }

  const onConfirm = async (receiverAddress, amount) => {
    setSending(true);
    await sendTransaction(pub, prv, receiverAddress, amount);
    setSending(false);
    refreshBalance();
  }

  useEffect(() => {
    refreshBalance();
    search();
  }, []);

  return <Paper style={{ width: '80%', marginTop: '20px' }}>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 18, display: 'block' }}>
          {getAddress(pub)}
          {(childIndex !== 0) &&
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontSize: 14, display: 'block' }}>
              {getPath(childIndex)}
            </Typography>
          }
        </Typography>


        <Tooltip title="Push" arrow>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => push(purpose)}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Pull" arrow>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => pull(purpose)}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Refresh" arrow>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ marginRight: -12 }}
            onClick={refreshBalance}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>

    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setExpanding(!expanding)}
          sx={{
            "&:hover": {
              backgroundColor: "#adadad",
            }
          }}>
          <ListItemText
            primary={`${balance} SOL`}
            secondary={purpose}
          />
          {expanding ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      {expanding && <div className="button-container">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ReceiveIcon />}
          onClick={airdrop}
          disabled={airdropping}
        >
          {!airdropping ? "Airdrop" : "Requested"}
        </Button>


        <Button
          variant="outlined"
          color="primary"
          startIcon={<SendIcon />}
          onClick={() => setPopup(true)}
          disabled={sending}
        >
          {!sending ? "Send" : "Sent"}
        </Button>
      </div>
      }
    </List>

    <SendModal
      open={popup}
      onClose={() => setPopup(false)}
      onConfirm={onConfirm}
    >
      Send SOL
    </SendModal>
  </Paper>
}

export default AccountList;
