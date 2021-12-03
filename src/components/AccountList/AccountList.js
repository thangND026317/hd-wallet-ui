import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import ReceiveIcon from '@mui/icons-material/WorkOutline';

import './AccountList.css';

const AccountList = ({ account, balance }) => {
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
        onClick={() => console.log('AccountList - Receive')}
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
