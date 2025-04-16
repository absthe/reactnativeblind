// components/SpeechToText.js
import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const SpeechToText = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="speech-to-text">
      <button onClick={startListening} className="mic-button">
        <FaMicrophone /> {listening ? "Listening..." : "Start Speaking"}
      </button>
      <p className="speech-output">{transcript}</p>
    </div>
  );
};

export default SpeechToText;
