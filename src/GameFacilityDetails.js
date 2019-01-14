import React from 'react';
import T from '@material-ui/core/Typography';
import { getPersonnelIcon, getRankIcon, emptyStaffObj } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PersonnelIcon from '@material-ui/icons/Group';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/AddCircle';
import StaffIcon from '@material-ui/icons/AssignmentInd';
import EjectIcon from '@material-ui/icons/Eject';
import DemolishIcon from '@material-ui/icons/GetApp';
import Alert from './dry/Alert';

import { db } from './dry/firebase';

class GameFacilityDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      personnelType: '',
      personnelCount: '0'
    };
  }

  static getDerivedStateFromProps(props, state) {
    const facility = props.facility;

    const capacity = facility.rank * 250
    if (capacity !== state.capacity) {
      return {capacity: capacity};
    }

    const staffTotal = Object.values(facility.staff).reduce((total, staff) => total + staff);
    if (staffTotal !== state.staffTotal) {
      return {staffTotal: staffTotal};
    }
    return null;
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

  staffUpdate = () => {
    const player = this.props.player;
    const gameId = this.props.game.uid;
    const refPlayer = 'games/' + gameId + '/players/' + player.uid;
    const pType = this.state.personnelType;
    const pCount = this.state.personnelCount;
    const personnel = player.personnel[pType] || 0;
    const staff = this.props.facility.staff[pType] || 0;
    const capacity = this.state.capacity;

    const staffMath = () => {
      const updatePlayerData = {}; // fb db multi location deep update
      updatePlayerData["personnel/" + pType] = personnel - pCount;
      updatePlayerData["industries/" + this.props.industryType + "/facilities/" + this.props.facilityKey + "/staff/" + pType] = staff + pCount;
      db.ref(refPlayer).update(updatePlayerData);
      this.setState({personnelCount: 0});
    }

    if (pType && pCount !== 0) {
      if (pCount > 0 &&
          personnel >= pCount &&
          staff + pCount <= capacity) {
        // add personnel to staff
        staffMath();
      } else if (pCount < 0 && staff >= (-1 * pCount)) {
        // return staff to personnel
        staffMath();
      }
    }
  }

  staffEvacuate = () => {
    const player = this.props.player;
    const gameId = this.props.game.uid;
    const refPlayer = 'games/' + gameId + '/players/' + player.uid;
    const staff = this.props.facility.staff;
    const newPersonnel = Object.assign({}, this.props.player.personnel);

    Object.entries(staff).forEach(staffPair => {
      newPersonnel[staffPair[0]] += staffPair[1];
    });

    const updatePlayerData = {}; // fb db multi location deep update
    updatePlayerData["personnel"] = newPersonnel;
    updatePlayerData["industries/" + this.props.industryType + "/facilities/" + this.props.facilityKey + "/staff"] = emptyStaffObj();

    db.ref(refPlayer).update(updatePlayerData);
  }

  handleDemolish = () => {
    const player = this.props.player;
    const facilityKey = this.props.facilityKey;
    const gameId = this.props.game.uid;
    const refFacility = 'games/' + gameId + '/players/' + player.uid + "/industries/" + this.props.industryType + "/facilities/" + facilityKey;

    db.ref(refFacility).remove();
  }

  handleExpand = () => {
    const player = this.props.player;
    if (player.money >= 3000000) {
      const facilityKey = this.props.facilityKey;
      const gameId = this.props.game.uid;
      const facility = this.props.facility;

      const refPlayer = 'games/' + gameId + '/players/' + player.uid;

      const updatePlayerData = {}; // fb db multi location deep update
      updatePlayerData["money"] = player.money - 3000000;
      updatePlayerData["industries/" + this.props.industryType + "/facilities/" + facilityKey + "/rank"] = ++facility.rank;

      db.ref(refPlayer).update(updatePlayerData);
    }
  }

  render() {
    const player = this.props.player;
    const facility = this.props.facility;
    const turnArrow = this.state.personnelCount < 0 ? {transform: 'scaleX(-1)', transition: 'transform 0.5s'} : {transition: 'transform 0.5s'};

    return (
      <Grid container>
        <Grid item xs={4}>
          <T>{getRankIcon(facility.rank)}
            {facility.rank === 1 ? "Labs"
            : facility.rank === 2 ? "Base"
            : "Citadel"}
          </T>
        </Grid>
        <Grid item xs={4}>
          <Alert icon={<DemolishIcon />} preview="Demo">
            <Grid container>
              <Grid item xs={12}>
                <T>Demolish this facility?</T>
              </Grid>
              <Grid item xs={12}>
                <T>Staff will be terminated.</T>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={this.handleDemolish} variant="outlined" color="primary">Demolish</Button>
              </Grid>
            </Grid>
          </Alert>
        </Grid>
        <Grid item xs={4}>
          <T><StaffIcon /> {this.state.staffTotal} / {this.state.capacity}</T>
        </Grid>
        <Grid item xs={6}>
          {facility.rank < 3
          ? <Alert icon={<AddIcon />} preview="Expand">
            <T>
              <Grid item xs={12}>
                Expand this facility for $3M?
              </Grid>
              <Grid item xs={12}>
                This increases capacity, improves defenses, and is more cost effective housing per employee.
              </Grid>
              <Grid item xs={12}>
                <Button onClick={this.handleExpand} variant="outlined" color="primary">Expand</Button>
              </Grid>
            </T>
          </Alert>
          : <T>MAXXED</T>}
        </Grid>
        <Grid item xs={6}>
          <Alert icon={<EjectIcon />} preview="Evacuate">
            <Grid item xs={12}>
              <T>Return all staff to Personnel?</T>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => this.staffEvacuate()} variant="outlined" color="primary">Evacuate</Button>
            </Grid>
          </Alert>
        </Grid>
        {Object.entries(facility.staff).map((staffPair, i) =>
          <Grid item xs={12} key={i}>
            <T onClick={() => this.handleType(staffPair[0])}>
              {getPersonnelIcon(staffPair[0])} {staffPair[1] || '0'}
            </T>
          </Grid>
        )}
        <Grid item xs={12}>
          <T style={{marginTop: 22}}>
            {player.personnel[this.state.personnelType]}
            <PersonnelIcon />
            <ArrowRightIcon style={turnArrow}/>
            <StaffIcon />
          </T>
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
          <Button onClick={() => this.staffUpdate()}>
            <CheckIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <T>{this.state.personnelCount >= 0 ? "Assign" : "Standby"}</T>
        </Grid>
      </Grid>
    )
  };
}

export default GameFacilityDetails;
