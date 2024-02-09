import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        <div className="flex">
          <div className="bg-black text-white p-4 h-screen w-56 ">
            <p className="text-lg cursor-pointer p-1 mb-1">
              <Link to="/">Home</Link>
            </p>
            <p className="text-lg cursor-pointer bg-slate-800 rounded p-1">
              Results
            </p>
          </div>
          <div className="w-full bg-gray-300">
            <h1 className="text-center text-2xl font-bold m-8">Results</h1>
            <div className="flex justify-around ">
              <p className="font-bold">POW.F3.Theta</p>
              <p className="font-bold">POW.F3.BetaL</p>
              <p className="font-bold">POW.F4.Theta</p>
              <p className="font-bold">POW.F4.BetaL</p>
            </div>
            <div className="flex justify-around mb-14">
              <p>{powValues.pow_f3_theta}</p>
              <p>{powValues.pow_f3_beta_l}</p>
              <p>{powValues.pow_f4_theta}</p>
              <p>{powValues.pow_f4_beta_l}</p>
            </div>
            <div className="scale-x-[-1] rotate-180 border-blue-400 border-double border-2 flex justify-evenly bg-gray-300">
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
            <p className="text-center">
              Predicted Attention Span: {prediction}
            </p>
            Inference
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
