import React from 'react';
import Grid from '@material-ui/core/Grid';
import T from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import BankIcon from '@material-ui/icons/AccountBalance';
import { addCommas } from './dry/functions';

function GameBarBank(props) {

  const player = props.player;

  return (
    <Grid container className="GameBarBank">
      <Grid item xs={12}>
        <T variant="headline"><MoneyIcon /> Money</T>
      </Grid>
      <Grid item xs={12}>
        <T variant="display1">${addCommas(player.money)}</T>
      </Grid>
      <Grid item xs={12}>
        <T variant="headline"><BankIcon /> Loans</T>
      </Grid>
      {!!player.debt &&
        <React.Fragment>
          <Grid item xs={12}>
            <T variant="headline">
              Debt: <span style={{color: 'red'}}>${addCommas(player.debt)}</span>
            </T>
          </Grid>
          <Grid item xs={12}>
            <Button>Bankruptcy</Button>
          </Grid>
        </React.Fragment>
      }
      {!player.debt &&
        <Grid item xs={12}>
          Borrow:
          <Button>10M</Button>
          <Button>50M</Button>
        </Grid>
      }
      <Grid item xs={12}>
        <Button>Pay Down</Button>
      </Grid>
    </Grid>
  )
}

export default GameBarBank;
