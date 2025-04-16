import React from 'react';
import './styles/Library.css';

function Library() {
  // Replace this mock data with actual PDF list from backend later
  const pastPDFs = [
    { name: 'Math_Notes.pdf', date: '2025-04-01' },
    { name: 'History_Lecture.pdf', date: '2025-04-03' },
    { name: 'AI_Research.pdf', date: '2025-04-08' }
  ];

  return (
    <div className="library-container">
      {/* Shooting stars */}
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />

      

      <h1 className="library-title">My Library</h1>
      <div className="pdf-list">
        {pastPDFs.map((pdf, index) => (
          <div className="pdf-item" key={index}>
            <div className="pdf-name">{pdf.name}</div>
            <div className="pdf-date">Uploaded on: {pdf.date}</div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Library;
