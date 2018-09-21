import React, { Component } from 'react';
import './App.css';
import Start from './Start';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Jack',
      gameId: null
    }
  }
  selectGame = (gameId) => this.setState({gameId: gameId});
  render() {
    return (
      <div className="App">
        {!this.state.user
          ? <p>Login</p>
          : this.state.gameId
          ? <Game />
          : <Start onSelectGame={this.selectGame}/>}
      </div>
    );
  }
}

export default App;
