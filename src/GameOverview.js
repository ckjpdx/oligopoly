import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import GlobeIcon from '@material-ui/icons/Language';
import FascismIcon from '@material-ui/icons/Whatshot';
import SocialismIcon from '@material-ui/icons/AcUnit';
import { ReactComponent as WarIcon } from './img/rifle.svg';
import { ReactComponent as PeaceIcon } from './img/peace.svg';

import { getMarketStatusIcon, industryTypes, getIndustryIcon } from './dry/functions';

class GameOverview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const game = this.props.game;

    const stocksTape = industryTypes.map((industry, i) => {
      const demandArr = game.market[industry].demand;
      const currDemand = demandArr[demandArr.length - 1];
      const prevDemand = demandArr[demandArr.length - 2];
      const demandDiff = currDemand - prevDemand;
      const color = demandDiff >= 0 ? {color: 'lime'} : {color: 'red'};
      const plus = demandDiff > 0 && '+';
      return <span style={color} key={i}>
        {getIndustryIcon(industry)} {industry} {plus}{demandDiff} </span>
    });
    const newsTape = game.news.map((news, i) => <span key={i}><GlobeIcon /> {news} </span>);
    newsTape.push(stocksTape);

    let PolicyStatusIcon;
    switch (game.policy) {
      case "fascism": PolicyStatusIcon = <FascismIcon/>; break;
      case "socialism": PolicyStatusIcon = <SocialismIcon/>; break;
      default: PolicyStatusIcon = 'ERROR';
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
              <Tooltip disableFocusListener title="Policy Status (Fascism/Socialism)" placement="bottom">
                {PolicyStatusIcon}
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <Tooltip disableFocusListener title="Market Status (Booming/Stable/Recession)" placement="bottom">
                {getMarketStatusIcon(game.market.status)}
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
