import React from 'react';
// import '../../App.css';
import Container from '@material-ui/core/Container';
// import '../HeroSection/HeroSection.css';
import * as hdcore from 'hdcore-ts';
import BalancesList from '../BalancesList';
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

const HDWallet = (props) => {
  const classes = useStyles();
  // const mnemonic = props.location.mnemonic;
  // const seed = hdcore.account.createSeed(mnemonic);
  // const master = hdcore.account.createMasterAccount('501', seed);
  // const path = hdcore.account.getPath(0, 501, 1);
  //("m/44'/501'/0'/0'/1'")
  // const acc1 = hdcore.account.createChildAccount('501', seed, path);
  const transaction = hdcore.account.getTransaction('501');

  // console.log(hdcore.account.getAddress(master.pub, '501'));
  // transaction.get_balance(master.pub).then(result => console.log(result))

  return (
    <Container fixed maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.balancesContainer}>
          <BalancesList />
        </Grid>
        {/* <Grid item xs={12}>
          <DebugButtons />
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default HDWallet;