import React, { Component } from 'react';
import './App.css';

import firebase from './firebase';

const db = firebase.database();

class Start extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Start">
        <h2>Game List</h2>
        <ul>
          <li onClick={() => this.props.onSelectGame('Game1')}>Game 1</li>
          <li>Game 2</li>
        </ul>
      </div>
    );
  }
}

export default Start;
