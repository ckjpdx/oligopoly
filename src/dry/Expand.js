import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';

class Expand extends React.Component {

  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { children } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={this.handleClick}>
            {this.props.icon}
            {this.props.title}
          </Button>
        </Grid>
        <Grid item xs={12} style={{display: 'unset'}}>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        </Grid>
      </Grid>
    );
  }
}

export default Expand;
