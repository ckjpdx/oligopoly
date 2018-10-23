import React from 'react';
import Typography from '@material-ui/core/Typography';
import { addCommas, getPersonnelIcon, personnelTypes, personnelCosts, getRankIcon } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import AddPersonIcon from '@material-ui/icons/PersonAdd';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import FacilitiesIcon from '@material-ui/icons/Business';
import Divider from '@material-ui/core/Divider';
import PersonnelIcon from '@material-ui/icons/Group';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/AddCircle';
import StaffIcon from '@material-ui/icons/AssignmentInd';
import ExitIcon from '@material-ui/icons/Launch';

import { db } from './dry/firebase';

class GameFacilityDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      personnelType: '',
      personnelCount: '0',
      turnArrow: {transform: 'rotate(180deg)'}
    };
  }

  handleType = type => {
    this.setState({
      personnelType: type,
    })
  };

  handleCount = e => {
    this.setState({
      personnelCount: parseInt(e.target.value),
    })
  };

  updatePersonnel = () => {
    const player = this.props.player;
    const gameId = this.props.game.uid;
    const refPlayer = 'games/' + gameId + '/players/' + player.uid;
    const type = this.state.personnelType;
    const count = this.state.personnelCount;
    const currentTypeCount = player.personnel[type] || 0;

    if (this.state.personnelType) {
      if (true) {
        // db.ref(refPlayer + '/personnel').update({
        //   [type]: currentTypeCount + count
        // });
        // db.ref(refPlayer).update({
        //   money: player.money - cost
        // }, () => this.updateCost());
        this.setState({personnelCount: 0});
      }
      else if (true) {
        // db.ref(refPlayer + '/personnel').update({
        //   [type]: count + player.personnel[type] || 0
        // });
        this.setState({personnelCount: 0});
      }
    }
  };

  render() {
    const game = this.props.game;
    const player = this.props.player;
    const facility = this.props.facility;
    const staffTotal = Object.values(facility.staff).reduce((total, staff) => total + staff);
    const capacity = facility.rank * 250;

    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography>{getRankIcon(facility.rank)}
            {facility.rank === 1 ? "Base" 
            : facility.rank === 2 ? "Complex"
            : "Citadel"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography><StaffIcon /> {staffTotal} / {capacity}</Typography>
        </Grid>
        <Grid item xs={6}>
          {facility.rank < 3
          ? <Button>
             <AddIcon /> Expand
            </Button>
          : <Typography>MAXXED</Typography>}
        </Grid>
        <Grid item xs={6}>
          <Button>
            <ExitIcon /> Evacuate
          </Button>
        </Grid>
        {personnelTypes.map(type =>
          <Grid item xs={12}>
            <Typography onClick={() => this.handleType(type)}>
              {getPersonnelIcon(type)} {player.personnel[type] || '0'} {type}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
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
          <Button onClick={() => this.updatePersonnel(player)}>
            <CheckIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <PersonnelIcon />
          <Typography><ArrowRightIcon style={this.state.turnArrow}/></Typography>
          <StaffIcon />
        </Grid>
        <Grid item xs={12}>
          <Typography>{this.state.personnelType > 0 ? "Assign" : "Dismiss"}</Typography>
        </Grid>
      </Grid>
    )
  };
}

export default GameFacilityDetails;
