import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { addCommas, getIndustryIcon, industryTypes } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MarketIcon from '@material-ui/icons/Equalizer';
import BoomIcon from '@material-ui/icons/TrendingUp';
import BustIcon from '@material-ui/icons/TrendingDown';
import NormalIcon from '@material-ui/icons/TrendingFlat';
import ArmsIcon from '@material-ui/icons/Star';
import RoboIcon from '@material-ui/icons/Adb';
import NanoIcon from '@material-ui/icons/BlurOn';
import FuzeIcon from '@material-ui/icons/OfflineBolt';
import ListIcon from '@material-ui/icons/List';
import SchemaIcon from '@material-ui/icons/Memory';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import PersonnelPoolIcon from '@material-ui/icons/Weekend';
import EngineerIcon from '@material-ui/icons/Build';

import { db } from './dry/firebase';

class GameFacilities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      industryType: 'arms',
      schemaChange: 1
    };
  }

  handleChange = (event, value) => {
    this.setState({
      tab: value,
      industryType: industryTypes[value]
    });
  };

  updateIndustrySchema = (industry) => {
    console.log(industry);
    const player = this.props.player;
    const playerUid = player.uid;
    const currentSchema = player.industries[industry].schema;
    const updateValue = currentSchema + this.state.schemaChange;
    db.ref('games/abc/players/' + playerUid + '/industries/' + industry).update({
      schema: updateValue
    });
  }

  render() {
    const game = this.props.game;
    const player = this.props.player;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography><ListIcon /> Current</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
            {
              Object.entries(player.industries).map(industry =>
                <Grid item xs={12}>
                  <Typography>
                    {getIndustryIcon(industry[0])}{industry[0]}: <SchemaIcon />{industry[1].schema}
                  </Typography>
                  <Button onClick={() => this.updateIndustrySchema(industry[0])}>Add Schema</Button>
                </Grid>
              )
            }
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography><MoneyIcon /> Purchase</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Tabs
              value={this.state.tab}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="secondary"
              textColor="secondary"
              >
                {
                  industryTypes.map(type =>
                    <Tab icon={getIndustryIcon(type)} label={type} />
                  )
                }
              </Tabs>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Grid container>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>
      </div>
    )
  };
}

export default GameFacilities;
