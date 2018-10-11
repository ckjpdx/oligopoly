import React from 'react';

import BoomIcon from '@material-ui/icons/TrendingUp';
import BustIcon from '@material-ui/icons/TrendingDown';
import NormalIcon from '@material-ui/icons/TrendingFlat';

import ArmsIcon from '@material-ui/icons/Star';
import RoboIcon from '@material-ui/icons/Adb';
import NanoIcon from '@material-ui/icons/BlurOn';
import FuzeIcon from '@material-ui/icons/OfflineBolt';

import MercIcon from '@material-ui/icons/Security';
import HackerIcon from '@material-ui/icons/RssFeed';
import WarbotIcon from '@material-ui/icons/Adb';

export const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const checkReq = (have, need) => have >= need;

export const getIndustryStatusIcon = (game, industry) =>
  game.market[industry].status === 'normal' ? <NormalIcon />
  : game.market[industry].status === 'boom' ? <BoomIcon />
  : <BustIcon />;

// put industry types array here

export const getIndustryIcon = (industry) =>
  industry === 'arms' ? <ArmsIcon />
  : industry === 'robo' ? <RoboIcon />
  : industry === 'nano' ? <NanoIcon />
  : <FuzeIcon />;

export const personnelTypes = ['merc', 'hacker', 'warbot'];

export const getPersonnelIcon = (personnel) =>
  personnel === 'merc' ? <MercIcon />
  : personnel === 'hacker' ? <HackerIcon />
  : <WarbotIcon />;
