import React from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import SignInIcon from '@material-ui/icons/ExitToApp';
import SignOutIcon from '@material-ui/icons/Launch';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBarManual from './AppBarManual';
import { firebase } from './dry/firebase';
const provider = new firebase.auth.GoogleAuthProvider();

class AppBar extends React.Component {
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
    const showExitGame = this.props.gameUid
      && <Button color="secondary"
        variant="outlined"
        onClick={() => this.props.onExit()}
      >
        <Typography>Exit Game</Typography>
      </Button>;

    return (
      <div className="AppBar">
        <h1>
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={4} style={{textAlign:"left"}}>
              <HelpIcon onClick={this.toggleDrawer('topHelp', true)}/>
            </Grid>
            <Grid item xs={4}>
              <em>oligopoly</em>
            </Grid>
            <Grid item xs={4} style={{textAlign:"right"}}>
              <MenuIcon onClick={this.toggleDrawer('topMenu', true)}/>
            </Grid>
          </Grid>
        </h1>
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
          <AppBarManual />
        </div>
        </Drawer>
      </div>
    );
  }
}

export default AppBar;
