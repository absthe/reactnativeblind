// src/App.js
import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Summary from './components/SummaryPage';
import Tutor from './components/Tutor';
import Upload from './components/Upload';
import Quiz from './components/Quiz';
import Help from './components/Help';
import Library from './components/Library';
import Profile from './components/Profile';

const App = () => {
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  const handleVoiceCommand = (command) => {
    switch (command) {
      
      case 'go to summary':
        navigate('/summary');
        speak('Navigating to Summary');
        break;
      case 'go to tutor':
        navigate('/tutor');
        speak('Navigating to Tutor');
        break;
      case 'go to upload':
        navigate('/upload');
        speak('Navigating to Upload');
        break;
      case 'go to quiz':
        navigate('/quiz');
        speak('Navigating to Quiz');
        break;
      case 'go to help':
        navigate('/help');
        speak('Navigating to Help');
        break;
      case 'go to library':
        navigate('/library');
        speak('Navigating to Library');
        break;
      case 'go to profile':
        navigate('/profile');
        speak('Navigating to Profile');
        break;
      case 'dark mode':
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        speak('Switched to Dark Mode');
        break;
      case 'light mode':
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        speak('Switched to Light Mode');
        break;
      default:
        speak(`Command not recognized: ${command}`);
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/help" element={<Help />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
