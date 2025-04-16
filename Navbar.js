import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBookOpen, FaChalkboardTeacher, FaQuestionCircle } from 'react-icons/fa';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/summary" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaFileAlt className="nav-icon" />
            Summary
          </NavLink>
        </li>
        <li>
          <NavLink to="/quiz" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaQuestionCircle className="nav-icon" />
            Quiz
          </NavLink>
        </li>
        <li>
          <NavLink to="/tutor" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaChalkboardTeacher className="nav-icon" />
            Tutor
          </NavLink>
        </li>
        <li>
          <NavLink to="/library" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaBookOpen className="nav-icon" />
            Library
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
