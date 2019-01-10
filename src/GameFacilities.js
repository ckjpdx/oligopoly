import React from 'react';
import Typography from '@material-ui/core/Typography';
import { addCommas, getIndustryIcon, industryTypes, getPersonnelIcon, getRankIcon, emptyStaffObj } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from './dry/Dialog';
import Alert from './dry/Alert';
import GameFacilityDetails from './GameFacilityDetails';

import SchemaIcon from '@material-ui/icons/Memory';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import FacilitiesIcon from '@material-ui/icons/Business';
import AddIcon from '@material-ui/icons/AddCircle';

import { withTheme } from '@material-ui/core/styles';

import { db } from './dry/firebase';

class GameFacilities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: null,
      industryType: null,
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

      db.ref(refPlayer + '/industries/' + industryType + '/facilities').push(
        {rank: 1, staff: emptyStaffObj()}
      );
      db.ref(refPlayer).update(
        {money: player.money - 1000000}
      );
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
          {industryTypes.map((type, i) =>
            <Tab icon={getIndustryIcon(type)} label={type} key={i}/>
          )}
        </Tabs>
        {/* LIST INDUSTRY */}
        {Object.entries(player.industries).map((industryPair, i) =>
          this.state.industryType === industryPair[0] &&
          <Grid container key={i}>
            <Grid item xs={12}>
              <Typography><SchemaIcon />LVL {industryPair[1].schema}</Typography>
            </Grid>
            {/* LIST PLAYER FACILITIES */}
            {industryPair[1].facilities &&
              Object.keys(industryPair[1].facilities).map(key =>
                <Grid item xs={12} key={key}>
                  <Dialog
                    preview={facilityPreview(industryPair[1].facilities[key])}
                    title="Facility Details"
                    help=""
                    noPad={true}
                    icon={<FacilitiesIcon />}>
                      <GameFacilityDetails game={game} player={player} facility={industryPair[1].facilities[key]} facilityKey={key} industryType={industryPair[0]} />
                  </Dialog>
                </Grid>
              )
            }
            <Grid item xs={12} style={{background: this.props.theme.palette.neutral.main}}>
              <Alert preview="New" icon={<AddIcon />}>
                <Grid item xs={12}>
                  <Typography>
                    <MoneyIcon /> {addCommas(player.money)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Build a new facility for $1M?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={this.handleNewFacility} color="primary" variant="outlined">
                    <FacilitiesIcon/> PURCHASE
                  </Button>
                </Grid>
              </Alert>
            </Grid>
          </Grid>
        )}
      </div>
    )
  };
}

export default withTheme()(GameFacilities);
