import React from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import SignInIcon from '@material-ui/icons/ExitToApp';
import SignOutIcon from '@material-ui/icons/Launch';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import firebase from './firebase';
const provider = new firebase.auth.GoogleAuthProvider();

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topMenu: false,
      topHelp: false
    }
  }

  signIn = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithPopup(provider)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  signOut = () => {
    firebase.auth().signOut()
      .catch((error) => {
        console.error(error);
      });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const showExitGame = this.props.gameId
      && <Button color="secondary"
        variant="outlined"
        onClick={() => this.props.onExit()}
      >
        <Typography>
          Exit Game
        </Typography>
      </Button>;

    return (
      <div className="Login">
        <Grid container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={4} align="left">
            <Button onClick={this.toggleDrawer('topHelp', true)}>
              <HelpIcon />
            </Button>
          </Grid>
          <Grid item xs={4} align="center">
            <Typography className="uppercase">
              <em>oligopoly</em>
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <Button onClick={this.toggleDrawer('topMenu', true)}>
              <MenuIcon />
            </Button>
          </Grid>
        </Grid>
        <Drawer anchor="top" open={this.state.topMenu} onClose={this.toggleDrawer('topMenu', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('topMenu', false)}
            onKeyDown={this.toggleDrawer('topMenu', false)}
            align="center"
          >
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} align="center">
                <Typography>
                  {this.props.user && 'CEO: ' + this.props.user.name}
                </Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <Typography>
                  {this.props.user
                    ? <Button onClick={this.signOut} variant="contained" color="secondary"><SignOutIcon /> Sign Out</Button>
                    : <Button onClick={this.signIn} variant="contained" color="primary"><SignInIcon /> Sign In</Button>}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {showExitGame}
              </Grid>
            </Grid>
          </div>
        </Drawer>
        <Drawer anchor="top" open={this.state.topHelp} onClose={this.toggleDrawer('topHelp', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('topHelp', false)}
            onKeyDown={this.toggleDrawer('topHelp', false)}
            align="center"
          >
            <Grid container>
              <Grid item xs={12} align="center">
                <Typography variant="headline">
                  Manual
                </Typography>
                <Typography variant="subheading">
                  <HelpIcon /> How to play
                </Typography>
                <Typography>
                  Get rich or die trying
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Login;
