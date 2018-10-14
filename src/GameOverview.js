import React from 'react';
import Typography from '@material-ui/core/Typography';
import GlobeIcon from '@material-ui/icons/Language';
import ReportIcon from '@material-ui/icons/Warning';
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

    return (
      <div className="GameOverview">
        <div className="marquee">
          <p>{newsTape}</p><p>{newsTape}</p>
        </div>
      </div>
    )
  };
}

export default GameOverview;
