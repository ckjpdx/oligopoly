import React from 'react';
import Typography from '@material-ui/core/Typography';
import GlobeIcon from '@material-ui/icons/Language';
import ReportIcon from '@material-ui/icons/Announcement';
import ImportantIcon from '@material-ui/icons/PriorityHigh';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

import { db } from './dry/firebase';

class GameReports extends React.Component {
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
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography><ReportIcon /> Internal Reports</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{display: 'block'}}>
            {
              player.reports.map(report =>
                <Paper><Typography><ImportantIcon/>{report}</Typography></Paper>
              )
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography><GlobeIcon /> Global News</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{display: 'block'}}>
            {
              game.news.map(news =>
                <Paper><Typography><ImportantIcon/>{news}</Typography></Paper>
              )
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  };
}

export default GameReports;
