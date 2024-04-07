// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { TbReportAnalytics } from "react-icons/tb";
import { SiAnswer } from "react-icons/si";

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
  const renderInference = () => {
    // Combine predictions for all three aspects
    const combinedPrediction = attention_prediction + " " + order_prediction + " " + memory_prediction;
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
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.length === 3 ? "" : prevDots + ".";
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="mt-60 flex items-center justify-center">
            <div className="border-t-4 border-blue-500 border-solid w-16 h-16 border-r rounded-full animate-spin"></div>
          </div>

          <p id="res" className="text-center text-3xl font-bold mt-4">
            Generating results{dots}
          </p>
        </div>
      ) : (
        <div className="bg-gray-900 text-white min-h-screen p-5">
          <Navbar isDarkMode={"(prefers-color-scheme: dark)"} />
          <div className="min-h-screen mt-10">
            <h1 className="text-4xl font-bold text-center flex justify-center items-center">
              <TbReportAnalytics className="mr-2" />
              EEG Data Analysis
            </h1>
            <div className="mt-5">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-1 rounded-lg border-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 w-full border  mt-4">
                  <div className="bg-gray-200 p-2 font-bold text-center rounded-tl-md text-black">
                    POW.F3.Theta
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F3.BetaL
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F4.Theta
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F4.BetaL
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F3.Gamma
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F4.Gamma
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center rounded-tr-md text-black">
                    POW.F7.Gamma
                  </div>

                  <div className="text-center">{powValues.pow_f3_theta}</div>
                  <div className="p-2 text-center">
                    {powValues.pow_f3_beta_l}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_f4_theta}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_f4_beta_l}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_f3_gamma}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_f4_gamma}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_f7_gamma}
                  </div>

                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F8.Gamma
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.T7.Gamma
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.T8.Gamma
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F7.Theta
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.F8.Theta
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.T7.Theta
                  </div>
                  <div className="bg-gray-200 p-2 font-bold text-center text-black">
                    POW.T8.Theta
                  </div>

                  <div className="p-2 text-center">
                    {powValues.pow_f8_gamma}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_t7_gamma}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_t8_gamma}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_f7_theta}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_f8_theta}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_t7_theta}
                  </div>
                  <div className="p-2 text-center">
                    {powValues.pow_t8_theta}
                  </div>
                </div>
              </div>
            </div>

            <div className="graph grid grid-cols-4 max-sm:grid-cols-1 mt-10">
              <div className="scale-x-[-1] rotate-180 flex justify-evenly  border border-white my-5 mx-10 rounded-2xl col-span-5 max-sm:col-span-1 max-sm:min-w-full max-sm:mx-0 md:min-w-full md:mx-0">
                <div
                  className={`relative border-2 border-t-0 border-b-black border-l-black border-r-black ml-4 w-44 bg-${attention_barProperties.color}-500 transition-all duration-1000 ${attention_barProperties.height} max-sm:min-w-fit`}
                ></div>
                <div
                  className={`relative border-2 border-t-0 border-b-black border-l-black border-r-black ml-4 w-44 bg-${order_barProperties.color}-500 transition-all duration-1000 ${order_barProperties.height} max-sm:min-w-fit`}
                ></div>
                <div
                  className={`relative border-2 border-t-0 border-b-black border-l-black border-r-black ml-4 w-44 bg-${memory_barProperties.color}-500 transition-all duration-1000 ${memory_barProperties.height} max-sm:min-w-fit`}
                ></div>
                <div className="legend col-span-1 my-20 grid grid-rows-3 gap-y-3 scale-y-[-1] max-sm:mt-72 max-sm:mb-5">
                  <div className="bg-white inline-block rounded-xl p-3 max-sm:text-sm max-sm:w-20 max-sm:ml-10 max-sm:mr-2 max-sm:text-center">
                    <div className="flex items-center justify-between max-sm:block">
                      <div className="pr-2 font-light text-black">Low</div>
                      <div className="w-8 h-1 bg-red-500 max-sm:mt-2 max-sm:mx-2"></div>
                    </div>
                  </div>
                  <div className="bg-white inline-block rounded-xl p-3 max-sm:text-sm max-sm:w-20 max-sm:ml-10 max-sm:mr-2">
                    <div className="flex items-center justify-between max-sm:block">
                      <div className="pr-2 font-light text-black">Moderate</div>
                      <div className="w-8 h-1 bg-yellow-500 max-sm:mt-2 max-sm:mx-2"></div>
                    </div>
                  </div>
                  <div className="bg-white inline-block rounded-xl p-3 max-sm:text-sm max-sm:w-25 max-sm:ml-10 max-sm:mr-2 max-sm:text-center">
                    <div className="flex items-center justify-between max-sm:block">
                      <div className="pr-2 font-light text-black">High</div>
                      <div className="w-8 h-1 bg-green-500 max-sm:mt-2 max-sm:mx-2"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly col-span-5 mr-60 max-sm:mr-0 md:ml-24">
                <p className="max-sm:ml-5">Attention Span</p>
                <p className="">Cognitive Processing</p>
                <p className="max-sm:mr-16">Emotional Processing</p>
              </div>
            </div>
            <div className="flex border border-white rounded-2xl m-10 max-sm:min-w-full max-sm:ml-0 md:min-w-full md:m-0">
              <div className="p-6 text-justify">
                <h4 className="mb-4 text-2xl font-bold flex justify-center items-center">
                  <SiAnswer className="mr-2" />
                  Inference
                </h4>
                <p className="text-lg">{renderInference()}</p>
                <div className="mt-6 text-sm text-gray-300">
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
