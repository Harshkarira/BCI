import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Results = () => {
  const { powValues, prediction } = useSelector((state) => state.bci);
  const [isLoading, setIsLoading] = useState(true);
  const [showDelayedDiv, setShowDelayedDiv] = useState(false);
  const [isTransitioned, setIsTransitioned] = useState(false);
  // Simulate a 3-second loading delay
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Set a timeout to show the delayed div 3 seconds after isLoading becomes true
    const showDelayedDivTimeout = setTimeout(() => {
      setShowDelayedDiv(true);
      setIsTransitioned(true);
    }, 4000);

    // Clear the timeouts when the component unmounts
    return () => {
      clearTimeout(delay);
      clearTimeout(showDelayedDivTimeout);
    };
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
          <div className="scale-x-[-1] rotate-180 flex justify-evenly border border-red-400 bg-gray-300">
            <div
              className={`relative w-40 bg-red-500 transition-all duration-1000 ${
                isTransitioned ? "h-32 bottom-0" : "h-1 bottom-30"
              }`}
            ></div>
            <div
              className={`relative w-40 bg-yellow-500 transition-all duration-1000 ${
                isTransitioned ? "h-56 bottom-0" : "h-1 bottom-30"
              }`}
            ></div>
            <div
              className={`relative w-40 bg-green-500 transition-all duration-1000 ${
                isTransitioned ? "h-80 bottom-0" : "h-1 bottom-30"
              }`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
