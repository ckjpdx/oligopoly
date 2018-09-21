import React from 'react';
import firebase from 'firebase';

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
        ? <button onClick={this.signOut}>Sign Out</button>
        : <button onClick={this.signIn}>Sign In</button>}
      </React.Fragment>
    );
  }
}

export default Login;
