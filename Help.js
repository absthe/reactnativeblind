import React from 'react';
import './styles/Help.css';

function Help() {
  return (
    <div className="help-container">
      <h1 className="help-title">Help Center</h1>
      <div className="help-content">
        <p>
          Welcome to the Help Center! 👋<br /><br />
          Use voice commands like <strong>"go to upload"</strong>, <strong>"go to quiz"</strong>,
          or <strong>"dark mode"</strong> to control the app hands-free.
        </p>
        <p>
          You can upload a PDF using the Upload page. Once uploaded, the system will process it
          for summaries, tutoring, and quizzes. Just navigate to the respective sections after uploading.
        </p>
        <p>
          For best experience, use Google Chrome and make sure speech recognition is enabled.
        </p>
        <p>
          If you have any issues, try reloading the page or re-uploading your file.
        </p>
      </div>
    </div>
  );
}

export default Help;
