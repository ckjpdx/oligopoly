import React from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const provider = new firebase.auth.GoogleAuthProvider();

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {top: false}
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
    return (
      <div className="Login">
        <Grid container spacing={24}>
          <Grid item xs={6} align="left">
            <Typography>
              {this.props.user && this.props.user.name}
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Button onClick={this.toggleDrawer('top', true)}>
              <PersonIcon />
            </Button>
          </Grid>
        </Grid>
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
            align="center"
          >
            {this.props.user
              ? <Button onClick={this.signOut} variant="contained">Sign Out</Button>
              : <Button onClick={this.signIn} variant="contained">Sign In</Button>}
          </div>
          </Drawer>
      </div>
    );
  }
}

export default Login;
