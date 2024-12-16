import React from 'react';

const SkillCard = ({ icon: Icon, title, skills, color = 'deadsec-blue' }) => {
  return (
    <div className="group relative">
      {/* Fond avec effet de glitch */}
      <div className="absolute inset-0 bg-deadsec-gray/50 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"></div>
      <div className="absolute inset-0 bg-deadsec-dark border border-deadsec-blue/30 transform group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-200"></div>
      
      {/* Contenu */}
      <div className="relative bg-deadsec-dark border border-deadsec-blue/30 p-6 h-full transition-all duration-300 group-hover:border-deadsec-purple/50">
        <div className="flex items-center space-x-4 mb-4">
          <Icon className={`text-${color} w-8 h-8 group-hover:animate-pulse`} />
          <h3 className={`text-${color} text-xl font-mono`}>{title}</h3>
        </div>
        
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li 
              key={index}
              className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300"
            >
              <span className={`text-${color} opacity-50`}>›</span>
              <span className="font-mono">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillCard; 