import React from 'react';
import PropTypes from 'prop-types';
import GameBarReputation from './GameBarReputation';
import GameBarBank from './GameBarBank';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BankIcon from '@material-ui/icons/AccountBalance';
import ReputationIcon from '@material-ui/icons/ThumbsUpDown';
import Drawer from '@material-ui/core/Drawer';
import { roundMillions } from './dry/functions';

const styles = {
  root: {
    width: 'inherit'
  },
};

class GameBar extends React.Component {
  state = {
    topBank: false,
    topRep: false,
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
          label={`${roundMillions(player.money)}M`}
          icon={<BankIcon />}
          onClick={this.toggleDrawer('topBank', true)} />
          <Drawer anchor="top" open={this.state.topBank} onClose={this.toggleDrawer('topBank', false)}>
            <GameBarBank player={player}/>
          </Drawer>
        <BottomNavigationAction
          label={this.props.player.reputation + '%'}
          icon={<ReputationIcon />}
          onClick={this.toggleDrawer('topRep', true)} />
          <Drawer anchor="top" open={this.state.topRep} onClose={this.toggleDrawer('topRep', false)}>
            <GameBarReputation player={player}/>
          </Drawer>
      </BottomNavigation>
    );
  }
}

GameBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameBar);
