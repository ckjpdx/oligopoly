import React, { Component } from 'react';
import Welcome from './Welcome';
import Lobby from './Lobby';
import Game from './Game';
import Login from './Login';
import CssBaseline from '@material-ui/core/CssBaseline';

import firebase from 'firebase';

import { withTheme } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: '#880e4f',
    },
    secondary: {
      main: '#4a148c',
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      gameId: null,
    };
    firebase.auth().onAuthStateChanged(user =>
      user
      ? this.setState({user: {name: user.displayName, email: user.email}})
      : this.setState({user: null})
    );
  }

  selectGame = (gameId) => this.setState({gameId: gameId});
  exitGame = () => this.setState({gameId: null});

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App" align="center">
            <CssBaseline />
            <Login user={this.state.user} />
            {!this.state.user
              ? <Welcome />
              : this.state.gameId
              ? <Game onExit={this.exitGame} />
              : <Lobby onSelectGame={this.selectGame}/>}
          </div>
      </MuiThemeProvider>
    );
  }
}

export default withTheme()(App);
