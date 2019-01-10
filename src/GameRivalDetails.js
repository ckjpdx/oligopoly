import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import T from '@material-ui/core/Typography';
import PlayerIcon from '@material-ui/icons/AccountCircle';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import FacilitiesIcon from '@material-ui/icons/Business';

import { industryTypes, getRankIcon, addCommas } from './dry/functions';

class GameRivalDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const game = this.props.game;
    const rival = this.props.rival;

    return (
      <Grid container justify="center" className="GameRivalDetails">
          <Grid item xs={12}>
            <MoneyIcon />{addCommas(rival.money)}
          </Grid>
          <Grid item xs={12}>
            Facilities
          </Grid>
            {Object.entries(rival.industries).map((indyPair, i) =>
              <Grid container key={i}>
                <Grid item xs={1}>
                  {indyPair[0].toUpperCase()}
                </Grid>
                <Grid item xs={11}>
                  {Object.values(indyPair[1].facilities).map((facility, i) =>
                    <div key={i}><FacilitiesIcon />{getRankIcon(facility.rank)}</div>
                  )}
                </Grid>
              </Grid>
            )}
      </Grid>
    )
  };
}

export default GameRivalDetails;