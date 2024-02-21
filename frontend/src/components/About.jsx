import Navbar from "./Navbar";
import { useState } from "react";
import { WiMoonAltThirdQuarter } from "react-icons/wi";

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: light)").matches
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("light");
  };

  return (
    <div className={` ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="navbar flex justify-around items-center p-5">
        <Navbar isDarkMode={isDarkMode} />
        <div>
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${
              isDarkMode ? "border-white" : "border-black"
            }`}
          >
            <WiMoonAltThirdQuarter className="mr-2" />
            Toggle Theme
          </button>
        </div>
      </div>
      <div
        className={`h-full text-xl ${isDarkMode ? "text-white" : "text-black"}`}
      >
        <h1
          className={`text-4xl font-bold mt-10 text-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          EEG Cognitive Abilities
        </h1>
        <div className="px-72 py-10 text-justify">
          The EEG Cognitive Abilities project aims to explore and analyze
          cognitive functions using Electroencephalography (EEG) technology.
          This innovative initiative focuses on understanding how the
          brain&apos;s electrical activity correlates with cognitive processes
          such as attention, memory, and problem-solving. By recording and
          interpreting EEG signals, the project seeks to uncover patterns and
          trends that shed light on cognitive abilities and their variations
          across individuals. <br /> <br />
          Utilizing advanced signal processing and machine learning techniques,
          the project aims to develop predictive models for cognitive states
          based on EEG data. The outcomes have broad implications for
          neuroscience, psychology, and potential applications in neurofeedback
          and cognitive enhancement. Through the integration of cutting-edge
          technology and interdisciplinary research, the EEG Cognitive Abilities
          project strives to contribute valuable insights into the functioning
          of the human brain, paving the way for advancements in cognitive
          science and personalized approaches to cognitive enhancement and
          mental well-being.
          <br />
          <br />
          <div>
            <p>
              The F3 and F4 nodes Located on the frontal lobes of the brain,
              these nodes are associated with cognitive functions like decision
              making and attention.
            </p>
            <h3>F3 Node:- </h3>
            <div className="ml-10">
              <li>
                <strong>Executive Functions:</strong> Primarily associated with
                executive functions.
              </li>
              <li>
                <strong>Beta Waves:</strong> Reflect active mental engagement.
              </li>
              <li>
                <strong>Theta Waves:</strong> Indicate relaxation or meditative
                states.
              </li>
            </div>
            <h3>F4 Node:- </h3>
            <div className="ml-10">
              <li>
                <strong>Executive Functions:</strong> Symmetrically opposite to
                F3, also involved in executive functions.
              </li>
              <li>
                <strong>Beta Waves:</strong> Similar to F3, indicating active
                mental states.
              </li>
              <li>
                <strong>Theta Waves:</strong> Reflect relaxation or meditative
                states.
              </li>
            </div>
            <br />
            <p>
              These nodes help monitor brain activity during tasks and can
              provide insights into cognitive and emotional states.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
