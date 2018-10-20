import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { addCommas, getIndustryIcon, industryTypes, getPersonnelIcon } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

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
import { ReactComponent as RankIcon } from './img/chevrons.svg';

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

  tabChange = (event, value) => {
    this.setState({
      tab: value,
      industryType: industryTypes[value]
    });
  };

  render() {
    const game = this.props.game;
    const player = this.props.player;

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
        <Grid item xs={12}>
          <Button style={{padding:'0', width:'100%'}}><Typography><AddIcon /> NEW</Typography></Button>
        </Grid>
          {Object.entries(player.industries).map((industryPair, i) =>
            this.state.tab === i &&
            <Grid container>
              <Grid item xs={12}>
                <Typography><SchemaIcon />LVL {industryPair[1].schema}</Typography>
              </Grid>
                {industryPair[1].facilities.map((facility, i) =>
                  <Paper style={{width: '100%'}}>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography>
                          <FacilitiesIcon/> <RankIcon className="custom" /> {facility.level}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>
                          {Object.entries(facility.staff).map((stafferPair, i) =>
                            <span>{getPersonnelIcon(stafferPair[0])}{stafferPair[1]} </span>
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              <Grid item xs={6}>

              </Grid>
            </Grid>
          )}
      </div>
    )
  };
}

export default GameFacilities;
