import React from 'react';
import Typography from '@material-ui/core/Typography';
import { addCommas, getIndustryIcon, industryTypes, getMarketStatusIcon } from './dry/functions';
import ChartDemand from './dry/ChartDemand';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MoneyIcon from '@material-ui/icons/MonetizationOn';

import { db } from './dry/firebase';

class GameMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shareIndustryType: '',
      shareCount: '0',
      transaction: 0
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleTransact = (game, player) => {
    if (this.state.shareIndustryType) {
      const shareType = this.state.shareIndustryType;
      const shareCount = this.state.shareCount;
      const demandArr = game.market[shareType].demand;
      if (shareCount > 0) { // buy
        const cost = shareCount * demandArr[demandArr.length - 1] * 100;
        if (player.money >= cost) {
          db.ref('games/' + game.uid + '/players/' + player.uid + '/stocks/').update({
            [shareType]: (player.stocks[shareType] || 0) + parseInt(shareCount)
          });
          db.ref('games/' + game.uid + '/players/' + player.uid).update({
            money: player.money - cost
          });
          this.setState({shareCount: 0});
        }
      } else if (shareCount < 0) { // sell
        if (player.stocks[shareType] >= -1 * shareCount) {
          const gain = shareCount * demandArr[demandArr.length - 1] * -95;
          db.ref('games/' + game.uid + '/players/' + player.uid + '/stocks/').update({
            [shareType]: (player.stocks[shareType] || 0) + parseInt(shareCount) //newStocks
          });
          db.ref('games/' + game.uid + '/players/' + player.uid).update({
            money: player.money + gain
          });
          this.setState({shareCount: 0});
        }
      }
    }
  };

  render() {
    const game = this.props.game;
    const player = this.props.player;

    const buyOrSell = this.state.shareCount > 0
      ? 'Buy Shares' : this.state.shareCount < 0
        ? 'Sell Shares' : '+/- Shares';
    const shareRate = this.state.shareCount > 0 ? -100 : -95;
    const transaction = this.state.shareIndustryType
      && game.market[this.state.shareIndustryType].demand[
        game.market[this.state.shareIndustryType].demand.length - 1
      ] * shareRate * this.state.shareCount;
    const plus = transaction > 0 ? '+' : null;
    const playerShares = Object.entries(player.stocks).map((pair, i) => <span key={i}>{getIndustryIcon(pair[0])}{pair[1]} </span>);

    return (
      <Grid container className="GameMarket">
        <Grid item xs={12}>
          <Typography className="uppercase">
            {getMarketStatusIcon(game.market.status)} {game.market.status}
          </Typography>
        </Grid>
        <ChartDemand game={game} />
        <Divider />
        <Grid item xs={12}>
          <Typography>My Stocks</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{playerShares}</Typography>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <form autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="share-type">Industry</InputLabel>
                <Select
                  value={this.state.shareIndustryType}
                  onChange={this.handleChange('shareIndustryType')}
                  inputProps={{
                    name: 'type-of-share',
                    id: 'share-type',
                  }}
                >
                  <MenuItem value={''}>none</MenuItem>
                  {industryTypes.map((industry, i) =>
                    <MenuItem key={i} value={industry}>
                      {getIndustryIcon(industry)} {industry}
                    </MenuItem>)}
                </Select>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-number"
              className="max-width-100px"
              label={buyOrSell}
              value={this.state.shareCount}
              onChange={this.handleChange('shareCount')}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography><MoneyIcon /> {addCommas(player.money)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>${plus}{addCommas(transaction) || '---'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary"
              onClick={() => this.handleTransact(game, player)}>Transact</Button>
          </Grid>
        </Grid>
      </Grid>
    )
  };
}

export default GameMarket;
