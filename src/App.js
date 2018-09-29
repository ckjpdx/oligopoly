import React, { Component } from 'react';
import Welcome from './Welcome';
import Lobby from './Lobby';
import Game from './Game';
import Login from './Login';
import CssBaseline from '@material-ui/core/CssBaseline';

import firebase from './firebase';

import { withTheme } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: '#674388',
    },
    secondary: {
      main: '#414a6d',
    },
  },
  typography: {
    fontFamily: 'Rajdhani',
    fontSize: 18
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiListItemIcon: {
      root: {
        marginRight: 0
      }
    },
    MuiSvgIcon: {
      root: {
        verticalAlign: 'text-bottom',
        color: 'white'
      }
    }
  }
});

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
          <div className="App" align="center">
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
