import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { updatePowValues,updateAttentionPrediction,updateOrderPrediction,updateMemoryPrediction } from "../features/bciSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import brain from "../assets/images/brain.jpg";
import brain2 from "../assets/images/brain2.jpg";
import Navbar from "./Navbar";
import { WiMoonAltThirdQuarter } from "react-icons/wi";

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
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: light)").matches
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("light");
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
            pow_f3_gamma: responseData.pow_f3_gamma,
            pow_f4_gamma: responseData.pow_f4_gamma,
            pow_f7_gamma: responseData.pow_f7_gamma,
            pow_f8_gamma: responseData.pow_f8_gamma,
            pow_t7_gamma: responseData.pow_t7_gamma,
            pow_t8_gamma: responseData.pow_t8_gamma,
            pow_f7_theta: responseData.pow_f7_theta,
            pow_f8_theta: responseData.pow_f8_theta,
            pow_t7_theta: responseData.pow_t7_theta,
            pow_t8_theta: responseData.pow_t8_theta,
          })
        );

        dispatch(updateAttentionPrediction(responseData.predictions[0]));
        dispatch(updateOrderPrediction(responseData.predictions[1]));
        dispatch(updateMemoryPrediction(responseData.predictions[2]));

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

  return (
    <>
      <div
        className={` h-screen p-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="flex justify-around">
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
        <div className="">
          <div className="flex justify-evenly items-center w-100 h-100">
            <img
              src={brain2}
              className="h-72 mt-20 ml-20 rounded-2xl shadow-2xl"
              alt="left img"
            />

            <div
              className={`" flex justify-center items-center rounded-lg p-10 ${
                isDarkMode ? "border border-white" : "border border-black"
              } mt-20 w-96 h-96 bg-gray-100"`}
            >
              <div className="rounded-md p-4">
                <input
                  type="file"
                  className={`${
                    isDarkMode
                      ? "text-white border border-white"
                      : "text-black border border-black"
                  } mb-4 p-10 rounded-md  w-80 border-dashed`}
                  onChange={handleFileChange}
                  placeholder="Upload PDF File"
                />
                <br />
                <div className="buttons flex justify-evenly mt-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex p-4 rounded-md ${
                      isDarkMode
                        ? "bg-blue-500 text-white border border-blue-700 hover:bg-lime-200 hover:text-black"
                        : "bg-blue-500 text-black border border-black hover:bg-lime-200 hover:text-black"
                    }`}
                    onClick={handleUpload}
                  >
                    Upload File
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex p-4 rounded-md ${
                      isDarkMode
                        ? "bg-blue-500 text-white border border-blue-700 hover:bg-lime-200 hover:text-black"
                        : "bg-blue-500 text-black border border-gray-700 hover:bg-lime-200 hover:text-black"
                    }`}
                    onClick={handleDeleteFile}
                  >
                    Delete File
                  </motion.button>
                </div>
                {uploadStatus && (
                  <h3 className="text-green-400">{uploadStatus}</h3>
                )}
              </div>
            </div>
            <img
              src={brain}
              alt="right img"
              className="h-72 mr-20 mt-20 rounded-2xl shadow-2xl"
            />
          </div>
          {file && (
            <div>
              <h2
                className={`${
                  isDarkMode ? "text-white" : "text-black"
                } text-2xl text-center p-10 underline`}
              >
                PDF Preview:
              </h2>
              <div className="px-32">
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@${"3.6.172"}/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={URL.createObjectURL(file)} />
                </Worker>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FileUpload;
