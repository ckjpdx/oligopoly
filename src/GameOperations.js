import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import PublicIcon from '@material-ui/icons/Visibility';
import CovertIcon from '@material-ui/icons/VisibilityOff';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { db } from './dry/firebase';

class GameNews extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const game = this.props.game;
    const player = this.props.player;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<CovertIcon />}>
            <Typography>Global News</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<PublicIcon />}>
            <Typography>Global News</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  };
}

export default GameNews;
