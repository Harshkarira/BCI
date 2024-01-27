import React, { useState } from "react";
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
        }, 3000);
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
      <h1>BCI</h1>
      <input type="file" onChange={handleFileChange} /> <br />
      <button onClick={handleUpload}>Upload File</button>
      <button onClick={handleDeleteFile}>Delete File</button>
      {uploadStatus && <div>{uploadStatus}</div>}
      {uploadStatus === "File uploaded successfully" && (
        <h1 style={{color:"green"}}>Generating Results...</h1>
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
