import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        <div>
          <div className="mt-60 flex items-center justify-center">
            <div className="border-t-4 border-blue-500 border-solid w-16 h-16 border-r-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>

          <p id="res" className="text-center text-3xl font-bold mt-4">
            Generating results...
          </p>
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
