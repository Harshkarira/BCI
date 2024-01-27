// results.jsx

import React from 'react';
import { useSelector } from 'react-redux';

function Results() {
  const { powValues, prediction } = useSelector((state) => state.bci);

  // Now you can use powValues and prediction in your component

  return (
    <div>
      <h1>Results</h1>
      <p>POW.F3.Theta: {powValues.pow_f3_theta}</p>
      <p>POW.F3.BetaL: {powValues.pow_f3_beta_l}</p>
      <p>POW.F4.Theta: {powValues.pow_f4_theta}</p>
      <p>POW.F4.BetaL: {powValues.pow_f4_beta_l}</p>
      <p>Predicted Attention Span: {prediction}</p>
    </div>
  );
}

export default Results;
