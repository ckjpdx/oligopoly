import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import themeOverride from './dry/themeOverride';
import { firebase } from './dry/firebase';
import { withTheme } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Welcome from './Welcome';
import Lobby from './Lobby';
import Game from './Game';
import AppBar from './AppBar';

import Paper from '@material-ui/core/Paper';
import bgImg from './img/bg-city.jpg';

const theme = createMuiTheme(themeOverride);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      gameUid: 'abc'
    };
    firebase.auth().onAuthStateChanged(user =>
      user
      ? this.setState({user: {name: user.displayName, uid: user.uid}})
      : this.setState({user: {name: 'jacko wacko', uid: 12345}})
    );
  }

  selectGame = (gameUid) => this.setState({gameUid: gameUid});
  exitGame = () => this.setState({gameUid: null});

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <img src={bgImg} className="bg-img"/>
          <Paper className="App">
            <CssBaseline />
            <AppBar user={this.state.user}
              gameUid={this.state.gameUid}
              onExit={this.exitGame} />
              {!this.state.user
                ? <Welcome />
                : !this.state.gameUid
                ? <Lobby onSelectGame={this.selectGame} />
                : <Game user={this.state.user} gameUid={this.state.gameUid} />}
          </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
