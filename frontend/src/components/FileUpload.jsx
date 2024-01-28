import React, { useState} from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { updatePowValues, updatePrediction } from "../features/bciSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">BCI</h1>
      {/* <div className="transition-all duration-700 h-40 w-40 bg-yellow-300"></div> */}
      
      <input type="file" onChange={handleFileChange} /> <br />
      <button
        className="inline-block px-6 py-3 mt-4 bg-blue-500 text-white border border-blue-700 rounded-md hover:bg-blue-700"
        onClick={handleUpload}
      >
        Upload File
      </button>
      <button
        className="inline-block px-6 py-3 m-4 bg-blue-500 text-white border border-blue-700 rounded-md hover:bg-blue-700"
        onClick={handleDeleteFile}
      >
        Delete File
      </button>
      {uploadStatus && <h3 className="text-green-400">{uploadStatus}</h3>}
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
  );
}

export default FileUpload;
