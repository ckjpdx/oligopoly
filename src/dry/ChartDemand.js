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

  const turns = () => {
    const count = game.market.arms.demand.length;
    return [...Array(count).keys()]
  }

  const data = {
    labels: turns(),
    datasets: industryTypes.map((industry, i) =>
      ({
        label: industry.toUpperCase(),
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'black',
        borderColor: industryGraphColors[i],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,255,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,255,255,1)',
        pointHoverBorderColor: 'rgba(255,255,255,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        axisX: {
          labelFontColor: 'white'
        },
        data: game.market[industry].demand
      }))
  };

  return (
    <Line data={data}></Line>
  );
}

export default ChartDemand;
