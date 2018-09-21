import React from 'react';
import Login from './Login';
import './App.css';

import firebase from './firebase';

// get games list
// const db = firebase.database();

function Lobby(props){
  return (
    <div className="Lobby">
      <button>New Game</button>
      <h2>Game List</h2>
      <ul>
        <li onClick={() => props.onSelectGame('Game1')}>Game 1</li>
        <li>Game 2</li>
      </ul>
    </div>
  );
}

export default Lobby;
