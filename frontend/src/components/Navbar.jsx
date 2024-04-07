import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaInfoCircle } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";

// eslint-disable-next-line react/prop-types
const Navbar = ({ isDarkMode }) => {
  return (
    <div className="flex lg:items-center lg:justify-between max-sm:flex-col">
      <div className="">
        <h1
          className={`flex lg:items-center text-3xl font-bold text-center mr-32 ${
            isDarkMode ? "text-white" : "text-black"
          } max-sm:text-2xl max-sm:mr-0 max-sm:mb-4`}
        >
          <LuBrainCircuit className="mr-2" />
          Brain Computer Interface
        </h1>
      </div>
      <nav className="flex">
        <ul
          className={`flex items-center justify-center space-x-4 text-xl ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <li>
            <Link to="/" className="flex items-center">
              <GoHomeFill className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center">
              <FaInfoCircle className="mr-2" />
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
