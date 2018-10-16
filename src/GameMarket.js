import React from 'react';
import Typography from '@material-ui/core/Typography';
import { addCommas, getIndustryIcon, industryTypes, getMarketStatusIcon } from './dry/functions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import MarketIcon from '@material-ui/icons/Equalizer';
import Drawer from '@material-ui/core/Drawer';
import MoneyIcon from '@material-ui/icons/MonetizationOn';

import { db } from './dry/firebase';

class GameMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shareIndustryType: '',
      numberOfShares: '0',
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
      if (this.state.numberOfShares > 0) { // buy
        const demandArr = game.market[this.state.shareIndustryType].demand;
        const cost = this.state.numberOfShares * demandArr[demandArr.length - 1] * 100;
        if (player.money >= cost) {
          const newShares = player.stocks[this.state.shareIndustryType] + parseInt(this.state.numberOfShares);
          const newStocks = Object.assign(
            player.stocks,
            {[this.state.shareIndustryType]: newShares}
          );
          db.ref('games/' + game.uid + '/players/' + player.uid).update({
            stocks: newStocks
          });
          db.ref('games/' + game.uid + '/players/' + player.uid).update({
            money: player.money - cost
          });
        }
      } else if (this.state.numberOfShares < 0) { // sell
        if (player.stocks[this.state.shareIndustryType] >= -1 * this.state.numberOfShares) {
          console.log(player.stocks[this.state.shareIndustryType]);
          const demandArr = game.market[this.state.shareIndustryType].demand;
          const gain = this.state.numberOfShares * demandArr[demandArr.length - 1] * -95;
          const newShares = player.stocks[this.state.shareIndustryType] + parseInt(this.state.numberOfShares);
          const newStocks = Object.assign(
            player.stocks,
            {[this.state.shareIndustryType]: newShares}
          );
          db.ref('games/' + game.uid + '/players/' + player.uid).update({
            stocks: newStocks
          });
          db.ref('games/' + game.uid + '/players/' + player.uid).update({
            money: player.money + gain
          });
        }
      }
    }
  };

  render() {
    const game = this.props.game;
    const player = this.props.player;

    const buyOrSell = this.state.numberOfShares > 0
      ? 'Buy Shares' : this.state.numberOfShares < 0
        ? 'Sell Shares' : '+/- Shares';
    const shareRate = this.state.numberOfShares > 0 ? -100 : -95;
    const transaction = this.state.shareIndustryType
      && game.market[this.state.shareIndustryType].demand[
        game.market[this.state.shareIndustryType].demand.length - 1
      ] * shareRate * this.state.numberOfShares;

    const playerShares = Object.entries(player.stocks).map(pair => <span>{getIndustryIcon(pair[0])}{pair[1]} </span>);

    const industryGraphColors = [
      'rgb(255, 99, 132)',
      'rgb(132, 255, 99)',
      'rgb(99, 132, 255)',
      'rgb(255, 255, 0)'
    ];

    const graphData = {
      datasets: industryTypes.map((industry, i) => {
        return {
        label: industry.toUpperCase(),
        borderColor: industryGraphColors[i],
        data: game.market[industry].demand
        }
      })
    };

    return (
      <div>
        <Grid item xs={12}>
          <Typography className="uppercase">
            {getMarketStatusIcon(game.market.status)} {game.market.status}
          </Typography>
        </Grid>
        <Line data={graphData}></Line>
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
              value={this.state.numberOfShares}
              onChange={this.handleChange('numberOfShares')}
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
            <Typography>$ {addCommas(transaction) || '---'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary"
              onClick={() => this.handleTransact(game, player)}>Transact</Button>
          </Grid>
        </Grid>
      </div>
    )
  };
}

export default GameMarket;
