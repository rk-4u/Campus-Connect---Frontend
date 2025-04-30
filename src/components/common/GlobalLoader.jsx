import React from 'react';
import './Loader.css'; // Import styles separately

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="socket">
        <div className="gel center-gel">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        {[...Array(36)].map((_, i) => (
          <div className={`gel c${i + 1} r${Math.floor(i / 12) + 1}`} key={i}>
            <div className="hex-brick h1"></div>
            <div className="hex-brick h2"></div>
            <div className="hex-brick h3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalLoader;
