import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="sidebar">
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/summary">Summary</Link></li>
      <li><Link to="/tutor">Tutor</Link></li>
      <li><Link to="/upload">Upload</Link></li>
      <li><Link to="/quiz">Quiz</Link></li>
      <li><Link to="/help">Help</Link></li>
      <li><Link to="/library">Library</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </nav>
);

export default Sidebar;
