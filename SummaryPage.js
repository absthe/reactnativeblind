import React, { useEffect, useRef, useState } from 'react'
import './styles/SummaryPage.css';

function SummaryPage() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const triggerRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    console.log('Hello 1');
    try {
      const response = await fetch('https://138d-2402-3a80-469-f421-8e8-5c45-ce1c-fa5a.ngrok-free.app/summarize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setSummary(data.response || 'No summary returned.');
    } catch (error) {
      console.error('Error summarizing:', error);
      setSummary('Error occurred while summarizing.');
    } finally {
      setLoading(false);
    }
  };

    // 👇 Voice command for "open upload"
    useEffect(() => {
      if (!('webkitSpeechRecognition' in window)) return;
  
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
  
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log('SummaryPage Voice:', transcript);
  
        if (transcript.includes('open upload')) {
          const utterance = new SpeechSynthesisUtterance('Opening upload');
          window.speechSynthesis.speak(utterance);
  
          // 🔥 Trigger hidden button
          triggerRef.current?.click();
        }
      };
  
      recognition.start();
      return () => recognition.stop();
    }, []);

  return (
    <div className="summary-container">
      <h2>Upload a PDF to Summarize</h2>
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

export default SummaryPage;
