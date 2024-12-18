import React from 'react';
import { Terminal } from 'lucide-react';

const ProjectFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={(e) => {
            e.preventDefault();
            setActiveCategory(category);
          }}
          className={`
            flex items-center space-x-2 px-4 py-2 
            border transition-all duration-300
            ${activeCategory === category 
              ? 'border-deadsec-purple text-deadsec-purple bg-deadsec-purple/10' 
              : 'border-deadsec-blue/30 text-deadsec-blue hover:border-deadsec-purple'
            }
          `}
        >
          <Terminal size={16} />
          <span className="font-mono text-sm">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter; 