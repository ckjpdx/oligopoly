import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// import PublicIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';

import { db } from './dry/firebase';

class GameNews extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const game = this.props.game;
    const player = this.props.player;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Button>Defame</Button>
        </Grid>
        <Grid item xs={12}>
          <Button>Hack</Button>
        </Grid>
        <Grid item xs={12}>
          <Button>Disrupt</Button>
        </Grid>
        <Grid item xs={12}>
          <Button>Massacre</Button>
        </Grid>
        <Grid item xs={12}>
          <Button>Destroy</Button>
        </Grid>
      </Grid>
    )
  };
}

export default GameNews;
