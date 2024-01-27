import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../assets/spinner.css'
function Results() {
  const { powValues, prediction } = useSelector((state) => state.bci);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a 3-second loading delay
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(delay);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
        <div className="spinner"></div>
        <p id='res'>Generating results...</p>
      </div>
      ) : (
        <div>
          <h1>Results</h1>
          <p>POW.F3.Theta: {powValues.pow_f3_theta}</p>
          <p>POW.F3.BetaL: {powValues.pow_f3_beta_l}</p>
          <p>POW.F4.Theta: {powValues.pow_f4_theta}</p>
          <p>POW.F4.BetaL: {powValues.pow_f4_beta_l}</p>
          <p>Predicted Attention Span: {prediction}</p>
        </div>
      )}
    </div>
  );
}

export default Results;
