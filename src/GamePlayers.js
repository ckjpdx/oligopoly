import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlayerIcon from '@material-ui/icons/AccountCircle';

import { getMarketStatusIcon, industryTypes, getIndustryIcon } from './dry/functions';

class GamePlayers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const game = this.props.game;
    const players = game.players;
    const me = this.props.player;

    // const playerList = players.map(Objects.keys(players) => {

    return (
      <div className="GamePlayers" style={{width: '100%'}}>
        <Grid container justify="center">
        {
          Object.keys(players).map(uid =>
            <Grid item xs={12} md={4}>
              <Typography>
              <PlayerIcon />
                {players[uid].name.toUpperCase()}
              </Typography>
            </Grid>)
          }
        </Grid>
      </div>
    )
  };
}

export default GamePlayers;
