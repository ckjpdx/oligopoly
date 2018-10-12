import React from 'react';
import Typography from '@material-ui/core/Typography';
import { addCommas, getPersonnelIcon, personnelTypes, personnelCosts } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
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
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import AddPersonIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';

import Divider from '@material-ui/core/Divider';

import { db } from './dry/firebase';

class GameFacilities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      personnelType: null,
      personnelCount: 0
    };
  }

  handleChange = type => {
    this.setState({
      personnelType: type
    });
  };

  handleCount = e => {
    this.setState({
      personnelCount: e.target.value
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
    const cost = this.state.personnelCount >= 0
      ? this.state.personnelType
        ? this.state.personnelCount * personnelCosts[this.state.personnelType]
        : '---'
      : 'Terminate';

    return (
      <Grid container>
        {personnelTypes.map(type =>
          <Grid item xs={12}>
            <Typography onClick={() => this.handleChange(type)}>
              {getPersonnelIcon(type)} {player.personnel[type] || '0'} {type}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider />
          <TextField
            id="personnel-count-change"
            className="max-width-100px"
            label={this.state.personnelType || 'select type'}
            value={this.state.personnelCount}
            onChange={this.handleCount}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <Button onClick={() => this.handleUpdate()}><CheckIcon/></Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {isNaN(cost) ? cost : '$' + addCommas(cost)}
          </Typography>
        </Grid>
      </Grid>
    )
  };
}

export default GameFacilities;
