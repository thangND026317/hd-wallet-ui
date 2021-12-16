import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button, Paper, AppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import ReceiveIcon from '@mui/icons-material/WorkOutline';

import './AccountList.css';

const AccountList = ({ account, balance }) => {
  const [expanding, setExpanding] = useState('false')

  return <Paper style={{ width: '80%', marginTop: '20px' }}>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Main account
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
            secondary={account} />
          {expanding ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      {expanding && <div className="button-container">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ReceiveIcon />}
        // onClick={/* Request airdrop function */}
        >
          Air-drop
        </Button>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<SendIcon />}
        // onClick={/* Send function */}
        >
          Send
        </Button>
      </div>}

    </List>
  </Paper>
}

export default AccountList;
