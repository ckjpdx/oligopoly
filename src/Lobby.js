import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';

// get games list
// import firebase from './firebase';
// const db = firebase.database();

function Lobby(props){

  function generate(element) {
    return ['0', '1', '2'].map(value =>
      React.cloneElement(element, {
        key: value
      }),
    );
  }

  return (
    <div className="Lobby">
      <Button variant="contained" color="primary"><AddIcon/> New Game</Button>
      <Typography variant="display1">Lobby</Typography>
      <List dense={false}>
        {generate(
          <Button onClick={() => props.onSelectGame('abc')}>
            <ListItem>
              <ListItemIcon>
                <PlayIcon />
              </ListItemIcon>
              <ListItemText
                primary="Game goes here"
              />
            </ListItem>
          </Button>,
        )}
      </List>
    </div>
  );
}

export default Lobby;
