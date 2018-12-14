import React from 'react';
import Typography from '@material-ui/core/Typography';
import { addCommas, getPersonnelIcon, personnelTypes, personnelCosts } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import AddPersonIcon from '@material-ui/icons/PersonAdd';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';

import { db } from './dry/firebase';

class GameFacilities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      personnelType: '',
      personnelCount: '0',
      personnelCost: 'Select type from list'
    };
  }

  updateCost = () =>
  this.state.personnelType
    ? this.state.personnelCount >= 0
      ? this.setState({personnelCost: this.state.personnelCount * personnelCosts[this.state.personnelType]})
      : this.setState({personnelCost: 'Terminate'})
    : this.setState({personnelCost: 'Select type from list'})

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

  updatePersonnel = () => {
    const player = this.props.player;
    const gameId = this.props.game.uid;
    const refPlayer = 'games/' + gameId + '/players/' + player.uid;
    const type = this.state.personnelType;
    const count = this.state.personnelCount;
    const cost = parseInt(this.state.personnelCost);
    const currentTypeCount = player.personnel[type] || 0;

    if (this.state.personnelType) {
      if (player.money >= cost && count > 0) {
        db.ref(refPlayer + '/personnel').update({
          [type]: currentTypeCount + count
        });
        db.ref(refPlayer).update({
          money: player.money - cost
        }, () => this.updateCost());
        this.setState({personnelCount: 0});
      }
      else if (isNaN(cost) && count < 0 && currentTypeCount > 0) {
        db.ref(refPlayer + '/personnel').update({
          [type]: count + player.personnel[type] || 0
        });
        this.setState({personnelCount: 0});
      }
    }
  };

  render() {
    // const game = this.props.game;
    const player = this.props.player;
    const cost = this.state.personnelCost;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>
            <HomeIcon />
          </Typography>
        </Grid>
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
          <Button onClick={() => this.updatePersonnel(player)} style={{marginTop: 25}}>
            {this.state.personnelCount > 0 ? <AddPersonIcon/> : <RemoveIcon/> }
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <MoneyIcon /> {addCommas(player.money)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {isNaN(cost) ? cost : '$-' + addCommas(cost)}
          </Typography>
        </Grid>
      </Grid>
    )
  };
}

export default GameFacilities;
