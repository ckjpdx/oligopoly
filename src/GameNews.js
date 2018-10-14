import React from 'react';
import Typography from '@material-ui/core/Typography';
import WorldIcon from '@material-ui/icons/Public';
import ReportIcon from '@material-ui/icons/Warning';
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
          <ExpansionPanelSummary expandIcon={<ReportIcon />}>
            <Typography>Internal Reports</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{display: 'block'}}>
            {
              player.reports.map(report =>
                <Typography>{report}</Typography>
              )
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<WorldIcon />}>
            <Typography>Global News</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{display: 'block'}}>
            {
              game.news.map(news =>
                <Typography>{news}</Typography>
              )
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  };
}

export default GameNews;
