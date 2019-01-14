import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { addCommas, getIndustryIcon, industryTypes } from './dry/functions';

import CapitalismIcon from '@material-ui/icons/Whatshot';
import SocialismIcon from '@material-ui/icons/AcUnit';
import BribeIcon from '@material-ui/icons/HowToVote';
import TaxIcon from '@material-ui/icons/GetApp';
import { ReactComponent as WarIcon } from './img/rifle.svg';
import { ReactComponent as PeaceIcon } from './img/peace.svg';

class GamePolicy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      industrySelected: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDeregulate = () => {

  }

  render() {
    const game = this.props.game;
    const taxRate = this.props.game.taxRate * 100;

    const industrySelected = this.state.industrySelected;
    const industryData = game.market[industrySelected];
    const industryDemand = industrySelected ? industryData.demand.slice(-1)[0] : 0;
    const contributionCost = Math.round(Math.pow(industryDemand, 2.1));

    const policy = game.policy;
    const PolicyStatusIcon = policy === "capitalism" ? <CapitalismIcon /> : <SocialismIcon />
    const WarStatusIcon = game.war // boolean
      ? <WarIcon className="custom"/>
      : <PeaceIcon className="custom"/>;

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="uppercase">{PolicyStatusIcon} {game.policy}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <TaxIcon /> Tax: {taxRate}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {WarStatusIcon} {game.war ? "War" : "Peace"}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography><BribeIcon /> Contributions</Typography>
          </Grid>
          {policy === 'capitalism' &&
          <Grid container>
            <Grid item xs={6}>
              <form autoComplete="off">
                <FormControl>
                  <InputLabel htmlFor="industry-select">Industry</InputLabel>
                  <Select
                    value={this.state.industrySelected}
                    onChange={this.handleChange('industrySelected')}
                    inputProps={{
                      name: 'industry',
                      id: 'industry-select',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      industryTypes.map(type =>
                        <MenuItem value={type} key={type}>{getIndustryIcon(type)} {type}</MenuItem>
                      )
                    }
                  </Select>
                  <Typography>Cost: ${addCommas(contributionCost)}</Typography>
                </FormControl>
              </form>
            </Grid>
            <Grid item xs={6}>
              {
                industryData
                && industryData.status !== 'boom'
                  ? <Button onClick={this.handleDeregulate} variant="contained" color="primary">Deregulate</Button>
                  : industryData && <Typography>(Deregulated)</Typography>
              }
            </Grid>
          </Grid>
          }
          {policy === 'socialism' &&
            <Grid item xs={12}>
              <Typography>You cannot contribute to welfare society!</Typography>
            </Grid>
          }
        </Grid>
      </div>
    )
  };
}

// GamePolicy.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default GamePolicy;
