import React from 'react';
import Login from './Login';
import './App.css';

import firebase from './firebase';

const db = firebase.database();

function Welcome(props){
  return (
    <div className="Welcome">
      <h2>Fill or Kill</h2>
      <p>ol·i·gop·o·ly <em>n.</em></p>
        <p>a state of limited competition, in which a market is shared by a small number of producers or sellers.</p>
    </div>
  );
}

export default Welcome;
