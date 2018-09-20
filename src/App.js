import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from './firebase';
import 'firebase/functions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'nadda'};
  }
  handleChangeText = (e) => {
    this.setState({text: e.target.value});
    console.log(this.state);
  }
  handleSendText = () => {
    console.log('Send the text!!');
    const addMessage = firebase.functions().httpsCallable('addMessage');
    addMessage({text: this.state.text}).then((result) => {
      console.log(result.data.text);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input onChange={this.handleChangeText} />
          <button onClick={this.handleSendText}>send</button>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
