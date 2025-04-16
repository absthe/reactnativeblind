// src/components/Upload.js
import React, { useState } from 'react';
import './styles/Upload.css';

function Upload({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setStatus('Uploading and summarizing...');

    try {
      const response = await fetch('https://6eed-2409-408d-99-b3c7-d0f2-b9f3-a3ac-8fda.ngrok-free.app/summarize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setStatus('Upload complete.');

      if (onUploadComplete) {
        onUploadComplete(data.summary);
      }
    } catch (err) {
      console.error(err);
      setStatus('Error uploading file.');
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Summarize</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default Upload;
