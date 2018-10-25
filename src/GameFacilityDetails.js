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
      personnelCount: '0'
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

  updateStaff = () => {
    const player = this.props.player;
    const gameId = this.props.game.uid;
    const refPlayer = 'games/' + gameId + '/players/' + player.uid;
    const pType = this.state.personnelType;
    const pCount = this.state.personnelCount;
    const personnel = player.personnel[pType] || 0;
    const staff = this.props.facility.staff[pType] || 0;

    console.log('FAC IND:', this.props.facilityKey);

    if (this.state.personnelType) {
      if (this.state.personnelCount > 0) {
        // ADD STAFF FROM PERSONNEL
        const updatePlayerData = {}; // fb db multi location deep update
        updatePlayerData["personnel/" + pType] = personnel - pCount;
        updatePlayerData["industries/" + this.props.industryType + "/facilities/" + this.props.facilityKey + "/staff/" + pType] = staff + pCount;
        db.ref(refPlayer).update(updatePlayerData);
        // db.ref(refPlayer).update({
        //   money: player.money - cost
        // }, () => this.updateCost());
        }
        else if (this.state.personnelCount < 0) {
          // REMOVE STAFF, RETURN TO PERSONNEL
          // db.ref(refPlayer + '/personnel').update({
          //   [pType]: pCount + player.personnel[type] || 0
          // });
        }
        this.setState({personnelCount: 0});
      }
    }

  render() {
    const game = this.props.game;
    const player = this.props.player;
    const facility = this.props.facility;
    const staffTotal = Object.values(facility.staff).reduce((total, staff) => total + staff);
    const capacity = facility.rank * 250;
    const turnArrow = this.state.personnelCount < 0 ? {transform: 'scaleX(-1)', transition: 'transform 0.5s'} : {transition: 'transform 0.5s'};

    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography>{getRankIcon(facility.rank)}
            {facility.rank === 1 ? "Labs"
            : facility.rank === 2 ? "Base"
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
        {Object.entries(facility.staff).map((staffPair, i) =>
          <Grid item xs={12} key={i}>
            <Typography onClick={() => this.handleType(staffPair[0])}>
              {getPersonnelIcon(staffPair[0])} {staffPair[1] || '0'}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography style={{marginTop: 22}}>
            {player.personnel[this.state.personnelType]}
            <PersonnelIcon />
            <ArrowRightIcon style={turnArrow}/>
            <StaffIcon />
          </Typography>
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
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => this.updateStaff()}>
            <CheckIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>{this.state.personnelCount >= 0 ? "Assign to facility" : "Dismiss to personnel"}</Typography>
        </Grid>
      </Grid>
    )
  };
}

export default GameFacilityDetails;
