import React, { Component } from 'react';
import './App.css';

import firebase from './firebase';

const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);
    db.ref('games/data').on('value', snap => this.setState({data: snap.val()}));
  }

  componentWillMount() {}

  handleChangeText = (e) => {
    this.setState({text: e.target.value});
  }
  handleDbTextChange = (e) => {
    this.setState({toData: e.target.value});
  }
  handleSendText = () => {
    console.log('Send the text!!');
    const addMessage = firebase.functions().httpsCallable('addMessage');
    addMessage({text: this.state.text}).then((result) => {
      console.log(result.data.text);
    });
  }
  handleSetDbTextChange = () => {
    db.ref('games/').update({data: this.state.toData})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input onChange={this.handleChangeText} />
          <button onClick={this.handleSendText}>cloud</button>
          <input onChange={this.handleDbTextChange} />
          <button onClick={this.handleSetDbTextChange}>database</button>
        </header>
        <p className="App-intro">
          {this.state ? this.state.data : <span>no data yet</span>}
        </p>
      </div>
    );
  }
}

export default App;
