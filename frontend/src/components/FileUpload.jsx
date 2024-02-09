import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { updatePowValues, updatePrediction } from "../features/bciSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import brain from "../assets/images/brain.jpg";
import brain2 from "../assets/images/brain2.jpg";

function FileUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadStatus(null);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("pdfFile", file);

      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("File uploaded successfully", responseData);

        dispatch(
          updatePowValues({
            pow_f3_theta: responseData.pow_f3_theta,
            pow_f3_beta_l: responseData.pow_f3_beta_l,
            pow_f4_theta: responseData.pow_f4_theta,
            pow_f4_beta_l: responseData.pow_f4_beta_l,
          })
        );

        dispatch(updatePrediction(responseData.predicted_attention_span));

        setUploadStatus("File uploaded successfully");

        setTimeout(() => {
          navigate("/results");
        }, 2000);
      } else {
        console.error("File upload failed");
        setUploadStatus("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setUploadStatus("Error uploading file");
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setUploadStatus(null);
  };

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div className={` p-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-200"}`}>
        <button
          onClick={toggleTheme}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isDarkMode ? "border-white" : "border-black"
          }`}
        >
          Toggle Theme
        </button>
        <div className="relative">
          <h1
            className={`text-4xl font-bold mb-0 text-center py-8 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            EEG Cognitive Abilities
          </h1>
          <div
            className={`text-xl px-60 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            The EEG Cognitive Abilities project aims to explore and analyze
            cognitive functions using Electroencephalography (EEG) technology.
            This innovative initiative focuses on understanding how the brain's
            electrical activity correlates with cognitive processes such as
            attention, memory, and problem-solving. By recording and
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
            <div>
              <p>
                The F3 and F4 nodes Located on the frontal lobes of the brain,
                these nodes are associated with cognitive functions like
                decision making and attention.
              </p>
              <h3>F3 Node:- </h3>
              <div className="ml-10">
                <li>
                  <strong>Executive Functions:</strong> Primarily associated
                  with executive functions.
                </li>
                <li>
                  <strong>Beta Waves:</strong> Reflect active mental engagement.
                </li>
                <li>
                  <strong>Theta Waves:</strong> Indicate relaxation or
                  meditative states.
                </li>
              </div>
              <h3>F4 Node:- </h3>
              <div className="ml-10">
                <li>
                  <strong>Executive Functions:</strong> Symmetrically opposite
                  to F3, also involved in executive functions.
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
          <img
            src={brain2}
            className="absolute h-72 mt-20 ml-20 rounded-2xl shadow-2xl"
            alt="left img"
          />
          <img
            src={brain}
            alt="right img"
            className="absolute right-0 h-72 mr-20 mt-20 rounded-2xl shadow-2xl"
          />
          <div className="mt-80 flex justify-center">
            <div className="rounded-md p-4">
              <input
                type="file"
                className={isDarkMode ? "text-white" : "text-black"}
                onChange={handleFileChange}
              />
              <br />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`inline-block px-6 py-3 mt-4 rounded-md ${
                  isDarkMode
                    ? "bg-blue-500 text-white border border-blue-700 hover:bg-lime-200 hover:text-black"
                    : "bg-blue-500 text-black border border-black"
                }`}
                onClick={handleUpload}
              >
                Upload File
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`inline-block px-6 py-3 m-4 rounded-md ${
                  isDarkMode
                    ? "bg-blue-500 text-white border border-blue-700 hover:bg-lime-200 hover:text-black"
                    : "bg-blue-500 text-black border border-gray-700"
                }`}
                onClick={handleDeleteFile}
              >
                Delete File
              </motion.button>
              {uploadStatus && (
                <h3 className="text-green-400">{uploadStatus}</h3>
              )}
            </div>
          </div>
          <div className="bg-inherit pt-40"></div>
          {file && (
            <div>
              <h2>PDF Preview:</h2>
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@${"3.6.172"}/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={URL.createObjectURL(file)} />
              </Worker>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FileUpload;
