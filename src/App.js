import React, { Component } from 'react';
import './App.css';
import Welcome from './Welcome';
import Lobby from './Lobby';
import Game from './Game';
import Login from './Login';
import firebase from 'firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      gameId: null,
    };
    firebase.auth().onAuthStateChanged(user =>
      user
      ? this.setState({user: user})
      : this.setState({user: null})
    );
  }

  selectGame = (gameId) => this.setState({gameId: gameId});
  exitGame = () => this.setState({gameId: null});

  render() {
    return (
      <div className="App">
        <h1>oligopoly</h1>
        <Login user={this.state.user} />
        {!this.state.user
          ? <Welcome />
          : this.state.gameId
          ? <Game onExit={this.exitGame} />
          : <Lobby onSelectGame={this.selectGame}/>}
      </div>
    );
  }
}

export default App;
