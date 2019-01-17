import React from 'react';
import { ReactComponent as NetworkIcon } from '../img/network.svg';

function Spinner(props){
  const full = props.full && " fullScreen";

  return (
    <NetworkIcon className={"custom spinner" + full} />
  );
}

export default Spinner;
