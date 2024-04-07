import Navbar from "./Navbar";
import { useState } from "react";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { BsFillPeopleFill } from "react-icons/bs";
import { LuBrainCog } from "react-icons/lu";

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("light");
  };

  return (
    <div
      className={` ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="navbar flex justify-around items-center p-5">
        <Navbar isDarkMode={isDarkMode} />
        <div>
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700 text-white font-bold py-2 px-4 rounded-md max-sm:mb-4 max-sm:w-full max-sm:justify-center max-sm:items-center max-sm:rounded-md max-sm:p-1 max-sm:border`}
          >
            <WiMoonAltThirdQuarter className="mr-2 max-sm:ml-2 max-sm:text-2xl" />
            Toggle Theme
          </button>
        </div>
      </div>
      <h1
        className={`col-span-4 text-4xl mt-10 font-bold text-center justify-center items-center flex ${
          isDarkMode ? "text-white" : "text-black"
        } max-sm:flex-col`}
      >
        <LuBrainCog className="mr-2" />
        EEG Cognitive Abilities
      </h1>
      <div
        className={` text-xl grid grid-cols-4 gap-4 p-5 ${
          isDarkMode ? "text-white" : "text-black"
        } `}
      >
        <div className="col-span-4 p-6 text-justify border rounded-2xl">
          <p>
            The EEG Cognitive Abilities project aims to explore and analyze
            cognitive functions using Electroencephalography (EEG) technology.
            This innovative initiative focuses on understanding how the
            brain&apos;s electrical activity correlates with cognitive processes
            such as attention, memory, and problem-solving. By recording and
            interpreting EEG signals, the project seeks to uncover patterns and
            trends that shed light on cognitive abilities and their variations
            across individuals. <br /> <br />
            Utilizing advanced signal processing and machine learning
            techniques, the project aims to develop predictive models for
            cognitive states based on EEG data. The outcomes have broad
            implications for neuroscience, psychology, and potential
            applications in neurofeedback and cognitive enhancement. Through the
            integration of cutting-edge technology and interdisciplinary
            research, the EEG Cognitive Abilities project strives to contribute
            valuable insights into the functioning of the human brain, paving
            the way for advancements in cognitive science and personalized
            approaches to cognitive enhancement and mental well-being.
            <br />
            <br />
            The F3 and F4 nodes Located on the frontal lobes of the brain, these
            nodes are associated with cognitive functions like decision making
            and attention.
            <br />
            <br />
            These nodes help monitor brain activity during tasks and can provide
            insights into cognitive and emotional states.
          </p>
        </div>
        <div className="col-span-2 p-6 text-justify border rounded-2xl max-sm:col-span-4 max-sm:p-3">
          <h3>F3 Node:-</h3>
          <ul className="ml-4">
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
          </ul>
        </div>
        <div className="col-span-2 p-6 text-justify border rounded-2xl max-sm:col-span-4 max-sm:p-3">
          <h3>F4 Node:-</h3>
          <ul className="ml-4">
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
          </ul>
        </div>
      </div>
      <h1
        className={`text-4xl font-bold my-10 text-center items-center justify-center flex ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        <BsFillPeopleFill className="mr-2" />
        Contributors
      </h1>
      <div
        className={`text-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        <div className="col-span-1 p-6 text-center">
          <img
            src="contributor1.jpg"
            alt="Contributor 1"
            className="rounded-full border h-32 w-32 mx-auto mb-4"
          />
          <h3>Prof. Indu Dokare</h3>
          <p>Mentor</p>
        </div>
        <div className="col-span-1 p-6 text-center">
          <img
            src="contributor2.jpg"
            alt="Contributor 2"
            className="rounded-full border h-32 w-32 mx-auto mb-4"
          />
          <h3>Sachin Choudhary</h3>
          <p>Documentor</p>
        </div>
        <div className="col-span-1 p-6 text-center">
          <img
            src="contributor3.jpg"
            alt="Contributor 3"
            className="rounded-full border h-32 w-32 mx-auto mb-4"
          />
          <h3>Harsh Karira</h3>
          <p>Frontend Developer</p>
        </div>
        <div className="col-span-1 p-6 text-center">
          <img
            src="contributor4.jpg"
            alt="Contributor 4"
            className="rounded-full border h-32 w-32 mx-auto mb-4"
          />
          <h3>Siddhant Kodolkar</h3>
          <p>Backend Developer</p>
        </div>
        <div className="col-span-1 p-6 text-center">
          <img
            src="contributor5.jpg"
            alt="Contributor 5"
            className="rounded-full border h-32 w-32 mx-auto mb-4"
          />
          <h3>Sahil Madhyan</h3>
          <p>Researcher</p>
        </div>
      </div>
    </div>
  );
};

export default About;
