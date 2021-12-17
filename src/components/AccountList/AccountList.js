import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button, Paper, AppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import ReceiveIcon from '@mui/icons-material/WorkOutline';

import SendModal from '../Modal/SendModal';
import { getAddress, getBalance, getAirdrop, sendTransaction } from '../helpers/utils';

import './AccountList.css';

const AccountList = ({ pub, prv }) => {
  const [balance, setBalance] = useState(0);
  const [expanding, setExpanding] = useState(false);
  const [airdroping, setAirdroping] = useState(false);
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState(false);

  const openPopup = () => setPopup(true);
  const closePopup = () => setPopup(false);

  const refreshBalance = async () => {
    setBalance(await getBalance(pub));
  }

  const airdrop = async () => {
    setAirdroping(true);
    await getAirdrop(pub);
    setAirdroping(false);
    refreshBalance();
  }

  const onConfirm = async (receiverAddress, amount) => {
    setSending(true);
    await sendTransaction(pub, prv, receiverAddress,amount);
    setSending(false);
    refreshBalance();
  }

  useEffect(() => {
    refreshBalance();
  }, []);

  return <Paper style={{ width: '80%', marginTop: '20px' }}>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getAddress(pub)}
        </Typography>

        <Tooltip title="Push" arrow>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
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
          // secondary={keypair} 
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
          disabled={airdroping}
        >
          {!airdroping ? "Airdrop" : "Requested"}
        </Button>


        <Button
          variant="outlined"
          color="primary"
          startIcon={<SendIcon />}
          onClick={openPopup}
          disabled={sending}
        >
          {!sending ? "Send" : "Sent"}
        </Button>
      </div>}
    </List>
    {popup && <SendModal open={popup} onClose={closePopup} onConfirm={onConfirm} />}
  </Paper>
}

export default AccountList;
