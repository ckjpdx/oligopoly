import React from 'react';
import { ReactComponent as NetworkIcon } from '../img/network.svg';

function Spinner(props){
  const full = props.full ? "spinner-full" : "spinner";

  return (
    <NetworkIcon className={`custom ${full}`} />
  );
}

export default Spinner;
