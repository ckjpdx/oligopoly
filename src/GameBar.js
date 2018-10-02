import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import ReputationIcon from '@material-ui/icons/ThumbsUpDown';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { addCommas } from './dry/functions';

const styles = {
  root: {
    width: 2000,
  },
};

class GameBar extends React.Component {
  state = {
    topMoney: false,
    topRep: false,
    prCampaign: 0
  };


  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const player = this.props.player;
    return (
      <BottomNavigation
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label={addCommas(player.money)}
          icon={<MoneyIcon />}
          onClick={this.toggleDrawer('topMoney', true)} />
          <Drawer anchor="top" open={this.state.topMoney} onClose={this.toggleDrawer('topMoney', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('topMoney', false)}
              onKeyDown={this.toggleDrawer('topMoney', false)}
              align="center"
              >
                <Typography variant="headline">Money</Typography>
                <Typography variant="display1">{'$' + addCommas(this.props.player.money)}</Typography>
                <Typography>Loans</Typography>
            </div>
          </Drawer>
        <BottomNavigationAction
          label={this.props.player.reputation + '%'}
          icon={<ReputationIcon />}
          onClick={this.toggleDrawer('topRep', true)} />
          <Drawer anchor="top" open={this.state.topRep} onClose={this.toggleDrawer('topRep', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('topRep', false)}
              onKeyDown={this.toggleDrawer('topRep', false)}
              align="center"
            >
              <Typography variant="headline">Reputation</Typography>
              <Typography variant="display1">{this.props.player.reputation + '%'}</Typography>
            </div>
          </Drawer>
      </BottomNavigation>
    );
  }
}

GameBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameBar);
