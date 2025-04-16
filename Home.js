import React, { useState } from 'react';
import './styles/Home.css';

function Home() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    console.log('Before form');
    const formData = new FormData();
    formData.append('file', file);
    console.log('Before append');
    try {
      const response = await fetch('https://a8ee-2402-3a80-46f-ba47-c900-14bc-b05b-2eca.ngrok-free.app/summarize', {
        method: 'POST',
        body: formData,
      });
      console.log('After response');
      const data = await response.json();
      console.log(data)
      setSummary(data.response || 'No summary returned.');
    } catch (error) {
      console.error('Error summarizing:', error);
      setSummary('Error occurred while summarizing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Upload PDF for Summary</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Summarize</button>
      </form>

      {loading && <p className="loading">Summarizing...</p>}

      {summary && (
        <div className="summary-box">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
