import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { addCommas } from './dry/functions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {Line} from 'react-chartjs-2';

class GameMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      industryToDereg: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const game = this.props.game;
    const marketStatus = game.market.status;
    const contributionCost = 1000000;
    const graphData = {
      labels: ["1", "2", "3", "4"],
      datasets: [
        {
          label: "Arms Tech",
          borderColor: 'rgb(255, 99, 132)',
          data: [100, 30, 60],
        },
        {
          label: "Robo Tech",
          borderColor: 'rgb(132, 255, 99)',
          data: [77, 50, 100],
        },
        {
          label: "Nano Tech",
          borderColor: 'rgb(99, 132, 255)',
          data: [55, 80, 160],
        },
        {
          label: "Fuze Tech",
          borderColor: 'rgb(255, 255, 0)',
          data: [33, 100, 200],
        },
      ]
    };
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography>
              Status: {marketStatus}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Line data={graphData}></Line>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <form autoComplete="off">
              <Typography>Contributions</Typography>
              <FormControl>
                <InputLabel htmlFor="industry-select">Industry</InputLabel>
                <Select
                  value={this.state.industryToDereg}
                  onChange={this.handleChange('industryToDereg')}
                  inputProps={{
                    name: 'industry',
                    id: 'industry-select',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'arms'}>Arms</MenuItem>
                  <MenuItem value={'robo'}>Robo</MenuItem>
                  <MenuItem value={'nano'}>Nano</MenuItem>
                  <MenuItem value={'fuze'}>Fuze</MenuItem>
                </Select>
                <Typography>Cost: ${addCommas(contributionCost)}</Typography>
              </FormControl>
            </form>
            <Button>Deregulate</Button>
          </Grid>
        </Grid>
      </div>
    )
  };
}

// GameMarket.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default GameMarket;
