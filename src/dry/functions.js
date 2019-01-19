import React from 'react';

import BoomIcon from '@material-ui/icons/TrendingUp';
import BustIcon from '@material-ui/icons/TrendingDown';
import StableIcon from '@material-ui/icons/TrendingFlat';

import ArmsIcon from '@material-ui/icons/Star';
import RoboIcon from '@material-ui/icons/Adb';
import NanoIcon from '@material-ui/icons/BlurCircular';
import AntiIcon from '@material-ui/icons/OfflineBolt';

import EngineerIcon from '@material-ui/icons/Build';
import ScientistIcon from '@material-ui/icons/DeveloperBoard';
import MercIcon from '@material-ui/icons/Security';
import HackerIcon from '@material-ui/icons/RssFeed';
import WarbotIcon from '@material-ui/icons/Adb';

import { ReactComponent as Rank1Icon } from '../img/chevron1.svg';
import { ReactComponent as Rank2Icon } from '../img/chevron2.svg';
import { ReactComponent as Rank3Icon } from '../img/chevron3.svg';

export const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const roundMillions = num => Math.round(num/100000)/10;

// booming, stable, recession
export const getMarketStatusIcon = (status) =>
  status === 'normal' ? <StableIcon className="custom"/>
  : status === 'boom' ? <BoomIcon className="custom"/>
  : <BustIcon className="custom"/>;

// this info is hidden without special "insider info" -- add later
// export const getIndustryStatusIcon = (game, industry) =>
//   game.market[industry].status === 'normal' ? <StableIcon />
//   : game.market[industry].status === 'boom' ? <BoomIcon />
//   : <BustIcon />;

export const industryTypes = [
  'arms', 'robo', 'nano', 'anti'
];

export const getIndustryIcon = (industry) =>
  industry === 'arms' ? <ArmsIcon />
  : industry === 'robo' ? <RoboIcon />
  : industry === 'nano' ? <NanoIcon />
  : <AntiIcon />;

export const personnelTypes = [
  'engineers', 'scientists', 'mercs', 'hackers', 'warbots'
];

export const personnelCosts = {
  engineers: 20000,
  scientists: 100000,
  mercs: 50000,
  hackers: 35000,
  warbots: 500000
};

export const getPersonnelIcon = personnel =>
  personnel === 'engineers' ? <EngineerIcon />
  : personnel === 'scientists' ? <ScientistIcon />
  : personnel === 'mercs' ? <MercIcon />
  : personnel === 'hackers' ? <HackerIcon />
  : <WarbotIcon />;

export const getRankIcon = rank =>
  rank === 1 ? <Rank1Icon className="custom"/>
  : rank === 2 ? <Rank2Icon className="custom rotate-270"/>
  : <Rank3Icon className="custom flip-v"/>;

export const emptyStaffObj = () => {
  const emptyStaffObj = {};
  personnelTypes.forEach(type => emptyStaffObj[type] = 0);
  return emptyStaffObj;
}
