import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReputationIcon from '@material-ui/icons/ThumbsUpDown';
import T from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import BankIcon from '@material-ui/icons/AccountBalance';
import { addCommas, roundMillions } from './dry/functions';

function GameBarFinances(props) {

  const player = props.player;
  const debt = player.debt !== 0
    ? <span style={{color: 'red'}}>${addCommas(player.debt)}</span>
    : 'N/A';

  return (
    <Grid container className="GameBarFinances">
      <Grid item xs={12}>
        <T variant="headline"><MoneyIcon /> Money</T>
      </Grid>
      <Grid item xs={12}>
        <T variant="display1">${addCommas(player.money)}</T>
      </Grid>
      <Grid item xs={12}>
        <T variant="headline"><BankIcon /> Loans</T>
      </Grid>
      <Grid item xs={12}>
        <T variant="headline">
          Debt: {debt}
        </T>
      </Grid>
      <Grid item xs={12}>
        <Button>Borrow 10M</Button>
        <Button>Bankruptcy</Button>
      </Grid>
      <Grid item xs={12}>
        <Button>Pay Down</Button>
      </Grid>
    </Grid>
  )
}

export default GameBarFinances;
