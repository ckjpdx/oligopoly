import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import GlobeIcon from '@material-ui/icons/Language';
import StableIcon from '@material-ui/icons/TrendingFlat';
import BustIcon from '@material-ui/icons/TrendingDown';
import BoomIcon from '@material-ui/icons/TrendingUp';
import RepublicanIcon from '@material-ui/icons/Whatshot';
import DemocraticIcon from '@material-ui/icons/AcUnit';
import { ReactComponent as WarIcon } from './img/rifle.svg';
import { ReactComponent as PeaceIcon } from './img/peace.svg';

import { getIndustryStatusIcon, industryTypes, getIndustryIcon } from './dry/functions';

class GameOverview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const game = this.props.game;
    const player = this.props.player;
    const stocksTape = industryTypes.map(industry => {
      const demandArr = game.market[industry].demand;
      const currDemand = demandArr[demandArr.length - 1];
      const prevDemand = demandArr[demandArr.length - 2];
      const demandDiff = currDemand - prevDemand;
      const color = demandDiff >= 0 ? {color: 'lime'} : {color: 'red'};
      const plus = demandDiff > 0 && '+';
      return <span style={color}>
        {getIndustryIcon(industry)} {industry} {plus}{demandDiff} </span>
    });
    const newsTape = game.news.map(news => <span><GlobeIcon /> {news} </span>);
    newsTape.push(stocksTape);

    let PolicyStatusIcon;
    switch (game.policy) {
      case "republican": PolicyStatusIcon = <RepublicanIcon/>; break;
      case "democratic": PolicyStatusIcon = <DemocraticIcon/>; break;
      default: PolicyStatusIcon = 'ERROR';
    }

    let MarketStatusIcon;
    switch (game.market.status) {
      case "booming": MarketStatusIcon = <BoomIcon/>; break;
      case "stable": MarketStatusIcon = <StableIcon/>; break;
      case "recession": MarketStatusIcon = <BustIcon/>; break;
      default: MarketStatusIcon = 'ERROR';
    }

    const WarStatusIcon = game.war // boolean
      ? <WarIcon className="custom"/>
      : <PeaceIcon className="custom"/>;

    return (
      <div className="GameOverview">
        <div className="marquee">
          <p>{newsTape}</p><p>{newsTape}</p>
        </div>
        <div className="global-status-bar">
          <Grid container>
            <Grid item xs={4}>
              <Tooltip disableFocusListener title="Policy Status (democratic or republican)" placement="bottom">
                {PolicyStatusIcon}
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <Tooltip disableFocusListener title="Market Status (booming, stable, or recession)" placement="bottom">
                {MarketStatusIcon}
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <Tooltip disableFocusListener title="War/Peace Status" placement="bottom">
                {WarStatusIcon}
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  };
}

export default GameOverview;