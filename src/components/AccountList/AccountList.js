import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import ReceiveIcon from '@mui/icons-material/WorkOutline';
import * as hdcore from 'hdcore-ts';
import './AccountList.css';
import {PublicKey} from '@solana/web3.js'
import NotiProvider from '../Notification/NotiProvider'
import {store} from 'react-notifications-component'
import { width } from '@mui/system';
import 'react-notifications-component/dist/theme.css'
import "animate.css/animate.min.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const AccountList = ({ account, balance , chainid}) => {
  const noti = new NotiProvider('info') 
  return <List disablePadding>
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => console.log("Clicked listItemButton")}
        sx={{
          "&:hover": {
            backgroundColor: "#adadad",
          }
        }}>
        <ListItemText
          primary={`${balance} SOL`}
          secondary={account} />
        <ExpandMore />
      </ListItemButton>
    </ListItem>

    <div className="button-container">
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ReceiveIcon />}
        onClick={async () => {
            const pubkey = new PublicKey(account)
            const trans = hdcore.account.getTransaction(chainid);
            const bool = await trans.airdrop_one(pubkey);
            console.log(bool);
            // NotiProvider(bool);
          
          }
        } 
      >
        Receive
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<SendIcon />}
        onClick={() => console.log('AccountList - Send')}
      >
        Send
      </Button>
    </div>
  </List>
}

export default AccountList;
