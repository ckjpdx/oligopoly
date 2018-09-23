import React from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

const provider = new firebase.auth.GoogleAuthProvider();

class Login extends React.Component {

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

  render() {
    return (
      <React.Fragment>
        <p></p>
        {this.props.user
        ? <Button onClick={this.signOut} variant="contained">Sign Out</Button>
        : <Button onClick={this.signIn} variant="contained">Sign In</Button>}
      </React.Fragment>
    );
  }
}

export default Login;
