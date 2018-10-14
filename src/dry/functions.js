import React from 'react';

import BoomIcon from '@material-ui/icons/TrendingUp';
import BustIcon from '@material-ui/icons/TrendingDown';
import StableIcon from '@material-ui/icons/TrendingFlat';

import ArmsIcon from '@material-ui/icons/Star';
import RoboIcon from '@material-ui/icons/Adb';
import NanoIcon from '@material-ui/icons/BlurCircular';
import FuzeIcon from '@material-ui/icons/OfflineBolt';

import EngineerIcon from '@material-ui/icons/Build';
import ScientistIcon from '@material-ui/icons/DeveloperBoard';
import MercIcon from '@material-ui/icons/Security';
import HackerIcon from '@material-ui/icons/RssFeed';
import WarbotIcon from '@material-ui/icons/Adb';

export const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const checkReq = (have, need) => have >= need;

export const getIndustryStatusIcon = (game, industry) =>
  game.market[industry].status === 'normal' ? <StableIcon />
  : game.market[industry].status === 'boom' ? <BoomIcon />
  : <BustIcon />;

export const industryTypes = [
  'arms', 'robo', 'nano', 'fuze'
];

export const getIndustryIcon = (industry) =>
  industry === 'arms' ? <ArmsIcon />
  : industry === 'robo' ? <RoboIcon />
  : industry === 'nano' ? <NanoIcon />
  : <FuzeIcon />;

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

export const getPersonnelIcon = (personnel) =>
  personnel === 'engineers' ? <EngineerIcon />
  : personnel === 'scientists' ? <ScientistIcon />
  : personnel === 'mercs' ? <MercIcon />
  : personnel === 'hackers' ? <HackerIcon />
  : <WarbotIcon />;
