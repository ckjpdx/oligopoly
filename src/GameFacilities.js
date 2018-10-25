import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { addCommas, getIndustryIcon, industryTypes, getPersonnelIcon, getRankIcon, personnelTypes } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Dialog from './dry/Dialog';
import GameFacilityDetails from './GameFacilityDetails';
import GameFacilityNew from './GameFacilityNew';

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
import FacilitiesIcon from '@material-ui/icons/Business';
import AddIcon from '@material-ui/icons/AddCircle';
import { ReactComponent as Rank1Icon } from './img/chevron1.svg';

import { withTheme } from '@material-ui/core/styles';

import { db } from './dry/firebase';

class GameFacilities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      industryType: 'arms',
    };
  }

  tabChange = (event, value) => {
    this.setState({
      tab: value,
      industryType: industryTypes[value]
    });
  };

  handleNewFacility = () => {
    const player = this.props.player;

    if (player.money >= 1000000) {
      const gameUid = this.props.game.uid;
      const industryType = this.state.industryType;
      const refPlayer = 'games/' + gameUid + '/players/' + player.uid;
      // make staff object
      let staffObj = {};
      personnelTypes.forEach(type => staffObj[type] = 0);
      // get facilities array and push new facility with staffObj
      const facilities = player.industries[industryType].facilities;
      facilities.push({rank: 1, staff: staffObj});
      // deep update
      const addFacility = {};
      addFacility['industries/' + industryType + '/facilities'] = facilities;
      db.ref(refPlayer).update(addFacility);
      db.ref(refPlayer).update({
        money: player.money - 1000000
      });
    }
  }

  render() {
    const game = this.props.game;
    const player = this.props.player;

    const facilityPreview = (facility) =>
      <Paper>
        <Grid container>
          <Grid item xs={1}>
            <Typography>
              {getRankIcon(facility.rank)}
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography>
              {/* LIST PERSONNEL STAFFING THIS FACILITY */}
              {Object.entries(facility.staff).map((staffPair, i) =>
                <span key={i}>{getPersonnelIcon(staffPair[0])}{staffPair[1]} </span>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Paper>;

    return (
      <div>
        <Tabs
          value={this.state.tab}
          onChange={this.tabChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          {industryTypes.map(type =>
            <Tab icon={getIndustryIcon(type)} label={type} />
          )}
        </Tabs>
        {/* LIST INDUSTRY */}
        {Object.entries(player.industries).map((industryPair, i) =>
          this.state.industryType === industryPair[0] &&
          <Grid container>
            <Grid item xs={12}>
              <Typography><SchemaIcon />LVL {industryPair[1].schema}</Typography>
            </Grid>
            {/* LIST PLAYER FACILITIES */}
            {Object.values(industryPair[1].facilities).map((facility, i) =>
              <Grid item xs={12} key={i}>
                <Dialog
                  preview={facilityPreview(facility)}
                  title="Facility Details"
                  help=""
                  noPad={true}
                  icon={<FacilitiesIcon />}>
                    <GameFacilityDetails game={game} player={player} facility={facility} facilityKey={i} industryType={industryPair[0]} />
                </Dialog>
              </Grid>
            )}
            <GameFacilityNew player={player} onNewFacility={this.handleNewFacility}/>
          </Grid>
        )}
      </div>
    )
  };
}

export default withTheme()(GameFacilities);
