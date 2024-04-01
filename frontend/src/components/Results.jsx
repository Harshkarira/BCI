// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VscOutput } from "react-icons/vsc";
import { FaInfoCircle } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

const Results = () => {
  const {
    powValues,
    attention_prediction,
    order_prediction,
    memory_prediction,
  } = useSelector((state) => state.bci);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
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

  const getattentionBarProperties = () => {
    switch (attention_prediction) {
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
        return {
          height: "h-0",
        };
    }
  };
  const getorderBarProperties = () => {
    switch (order_prediction) {
      case "Weak":
        return {
          color: "red",
          height: isTransitioned ? "h-32 bottom-0" : "h-1 bottom-30",
        };
      case "Strong":
        return {
          color: "green",
          height: isTransitioned ? "h-80 bottom-0" : "h-1 bottom-30",
        };
      default:
        return {
          height: "h-0",
        };
    }
  };

  const getmemoryBarProperties = () => {
    switch (memory_prediction) {
      case "Weak":
        return {
          color: "red",
          height: isTransitioned ? "h-32 bottom-0" : "h-1 bottom-30",
        };
      case "Strong":
        return {
          color: "green",
          height: isTransitioned ? "h-80 bottom-0" : "h-1 bottom-30",
        };
      default:
        return {
          height: "h-0",
        };
    }
  };

  // Function to generate inference statements based on predictions
  const renderInference = (attention, order, memory) => {
    // Combine predictions for all three aspects
    const combinedPrediction = attention + " " + order + " " + memory;
    console.log(combinedPrediction);
    switch (combinedPrediction) {
      case "Low attention Weak Weak":
        return "The EEG data suggests that the individual has a low attention span, which may affect their ability to concentrate on tasks. Additionally, cognitive processing appears to be weak, possibly leading to difficulty in problem-solving and decision-making. Memory function also seems weak, indicating potential challenges in retaining information.";
      case "Low attention Weak Strong":
        return "The EEG data suggests that the individual has a low attention span, which may affect their ability to concentrate on tasks. Additionally, cognitive processing appears to be weak, possibly leading to difficulty in problem-solving and decision-making. However, memory function seems to be relatively stronger, which could help in retaining information better than expected.";
      case "Low attention Strong Weak":
        return "The EEG data suggests that the individual has a low attention span, which may affect their ability to concentrate on tasks. However, cognitive processing seems to be relatively stronger, indicating better problem-solving and decision-making abilities. Memory function, however, appears weak, suggesting potential challenges in retaining information.";
      case "Low attention Strong Strong":
        return "The EEG data suggests that the individual has a low attention span, which may affect their ability to concentrate on tasks. However, cognitive processing seems to be relatively stronger, indicating better problem-solving and decision-making abilities. Memory function also appears to be relatively strong, which could help in retaining information better than expected.";
      case "Moderate attention Weak Weak":
        return "The EEG data suggests that the individual has a moderate attention span, which allows for decent concentration on tasks. However, cognitive processing appears to be weak, possibly leading to difficulty in problem-solving and decision-making. Memory function also seems weak, indicating potential challenges in retaining information.";
      case "Moderate attention Weak Strong":
        return "The EEG data suggests that the individual has a moderate attention span, which allows for decent concentration on tasks. However, cognitive processing appears to be weak, possibly leading to difficulty in problem-solving and decision-making. Memory function, however, seems relatively stronger, which could help in retaining information better than expected.";
      case "Moderate attention Strong Weak":
        return "The EEG data suggests that the individual has a moderate attention span, which allows for decent concentration on tasks. Additionally, cognitive processing seems to be relatively stronger, indicating better problem-solving and decision-making abilities. Memory function, however, appears weak, suggesting potential challenges in retaining information.";
      case "Moderate attention Strong Strong":
        return "The EEG data suggests that the individual has a moderate attention span, which allows for decent concentration on tasks. Additionally, both cognitive processing and memory function seem relatively strong, indicating efficient problem-solving, decision-making abilities, and better retention of information.";
      case "High attention Weak Weak":
        return "The EEG data suggests that the individual has a high attention span, allowing for excellent concentration on tasks. However, cognitive processing appears to be weak, possibly leading to difficulty in problem-solving and decision-making. Memory function also seems weak, indicating potential challenges in retaining information.";
      case "High attention Weak Strong":
        return "The EEG data suggests that the individual has a high attention span, allowing for excellent concentration on tasks. However, cognitive processing appears to be weak, possibly leading to difficulty in problem-solving and decision-making. Memory function, however, seems relatively stronger, which could help in retaining information better than expected.";
      case "High attention Strong Weak":
        return "The EEG data suggests that the individual has a high attention span, allowing for excellent concentration on tasks. Additionally, cognitive processing seems to be relatively stronger, indicating better problem-solving and decision-making abilities. Memory function, however, appears weak, suggesting potential challenges in retaining information.";
      case "High attention Strong Strong":
        return "The EEG data suggests that the individual has a high attention span, allowing for excellent concentration on tasks. Additionally, both cognitive processing and memory function seem relatively strong, indicating efficient problem-solving, decision-making abilities, and better retention of information.";
      default:
        return "";
    }
  };

  const attention_barProperties = getattentionBarProperties();
  const order_barProperties = getorderBarProperties();
  const memory_barProperties = getmemoryBarProperties();

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
          <div className="bg-black text-white p-4 min-h-screen w-56 ">
            <Link
              to="/"
              className="flex items-center text-lg font-serif cursor-pointer p-2 mb-1 hover:bg-slate-800 rounded"
            >
              <GoHomeFill className="mr-2" />
              Home
            </Link>
            <Link
              to="/about"
              className="flex items-center text-lg font-serif cursor-pointer p-2 mb-1 hover:bg-slate-800 rounded"
            >
              <FaInfoCircle className="mr-2" />
              About
            </Link>

            <div className="flex items-center text-lg font-serif cursor-pointer bg-slate-800 rounded p-2">
              <VscOutput className="mr-2" />
              Results
            </div>
          </div>
          <div className="w-full bg-gray-300">
            <table className="table w-full text-[12px] border-collapse border border-gray-800 mt-4 ">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 font-bold text-center">POW.F3.Theta</th>
                  <th className="p-2 font-bold text-center">POW.F3.BetaL</th>
                  <th className="p-2 font-bold text-center">POW.F4.Theta</th>
                  <th className="p-2 font-bold text-center">POW.F4.BetaL</th>
                  <th className="p-2 font-bold text-center">POW.F3.Gamma</th>
                  <th className="p-2 font-bold text-center">POW.F4.Gamma</th>
                  <th className="p-2 font-bold text-center">POW.F7.Gamma</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">{powValues.pow_f3_theta}</td>
                  <td className="p-2 text-center">{powValues.pow_f3_beta_l}</td>
                  <td className="p-2 text-center">{powValues.pow_f4_theta}</td>
                  <td className="p-2 text-center">{powValues.pow_f4_beta_l}</td>
                  <td className="p-2 text-center">{powValues.pow_f3_gamma}</td>
                  <td className="p-2 text-center">{powValues.pow_f4_gamma}</td>
                  <td className="p-2 text-center">{powValues.pow_f7_gamma}</td>
                </tr>
              </tbody>
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 font-bold text-center">POW.F8.Gamma</th>
                  <th className="p-2 font-bold text-center">POW.T7.Gamma</th>
                  <th className="p-2 font-bold text-center">POW.T8.Gamma</th>
                  <th className="p-2 font-bold text-center">POW.F7.Theta</th>
                  <th className="p-2 font-bold text-center">POW.F8.Theta</th>
                  <th className="p-2 font-bold text-center">POW.T7.Theta</th>
                  <th className="p-2 font-bold text-center">POW.T8.Theta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-center">{powValues.pow_f8_gamma}</td>
                  <td className="p-2 text-center">{powValues.pow_t7_gamma}</td>
                  <td className="p-2 text-center">{powValues.pow_t8_gamma}</td>
                  <td className="p-2 text-center">{powValues.pow_f7_theta}</td>
                  <td className="p-2 text-center">{powValues.pow_f8_theta}</td>
                  <td className="p-2 text-center">{powValues.pow_t7_theta}</td>
                  <td className="p-2 text-center">{powValues.pow_t8_theta}</td>
                </tr>
                {/* Add more rows for additional POW values if needed */}
              </tbody>
            </table>
            <div className="graph grid grid-cols-6">
              <div className="scale-x-[-1] rotate-180 flex justify-evenly  border border-gray-500 my-5 mx-10 rounded-2xl col-span-5">
                <div
                  className={`relative border-2 rounded border-black ml-4 w-44 bg-${attention_barProperties.color}-500 transition-all duration-1000 ${attention_barProperties.height}`}
                ></div>
                <div
                  className={`relative border-2 rounded border-black ml-4 w-44 bg-${order_barProperties.color}-500 transition-all duration-1000 ${order_barProperties.height}`}
                ></div>
                <div
                  className={`relative border-2 rounded border-black ml-4 w-44 bg-${memory_barProperties.color}-500 transition-all duration-1000 ${memory_barProperties.height}`}
                ></div>
              </div>
              <div className="legend col-span-1 mx-10 my-20">
                <div className="bg-white inline-block rounded-xl p-3 h-32">
                  <div className="flex items-center justify-between">
                    <div className="pr-2 font-light">Low</div>
                    <div className=" w-8 h-1 bg-red-500"></div>
                  </div>
                  <div className="flex items-center mt-3 justify-between">
                    <div className="pr-2 font-light">Moderate</div>
                    <div className="w-8 h-1 bg-yellow-500"></div>
                  </div>
                  <div className="flex items-center mt-3 justify-between">
                    <div className="pr-2 font-light">High</div>
                    <div className="w-8 h-1 bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-evenly col-span-5">
                <p className="ml-10">Attention Span</p>
                <p className="ml-4">Cognitive Processing</p>
                <p>Emotional Processing</p>
              </div>
            </div>
            <div className="flex border border-black rounded-2xl m-10">
              <div className="p-6 text-justify">
                <h4 className="mb-4 text-2xl font-bold">Inference</h4>
                <p className="text-lg">
                  {renderInference(
                    attention_prediction,
                    order_prediction,
                    memory_prediction
                  )}
                </p>
                <div className="mt-6 text-sm text-gray-600">
                  <p>
                    <b>Note:</b> The EEG data analysis provided here should be
                    considered as a supplementary tool for practitioners and not
                    as a definitive diagnosis. Consultation with a qualified
                    healthcare professional is recommended for accurate
                    interpretation and decision-making.
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-row border border-gray-500 rounded m-3">
              <div className="w-1/2 border border-gray-500 flex flex-row justify-between rounded">
                <div
                  className={`relative border-2 rounded border-black ml-4 w-44 bg-${barProperties.color}-500 transition-all duration-1000 ${barProperties.height}`}
                ></div>
                <div
                  className={`relative border-2 rounded border-black ml-4 w-44 bg-${barProperties.color}-500 transition-all duration-1000 ${barProperties.height}`}
                ></div>
                <div
                  className={`relative border-2 rounded border-black ml-4 w-44 bg-${barProperties.color}-500 transition-all duration-1000 ${barProperties.height}`}
                ></div>

                <div className="bg-white inline-block rounded-xl p-3 h-32 mr-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="pr-2 font-light">Low</div>
                    <div className=" w-8 h-1 bg-red-500"></div>
                  </div>
                  <div className="flex items-center mt-3 justify-between">
                    <div className="pr-2 font-light">Moderate</div>
                    <div className="w-8 h-1 bg-yellow-500"></div>
                  </div>
                  <div className="flex items-center mt-3 justify-between">
                    <div className="pr-2 font-light">High</div>
                    <div className="w-8 h-1 bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <p className="ml-6 font-serif">Level of attention span</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
