import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

function Welcome(props){
  return (
    <div className="Welcome">
      <Typography variant="display1">
        ol·i·gop·o·ly, <em>n.</em>
      </Typography>
      <Typography variant="headline">
        a state of limited competition, in which a market is shared by a small number of producers or sellers.
      </Typography>
    </div>
  );
}

export default Welcome;
