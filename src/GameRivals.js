import React from 'react';
import Grid from '@material-ui/core/Grid';
import PlayerIcon from '@material-ui/icons/AccountCircle';
import Dialog from './dry/Dialog';
import GameRivalDetails from './GameRivalDetails';
import { help } from './dry/text';

import { roundMillions } from './dry/functions';

function GameRivals(props) {

  const game = props.game;
  const rivals = game.players;
  // const me = props.player;

  return (
    <Grid container justify="center" className="GameRivals borderSides">
    {
      Object.values(rivals).map((rival, i) =>
        <Grid item xs={12} md={6} key={i}>
          <Dialog
            preview={`${rival.name.toUpperCase()} • $${roundMillions(rival.money)}M • ${rival.reputation}%`}
            title={rival.name.toUpperCase()}
            help={help.rival}
            icon={<PlayerIcon />}>
              <GameRivalDetails game={game} rival={rival} />
          </Dialog>
        </Grid>)
      }
    </Grid>
  )
}

export default GameRivals;
