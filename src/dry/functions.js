import React from 'react';

import BoomIcon from '@material-ui/icons/TrendingUp';
import BustIcon from '@material-ui/icons/TrendingDown';
import NormalIcon from '@material-ui/icons/TrendingFlat';

import ArmsIcon from '@material-ui/icons/Security';
import RoboIcon from '@material-ui/icons/Adb';
import NanoIcon from '@material-ui/icons/LocalPharmacy';
import FuzeIcon from '@material-ui/icons/EvStation';

export const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const checkReq = (have, need) => have >= need;

export const getIndustryStatusIcon = (game, industry) =>
  game.market[industry].status === 'normal' ? <NormalIcon />
  : game.market[industry].status === 'boom' ? <BoomIcon />
  : <BustIcon />;


export const getIndustryIcon = (industry) =>
  industry === 'arms' ? <ArmsIcon />
  : industry === 'robo' ? <RoboIcon />
  : industry === 'nano' ? <NanoIcon />
  : <FuzeIcon />;
