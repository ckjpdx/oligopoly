import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

function Welcome(props){
  return (
    <div className="Welcome">
      <Grid
        container
        direction="column"
        justify="center"
        style={{height: "80vh"}}
      >
        <Typography>
          Invest in cutting edge tech development
        </Typography>
        <Typography>
          Hire and fire employees
        </Typography>
        <Typography>
          Destroy your rivals by <em>any</em> means...
        </Typography>
        <Typography variant="display1">
          ol·i·gop·o·ly
        </Typography>
        <Typography>
          ...it's not personal, it's profit
        </Typography>
      </Grid>
    </div>
  );
}

export default Welcome;
