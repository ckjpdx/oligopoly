import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DryDialog extends React.Component {

  state = {
    open: this.props.open || false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const styleNoPad = this.props.noPad && {padding: 0, width: '100%'};
    const { children } = this.props;

    return (
      <React.Fragment>
        <Button onClick={this.handleClickOpen} style={styleNoPad}>
          {this.props.icon}
          {this.props.title}
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Grid container>
              <Grid item xs={1}>
                <Tooltip disableFocusListener title={this.props.help} placement="bottom-start">
                  <HelpIcon />
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                {this.props.icon} {this.props.title}
              </Grid>
              <Grid item xs={1}>
                <CloseIcon onClick={this.handleClose} />
              </Grid>
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

export default DryDialog;
