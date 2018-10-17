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
      personnelType: '',
      personnelCount: '0',
      personnelCost: ''
    };
  }

  updateCost = () =>
  this.state.personnelType
    ? this.state.personnelCount >= 0
      ? this.setState({personnelCost: this.state.personnelCount * personnelCosts[this.state.personnelType]})
      : this.setState({personnelCost: 'Terminate'})
    : this.setState({personnelCost: 'Select type from list above'})

  handleType = type => {
    this.setState({
      personnelType: type,
    }, () => this.updateCost());
  };

  handleCount = e => {
    this.setState({
      personnelCount: parseInt(e.target.value),
    }, () => this.updateCost());
  };

  handleConfirm = (player) => {
    const gameId = this.props.game.uid;
    const playerUid = this.props.player.uid;
    const refPlayerPersonnel = 'games/' + gameId + '/players/' + playerUid + '/personnel';
    const type = this.state.personnelType;
    const count = this.state.personnelCount;
    const cost = parseInt(this.state.personnelCost);
    const currPersonnel = player.personnel[type] || 0;

    if (this.state.personnelType) {
      if (player.money >= cost && count > 0) {
        console.log(count, player.personnel);
        db.ref(refPlayerPersonnel).update({
          [type]: currPersonnel + count
        });
        db.ref(refPlayerPersonnel).update({
          money: player.money - cost
        });
        this.setState({personnelCount: 0});
      }
      else if (isNaN(cost) && count < 0 && currPersonnel > 0) {
        db.ref(refPlayerPersonnel).update({
          [type]: count + this.props.player.personnel[type] || 0
        });
        this.setState({personnelCount: 0});
      }
    }
  };

  render() {
    const game = this.props.game;
    const player = this.props.player;
    const cost = this.state.personnelCost;

    return (
      <Grid container>
        {personnelTypes.map(type =>
          <Grid item xs={12}>
            <Typography onClick={() => this.handleType(type)}>
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
          <Button onClick={() => this.handleConfirm(player)}><CheckIcon/></Button>
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
