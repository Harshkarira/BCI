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

  const getBarProperties = () => {
    switch (prediction) {
      case "Low attention":
        return {
          color: "red",
          height: isTransitioned ? "h-32 bottom-0" : "h-1 bottom-30",
        };
      case "Moderate attention":
        return {
          color: "yellow",
          height: isTransitioned ? "h-56 bottom-0" : "h-1 bottom-30",
        };
      case "High attention":
        return {
          color: "green",
          height: isTransitioned ? "h-80 bottom-0" : "h-1 bottom-30",
        };
      default:
        return {};
    }
  };

  const barProperties = getBarProperties();

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="mt-60 flex items-center justify-center">
            <div className="border-t-4 border-blue-500 border-solid w-16 h-16 border-r  rounded-full animate-spin"></div>
          </div>

          <p id="res" className="text-center text-3xl font-bold mt-4">
            Generating results...
          </p>
        </div>
      ) : (
        <div className="flex">
          <div className="bg-black text-white p-4 h-screen w-56 ">
            <p className="text-lg font-serif cursor-pointer p-1 mb-1">
              <Link to="/">Home</Link>
            </p>
            <p className="text-lg font-serif cursor-pointer bg-slate-800 rounded p-1">
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
            <div className="flex flex-row border border-blue-500">
              <div className="w-1/2 border border-gray-500 flex flex-row justify-between">
                <div
                  className={`relative border-2 rounded border-black ml-4 w-44 bg-${barProperties.color}-500 transition-all duration-1000 ${barProperties.height}`}
                ></div>

                <div className="bg-white inline-block rounded-xl p-3 h-32 mr-4 mt-4">
                  <div class="flex items-center justify-between">
                    <div class="pr-2 font-light">Low</div>
                    <div class=" w-8 h-1 bg-red-500"></div>
                  </div>
                  <div class="flex items-center mt-3 justify-between">
                    <div class="pr-2 font-light">Medium</div>
                    <div class="w-8 h-1 bg-yellow-500"></div>
                  </div>
                  <div class="flex items-center mt-3 justify-between">
                    <div class="pr-2 font-light">High</div>
                    <div class="w-8 h-1 bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-center">
                  Predicted Attention Span:  {prediction}
                </p>
              </div>
            </div>
            <p className="ml-6 font-serif">Level of attention span</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
