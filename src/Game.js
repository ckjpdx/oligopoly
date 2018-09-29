import React, { Component } from 'react';
import GameBar from './GameBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import BribeIcon from '@material-ui/icons/HowToVote';
import FlagIcon from '@material-ui/icons/Flag';

import firebase from './firebase';

const db = firebase.database();

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
  handleSendText = () => {
    console.log('Send the text!!');
    const addMessage = firebase.functions().httpsCallable('addMessage');
    addMessage({text: this.state.text}).then((result) => {
      console.log(result.data.text);
    });
  }
  handleSetDbTextChange = () => {
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
            <Grid item xs={6}>
              <Typography></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><FlagIcon />{game.policy}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <input onChange={this.handleChangeText} />
              <Button onClick={this.handleSendText}>cloud</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <input onChange={this.handleDbTextChange} />
              <Button onClick={this.handleSetDbTextChange}>database</Button>
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
