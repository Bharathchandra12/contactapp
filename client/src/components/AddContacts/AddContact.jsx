import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('csvFile', selectedFile);
    try {
      await axios.post("http://localhost:5000/importcontact/uploadAll", formData);
      console.log("File uploaded successfully!");
      setSuccess(true);
      setShowAlert(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    let timeout;
    if (showAlert) {
      timeout = setTimeout(() => {
        setShowAlert(false);
      }, 10000); // 10 seconds
    }
    return () => clearTimeout(timeout);
  }, [showAlert]);

  const navigate = useNavigate();

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileInput">INSERT FILE : </label>
        <input type='file' id="fileInput" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={handleSubmit}
        >
          Upload file
        </Button>
      </form>
      <Button onClick={() => navigate(-1)} variant="contained">Go Back</Button>
      {showAlert && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          The file uploaded successfully!!
        </Alert>
      )}
    </div>
  );
}

export default Upload;