import React from 'react';
import Grid from '@material-ui/core/Grid';
import T from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';

function AppBarManual(props) {

  return (
    <React.Fragment>
      <T variant="headline">Manual</T>
      <T variant="subheading"><InfoIcon /> How to play</T>
      <T><em>Get rich or die trying</em></T>
      <T>The goal of the game is to acquire as much wealth as possible and destroy your rivals. These two things are not mutually exclusive; often times the success of one depends on the other. You do this by making smarter business decisions, manipulating the market in your favor, and if need be, sabotaging your rival's assets.</T>
      <T>Whenever you see a <HelpIcon /> icon you can hover over it for help specific to the menu you are currently viewing.</T>
      <T><InfoIcon/>Player Stats</T>
      <T>There are two main numbers you should concern yourself with: money and reputation. Money allows you to operate and is most easily translated into exerting control and power. Reputation is less immediately important, but has a major effect on your finances over time. Reputation is tied to many things, most importantly your ability to capitalize on market demand.</T>
      <T><InfoIcon/></T>
      <T></T>
    </React.Fragment>
  )
}

export default AppBarManual;
