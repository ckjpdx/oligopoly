import React from 'react';
import Typography from '@material-ui/core/Typography';
import { addCommas, getIndustryStatusIcon } from './dry/functions';
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

class GameMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shareIndustryType: '',
      numberOfShares: 0
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const game = this.props.game;
    const player = this.props.player;
    const marketStatus = game.market.status;
    const playerShares = () => Object.entries(player.stocks).map(pair => pair[0] + ': ' + pair[1] + ' ');

    const industryTypes = ['arms', 'robo', 'nano', 'fuze'];
    const industryGraphColors = [
      'rgb(255, 99, 132)',
      'rgb(132, 255, 99)',
      'rgb(99, 132, 255)',
      'rgb(255, 255, 0)'
    ];

    const graphData = {
      labels: ["1", "2", "3", "4"],
      datasets: industryTypes.map((industry, i) => {
        return {
        label: industry,
        borderColor: industryGraphColors[i],
        data: game.market[industry].demand
        }
      })
    };
    return (
      <div>
        <Typography>
          Status: {marketStatus}
        </Typography>
        <Line data={graphData}></Line>
        <Divider />
        <Typography>My Stocks</Typography>
        <Typography>{playerShares()}</Typography>
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
                      {getIndustryStatusIcon(game, industry)} {industry}
                    </MenuItem>)}
                </Select>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-number"
              className="max-width-100px"
              label="+/- Shares"
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
          <Grid item xs={12}>
            <Button variant="outlined" color="primary">Transact</Button>
          </Grid>
        </Grid>
      </div>
    )
  };
}

export default GameMarket;
