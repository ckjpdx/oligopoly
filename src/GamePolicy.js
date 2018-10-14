import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { addCommas, getIndustryIcon, industryTypes } from './dry/functions';

import RepublicanIcon from '@material-ui/icons/Whatshot';
import DemocraticIcon from '@material-ui/icons/AcUnit';
import BribeIcon from '@material-ui/icons/HowToVote';
import { ReactComponent as WarIcon } from './img/rifle.svg';
import { ReactComponent as PeaceIcon } from './img/peace.svg';

class GamePolicy extends React.Component {
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

    const taxRate = this.props.game.taxRate * 100;
    const contributionCost = 1000000;
    const PolicyStatusIcon = game.policy === "republican" ? <RepublicanIcon /> : <DemocraticIcon />
    const WarStatusIcon = game.war // boolean
      ? <WarIcon className="custom"/>
      : <PeaceIcon className="custom"/>;

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography>{PolicyStatusIcon} {game.policy}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              tax rate: {taxRate}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {WarStatusIcon} {game.war ? "War" : "Peace"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <form autoComplete="off">
              <Typography><BribeIcon /> Contributions</Typography>
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
                  {
                    industryTypes.map(type =>
                      <MenuItem value={type}>{getIndustryIcon(type)} {type}</MenuItem>
                    )
                  }
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

// GamePolicy.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default GamePolicy;
