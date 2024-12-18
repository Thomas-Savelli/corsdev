import React from 'react';

const SectionTransition = ({ children, className = '' }) => {
  return (
    <div
      className={`transform transition-all duration-1000 ${className}`}
    >
      {/* Effet de scan */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deadsec-blue/5 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
      
      {/* Lignes de connexion */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-deadsec-blue/0 via-deadsec-blue/20 to-deadsec-blue/0 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-deadsec-purple/0 via-deadsec-purple/20 to-deadsec-purple/0 animate-pulse delay-100"></div>
      </div>

      {children}
    </div>
  );
};

export default SectionTransition; 