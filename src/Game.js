import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PolicyIcon from '@material-ui/icons/Flag';
import MarketIcon from '@material-ui/icons/ShowChart';
import FacilitiesIcon from '@material-ui/icons/Business';
import PersonnelIcon from '@material-ui/icons/Group';
import ReportsIcon from '@material-ui/icons/ListAlt';
import OperationsIcon from '@material-ui/icons/VisibilityOff';
import { ReactComponent as SwordsIcon } from './img/sword.svg';

import Dialog from './dry/Dialog';
import Expand from './dry/Expand';
import { help } from './dry/text';
import GameBar from './GameBar';
import GameOverview from './GameOverview';
import GameMarket from './GameMarket';
import GamePolicy from './GamePolicy';
import GameFacilities from './GameFacilities';
import GamePersonnel from './GamePersonnel';
import GameReports from './GameReports';
import GameOperations from './GameOperations';
import GameRivals from './GameRivals';

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
            <Grid item xs={12}>
              <Expand icon={<SwordsIcon className="custom"/>} title="Rivals">
                <GameRivals game={game} player={player}/>
              </Expand>
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
              <Dialog icon={<FacilitiesIcon/>} preview="Facilities" title="Facilities" help={help.facilities}>
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
          </Grid>
        }
      </div>
    );
  }
}

export default Game;
