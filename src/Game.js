import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip'; // use for this?
import PolicyIcon from '@material-ui/icons/Flag';
import MarketIcon from '@material-ui/icons/ShowChart';
import FacilitiesIcon from '@material-ui/icons/Business';
import PersonnelIcon from '@material-ui/icons/Group';
import ReportsIcon from '@material-ui/icons/ListAlt';
import OperationsIcon from '@material-ui/icons/VisibilityOff';

import Dialog from './dry/Dialog';
import { help } from './dry/text';
import GameBar from './GameBar';
import GameOverview from './GameOverview';
import GameMarket from './GameMarket';
import GamePolicy from './GamePolicy';
import GameFacilities from './GameFacilities';
import GamePersonnel from './GamePersonnel';
import GameReports from './GameReports';
import GameOperations from './GameOperations';

import { firebase, db } from './dry/firebase';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        players: {}
      }
    }
  }
  componentWillMount() {
    db.ref('games/' + this.props.gameUid).on('value', snap => this.setState({game: snap.val()}));
  }
  componentWillUnmount() {
    db.ref('games/' + this.props.gameUid).off();
  }
  cloudAddMessage = () => {
    console.log('Send the text!!');
    const addMessage = firebase.functions().httpsCallable('addMessage');
    addMessage({text: this.state.text}).then((result) => {
      console.log(result.data.text);
    });
  }

  render() {
    const game = this.state.game;
    const uid = 'jacko';
    const player = game.players[uid];

    return (
      <div className="Game">
        {!game ? <CircularProgress /> :
          !player ? <CircularProgress /> :
          <Grid container>
            <GameBar player={player} />
            <Grid item xs={12}>
              <GameOverview game={game} player={player}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Dialog icon={<ReportsIcon/>} preview="Reports" title="Reports" help={help.reports} marquee={true}>
                <GameReports game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Dialog icon={<MarketIcon/>} preview="Market" title="Market" help={help.market}>
                <GameMarket game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Dialog icon={<PersonnelIcon/>} preview="Personnel" title="Personnel" help={help.personnel}>
                <GamePersonnel game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Dialog open={true} icon={<FacilitiesIcon/>} preview="Facilities" title="Facilities" help={help.facilities}>
                <GameFacilities game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Dialog icon={<PolicyIcon/>} preview="Policy" title="Policy" help={help.policy}>
                <GamePolicy game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Dialog icon={<OperationsIcon/>} preview="Operations" title="Operations" help={help.operations}>
                <GameOperations game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input onChange={this.handleChangeText} />
              <Button onClick={this.cloudAddMessage}>cloud</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              {this.state.text || <Typography>no text yet</Typography>}
            </Grid>
          </Grid>
        }
      </div>
    );
  }
}

export default Game;
