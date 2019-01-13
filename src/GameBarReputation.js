import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReputationIcon from '@material-ui/icons/ThumbsUpDown';
import T from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function GameBarReputation(props) {

  const player = props.player;

  return (
    <Grid container className="GameBarReputation">
      <Grid item xs={12}>
        <T variant="headline">Reputation</T>
      </Grid>
      <Grid item xs={12}>
        <T variant="display1"><ReputationIcon /> {player.reputation + '%'}</T>
      </Grid>
      <Grid item xs={12}>
        <Button>Propagandize</Button>
      </Grid>
    </Grid>
  )
}

export default GameBarReputation;
