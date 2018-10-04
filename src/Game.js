import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip'; // use for this?
import PolicyIcon from '@material-ui/icons/Star';
import MarketIcon from '@material-ui/icons/Equalizer';
import BuildingIcon from '@material-ui/icons/Business';
import Dialog from './dry/Dialog';
import GameBar from './GameBar';
import GameMarket from './GameMarket';
import GamePolicy from './GamePolicy';
import GameFacilities from './GameFacilities';

import {firebase, db} from './dry/firebase';

// const db = firebase.database();

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        players: {}
      },
      data: '',
      toData: ''
    }
  }
  componentWillMount() {
    db.ref('games/' + this.props.gameId).on('value', snap => this.setState({game: snap.val()}));
  }
  componentWillUnmount() {
    db.ref('games/' + this.props.gameId).off();
  }

  handleChangeText = (e) => {
    this.setState({text: e.target.value});
  }
  handleDbTextChange = (e) => {
    this.setState({toData: e.target.value});
  }
  cloudAddMessage = () => {
    console.log('Send the text!!');
    const addMessage = firebase.functions().httpsCallable('addMessage');
    addMessage({text: this.state.text}).then((result) => {
      console.log(result.data.text);
    });
  }
  updateTextData = () => {
    db.ref('games/').update({data: this.state.toData})
  }
  render() {
    const game = this.state.game;
    const jacko = 'jacko';
    const player = game.players[jacko];

    return (
      <div className="Game">
        {!game ? <CircularProgress /> :
          !player ? <CircularProgress /> :
          <Grid container>
            <GameBar player={player} />
            <Grid item xs={12}>
              <Dialog icon={<PolicyIcon/>} text={game.policy} title={"Policy"}>
                <GamePolicy game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12}>
              <Dialog icon={<MarketIcon/>} text={game.market.status} title={"Market"}>
                <GameMarket game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12}>
              <Dialog icon={<BuildingIcon/>} text="Facilities" title={"Facilities"}>
                <GameFacilities game={game} player={player}/>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={4}>
              <input onChange={this.handleChangeText} />
              <Button onClick={this.cloudAddMessage}>cloud</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <input onChange={this.handleDbTextChange} />
              <Button onClick={this.updateTextData}>database</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              {this.state.text || <Typography>no text yet</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => console.log(this.state)}>Check State</Button>
            </Grid>
          </Grid>
        }
      </div>
    );
  }
}

export default Game;
