import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import firebase from './firebase';

const db = firebase.database();

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      data: '',
      toData: ''
    }
  }
  componentWillMount() {
    db.ref('games/data').on('value', snap => this.setState({data: snap.val()}));
  }
  componentWillUnmount() {
    db.ref('games/data').off();
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
    return (
      <div className="Game">
        <Grid container>
          <Grid item xs={12} sm={4}>
            <input onChange={this.handleChangeText} />
            <Button onClick={this.handleSendText}>cloud</Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <input onChange={this.handleDbTextChange} />
            <Button onClick={this.handleSetDbTextChange}>database</Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            {this.state.text || <p>no data yet</p>}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => console.log(this.state)}>Check State</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Game;
