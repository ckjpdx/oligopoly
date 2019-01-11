import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Alert extends React.Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Button onClick={this.handleClickOpen}>
          {this.props.icon}
          {this.props.preview}
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          onClick={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Grid item xs={12}>
              {this.props.icon} {this.props.preview}
            </Grid>
          </DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Alert;
