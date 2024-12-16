import React from 'react';

const DedsecImage = ({ src, alt, className = '' }) => {
  return (
    <div className="relative overflow-hidden group rounded-sm deadsec-container">
      {/* Image principale avec effets */}
      <img 
        src={src}
        alt={alt}
        className={`
          w-full
          animate-glitch-img 
          filter-dedsec 
          group-hover:animate-rgb-shift 
          transition-all 
          duration-300
          ${className}
        `}
      />
      
      {/* Calques d'effets glitch superposés */}
      <div className="glitch-deadsec">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index}
            className={`glitch-copy glitch-copy-${index + 1}`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
      </div>

      {/* Effets supplémentaires */}
      <div className="absolute inset-0 animate-noise opacity-20 bg-deadsec-dark mix-blend-overlay"></div>
      <div className="absolute inset-0 animate-scanline opacity-10"></div>
      <div className="absolute -inset-0.5 bg-deadsec-blue/20 rounded-sm blur-sm animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-deadsec-blue/10 to-deadsec-purple/10 rounded-sm -rotate-2"></div>
      
      {/* Bordure néon */}
      <div className="absolute inset-0 border border-deadsec-blue/50 rounded-sm group-hover:border-deadsec-purple/50 transition-colors"></div>
      
      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-deadsec-blue/0 to-deadsec-purple/0 group-hover:from-deadsec-blue/20 group-hover:to-deadsec-purple/20 transition-all duration-300"></div>
    </div>
  );
};

export default DedsecImage; 