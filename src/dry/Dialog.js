import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
  constructor(props){
    super(props);
  }
  state = {
    open: false,
    dialogHelp: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          {this.props.icon}
          {this.props.text}
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
                <Tooltip disableFocusListener title={this.props.help} placement="right-start">
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
      </div>
    );
  }
}

export default DryDialog;
