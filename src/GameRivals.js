import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlayerIcon from '@material-ui/icons/AccountCircle';
import Dialog from './dry/Dialog';
import GameRivalDetails from './GameRivalDetails';
import { help } from './dry/text';

import { getMarketStatusIcon, industryTypes, getIndustryIcon, roundMillions } from './dry/functions';

function GameRivals(props) {

  const game = props.game;
  const rivals = game.players;
  const me = props.player;

  return (
    <Grid container justify="center" className="GameRivals">
    {
      Object.values(rivals).map((rival, i) =>
        <Grid item xs={12} md={4} key={i}>
          <Dialog
            preview={`${rival.name.toUpperCase()} • $${roundMillions(rival.money)}M • ${rival.reputation}%`}
            title={rival.name.toUpperCase()}
            help={help.rival}
            open={true}
            icon={<PlayerIcon />}>
              <GameRivalDetails game={game} rival={rival} />
          </Dialog>
        </Grid>)
      }
    </Grid>
  )
}

export default GameRivals;
