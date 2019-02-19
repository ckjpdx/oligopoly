import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PolicyIcon from '@material-ui/icons/Flag';
import MarketIcon from '@material-ui/icons/ShowChart';
import FacilitiesIcon from '@material-ui/icons/Business';
import PersonnelIcon from '@material-ui/icons/Group';
import ReportsIcon from '@material-ui/icons/ListAlt';
import OperationsIcon from '@material-ui/icons/VisibilityOff';
import { ReactComponent as SwordsIcon } from './img/sword.svg';

import Spinner from './dry/Spinner';
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

import ChartDemand from './dry/ChartDemand';
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

  endTurn = () => {
    const endTurn = firebase.functions().httpsCallable('endTurn');
    endTurn({gameUid: this.state.game.uid}).then((result) => {
      // console.log(result);
    }).catch(function(error) {
      // console.log(error);
    });
  }

  render() {
    const game = this.state.game;
    const uid = 'jacko';
    const player = game.players[uid];

    return (
      <div className="Game">
        {!game ? <Spinner full/> :
          !player ? <Spinner full/> :
            <React.Fragment>
              <GameBar player={player} />
              <GameOverview game={game} endTurn={this.endTurn}/>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Dialog icon={<ReportsIcon/>} title="Reports" help={help.reports} marquee={true}>
                        <GameReports game={game} player={player}/>
                      </Dialog>
                    </Grid>
                    <Grid item xs={12}>
                      <Dialog icon={<MarketIcon/>} title="Market" help={help.market}>
                        <GameMarket game={game} player={player}/>
                      </Dialog>
                    </Grid>
                    <Grid item xs={12}>
                      <Dialog icon={<PersonnelIcon/>} title="Personnel" help={help.personnel}>
                        <GamePersonnel game={game} player={player}/>
                      </Dialog>
                    </Grid>
                    <Grid item xs={12}>
                      <Dialog icon={<FacilitiesIcon/>} title="Facilities" help={help.facilities}>
                        <GameFacilities game={game} player={player}/>
                      </Dialog>
                    </Grid>
                    <Grid item xs={12}>
                      <Dialog icon={<PolicyIcon/>} title="Policy" help={help.policy}>
                        <GamePolicy game={game} player={player}/>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>
                <Hidden smDown>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ChartDemand game={game} />
                    </Grid>
                  </Grid>
                </Grid>
                </Hidden>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Expand icon={<SwordsIcon className="custom"/>} title="Rivals">
                        <GameRivals game={game} player={player}/>
                      </Expand>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
  {            // <Grid item xs={12} sm={6}>
              //   <Dialog icon={<OperationsIcon/>} preview="Operations" title="Operations" help={help.operations}>
              //     <GameOperations game={game} player={player}/>
              //   </Dialog>
              // </Grid>
              // <Grid item xs={12} sm={6}>
              //   <input onChange={this.handleChangeText} />
              //   <Button onClick={this.cloudAddMessage}>cloud</Button>
              // </Grid>
  }         </React.Fragment>
        }
      </div>
    );
  }
}

export default Game;
