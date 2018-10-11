import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addCommas, getPersonnelIcon, personnelTypes } from './dry/functions';
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
import MercIcon from '@material-ui/icons/Security';
import RoboIcon from '@material-ui/icons/Adb';
import NanoIcon from '@material-ui/icons/BlurOn';
import FuzeIcon from '@material-ui/icons/OfflineBolt';
import ListIcon from '@material-ui/icons/List';
import SchemaIcon from '@material-ui/icons/Memory';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import AddPersonIcon from '@material-ui/icons/PersonAdd';

// import MercIcon from '@material-ui/icons/Security';
// import HackerIcon from '@material-ui/icons/RssFeed';
// import WarbotIcon from '@material-ui/icons/Adb';

import { db } from './dry/firebase';

class GameFacilities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      personnelToHire: 'Merc',
      personnelCount: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({
      tab: value,
      personnelToHire: personnelTypes[value]
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
            <Typography><AddPersonIcon /> Hire</Typography>
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
                  personnelTypes.map(type =>
                    <Tab icon={getPersonnelIcon(type)} label={type} />
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
