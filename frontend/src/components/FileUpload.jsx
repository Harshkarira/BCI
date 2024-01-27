import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import { useNavigate } from "react-router-dom"; 
function FileUpload() {
  // const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [numValues, setNumValues] = useState({
    pow_f3_theta: null,
    pow_f3_beta_l: null,
    pow_f4_theta: null,
    pow_f4_beta_l: null,
  });
  const [prediction, setPrediction] = useState(null); // New state for prediction

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadStatus(null);
    setNumValues({
      pow_f3_theta: null,
      pow_f3_beta_l: null,
      pow_f4_theta: null,
      pow_f4_beta_l: null,
    });
    setPrediction(null); // Reset prediction state
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

        setNumValues({
          pow_f3_theta: responseData.pow_f3_theta,
          pow_f3_beta_l: responseData.pow_f3_beta_l,
          pow_f4_theta: responseData.pow_f4_theta,
          pow_f4_beta_l: responseData.pow_f4_beta_l,
        });

        setPrediction(responseData.predicted_attention_span); // Set prediction state

        setUploadStatus("File uploaded successfully");
        // navigate("/results");
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
    setNumValues({
      pow_f3_theta: null,
      pow_f3_beta_l: null,
      pow_f4_theta: null,
      pow_f4_beta_l: null,
    });
    setPrediction(null);
  };

  return (
    <div>
      <h1>BCI</h1>
      <input type="file" onChange={handleFileChange} /> <br />
      <button onClick={handleUpload}>Upload File</button>
      <button onClick={handleDeleteFile}>Delete File</button>
      {uploadStatus && <div>{uploadStatus}</div>}
      {numValues.pow_f3_theta !== null &&
        numValues.pow_f3_beta_l !== null &&
        numValues.pow_f4_theta !== null &&
        numValues.pow_f4_beta_l !== null && (
          <div>
            <h2>Extracted Values:</h2>
            <p>POW.F3.Theta: {numValues.pow_f3_theta}</p>
            <p>POW.F3.BetaL: {numValues.pow_f3_beta_l}</p>
            <p>POW.F4.Theta: {numValues.pow_f4_theta}</p>
            <p>POW.F4.BetaL: {numValues.pow_f4_beta_l}</p>
          </div>
        )}
      {prediction !== null && (
        <div>
          <h2>Prediction:</h2>
          <p>Attention Span: {prediction}</p>
        </div>
      )}
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
