import React, { useState } from 'react';
import { Github, ExternalLink, Lock, Terminal } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fond avec effet de glitch */}
      <div className="absolute inset-0 bg-deadsec-gray/50 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"></div>
      <div className="absolute inset-0 bg-deadsec-dark border border-deadsec-blue/30 transform group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-200"></div>

      {/* Contenu principal */}
      <div className="relative bg-deadsec-dark border border-deadsec-blue/30 p-6 h-full">
        {/* Image du projet avec effet glitch */}
        <div className="relative h-48 mb-4 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
          />
          
          {/* Overlay glitch */}
          <div className={`absolute inset-0 bg-deadsec-blue/20 mix-blend-screen transition-opacity duration-200 ${isHovered ? 'opacity-40' : 'opacity-0'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-t from-deadsec-dark via-transparent to-transparent transition-opacity duration-200 ${isHovered ? 'opacity-90' : 'opacity-0'}`}></div>
        </div>

        {/* Titre et description */}
        <div className="space-y-3">
          <h3 className="text-xl font-mono text-deadsec-blue group-hover:text-deadsec-purple transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm">{project.description}</p>
        </div>

        {/* Technologies utilisées */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-deadsec-gray/30 text-deadsec-blue border border-deadsec-blue/20 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Liens */}
        <div className="absolute bottom-6 right-6 flex space-x-4">
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-deadsec-blue hover:text-deadsec-purple transition-colors"
            >
              <Github size={20} />
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-deadsec-blue hover:text-deadsec-purple transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>

        {/* Indicateurs de sécurité */}
        {project.security && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 text-deadsec-green">
            <Lock size={16} />
            <span className="text-xs">Sécurisé</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 