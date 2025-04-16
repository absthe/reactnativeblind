import React, { useState, useRef, useEffect } from 'react';
import './tutor.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function Tutor() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setQuery((prev) => prev + ' ' + speechToText);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  }, []);

  const toggleMic = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResponseText('');
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (!query.trim()) {
      setError('Please enter a question');
      return;
    }

    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('query', query);
    formData.append('session_id', sessionId || '');

    try {
      const response = await fetch('https://138d-2402-3a80-469-f421-8e8-5c45-ce1c-fa5a.ngrok-free.app/teach-each-page', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResponseText(data.explanation || data.response || 'No explanation returned.');
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
      }
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setError('Error occurred while getting explanation. Please try again.');
      setResponseText('');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setQuery('');
    setResponseText('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="tutor-container">
      <div className="tutor-header">
        <h2 className="glow-text">PDF Learning Assistant</h2>
        <p className="tutor-description">
          Upload a PDF document and ask questions to get instant explanations
        </p>
      </div>

      <div className="tutor-card slide-in">
        <div className="file-upload-section">
          <div className="file-upload-area">
            {file ? (
              <div className="file-info fade-in">
                <div className="file-icon pulse">📄</div>
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
                <button 
                  className="file-remove-btn" 
                  onClick={resetForm}
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="file-upload-label">
                <div className="upload-icon">📁</div>
                <span>Click to upload a PDF</span>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={handleFileChange} 
                  className="file-input"
                  ref={fileInputRef}
                />
              </label>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="question-form">
          <div className="input-group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like to know about this document?"
              className="question-input"
              disabled={loading || !file}
            />
            <button 
              type="button" 
              className={`mic-button ${isListening ? 'listening' : ''}`} 
              onClick={toggleMic}
              aria-label="Toggle speech input"
              disabled={loading || !file}
            >
              🎤
            </button>
            <button 
              type="submit" 
              className="ask-button"
              disabled={loading || !file}
            >
              {loading ? 'Processing...' : 'Ask'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>

      {loading && (
        <div className="loading-container fade-in">
          <div className="loading-spinner"></div>
          <p className="loading-text">Analyzing document and generating response...</p>
        </div>
      )}

      {responseText && !loading && (
        <div className="response-container slide-up">
          <div className="response-header">
            <h3>Answer</h3>
            <button 
              className="new-question-btn" 
              onClick={() => setQuery('')}
              disabled={loading}
            >
              Ask another question
            </button>
          </div>
          <div className="response-content">
            {responseText.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tutor;
