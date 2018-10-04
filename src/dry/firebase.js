import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "oligopoly-92f16.firebaseapp.com",
  databaseURL: "https://oligopoly-92f16.firebaseio.com",
  projectId: "oligopoly-92f16",
  storageBucket: "oligopoly-92f16.appspot.com",
  messagingSenderId: "965010449422"
};

firebase.initializeApp(config);
const db = firebase.database();

export { firebase, db };
