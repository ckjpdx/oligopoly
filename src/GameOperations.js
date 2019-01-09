import React from 'react';
import Grid from '@material-ui/core/Grid';
// import PublicIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';


class GameNews extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <Grid container>
        <Grid item xs={12}>
          <Button>Defame</Button>
        </Grid>
{        // <Grid item xs={12}>
        //   <Button>Hack</Button>
        // </Grid>
        // <Grid item xs={12}>
        //   <Button>Disrupt</Button>
        // </Grid>
        // <Grid item xs={12}>
        //   <Button>Massacre</Button>
        // </Grid>
        // <Grid item xs={12}>
        //   <Button>Destroy</Button>
        // </Grid>
}      </Grid>
    )
  };
}

export default GameNews;
