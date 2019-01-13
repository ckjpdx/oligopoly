import React from 'react';
import { Line } from 'react-chartjs-2';
import { industryTypes } from './functions';

function ChartDemand(props){

  const game = props.game;

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
    <Line data={graphData}></Line>
  );
}

export default ChartDemand;
