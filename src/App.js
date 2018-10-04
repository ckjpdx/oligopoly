import React, { Component } from 'react';
import Welcome from './Welcome';
import Lobby from './Lobby';
import Game from './Game';
import Login from './Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import themeOverride from './dry/themeOverride';
import { firebase } from './dry/firebase';

import { withTheme } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme(themeOverride);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      gameId: 'abc'
    };
    firebase.auth().onAuthStateChanged(user =>
      user
      ? this.setState({user: {name: user.displayName, uid: user.uid}})
      : this.setState({user: {name: 'Player1', uid: 12345}})
    );
  }

  selectGame = (gameId) => this.setState({gameId: gameId});
  exitGame = () => this.setState({gameId: null});

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
            <CssBaseline />
            <Login user={this.state.user}
              gameId={this.state.gameId}
              onExit={this.exitGame} />
            {!this.state.user
              ? <Welcome />
              : !this.state.gameId
              ? <Lobby onSelectGame={this.selectGame} />
              : <Game user={this.state.user} gameId={this.state.gameId} />}
          </div>
      </MuiThemeProvider>
    );
  }
}

export default withTheme()(App);
